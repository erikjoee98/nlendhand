import Stripe from "stripe";
import { getPrisma } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const prisma = getPrisma();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const paymentIntentId = intent.id;
    const amountReceived = intent.amount_received ?? intent.amount ?? 0;
    const donationId = intent.metadata?.donationId;

    if (!donationId) {
      return Response.json({ received: true });
    }

    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
    });

    if (!donation) {
      return Response.json({ received: true });
    }

    const charges = (intent as Stripe.PaymentIntent & {
      charges?: { data?: Stripe.Charge[] };
    }).charges?.data ?? [];
    const donorEmail =
      intent.receipt_email ||
      charges?.[0]?.billing_details?.email ||
      null;

    if (donation.status === "paid") {
      if (
        donation.donorEmail !== donorEmail ||
        donation.stripePaymentIntentId !== paymentIntentId
      ) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: {
            donorEmail,
            stripePaymentIntentId: paymentIntentId,
          },
        });
      }
      return Response.json({ received: true });
    }

    await prisma.$transaction([
      prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "paid",
          donorEmail,
          stripePaymentIntentId: paymentIntentId,
        },
      }),
      prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raisedCents: { increment: amountReceived },
          patientsSupported: { increment: 1 },
        },
      }),
    ]);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const donationId = session.metadata?.donationId;
    const sessionId = session.id;

    const donation = donationId
      ? await prisma.donation.findUnique({ where: { id: donationId } })
      : await prisma.donation.findUnique({ where: { stripeSessionId: sessionId } });

    if (!donation) {
      return Response.json({ received: true });
    }

    const donorEmail = session.customer_details?.email || null;
    const paymentIntentId = session.payment_intent
      ? String(session.payment_intent)
      : null;
    const amountTotal = session.amount_total ?? donation.amountCents;

    if (donation.status === "paid") {
      if (
        donation.donorEmail !== donorEmail ||
        donation.stripePaymentIntentId !== paymentIntentId
      ) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: {
            donorEmail,
            stripePaymentIntentId: paymentIntentId,
          },
        });
      }
      return Response.json({ received: true });
    }

    await prisma.$transaction([
      prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "paid",
          donorEmail,
          stripePaymentIntentId: paymentIntentId,
        },
      }),
      prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raisedCents: { increment: amountTotal },
          patientsSupported: { increment: 1 },
        },
      }),
    ]);
  }

  return Response.json({ received: true });
}
