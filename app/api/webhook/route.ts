import Stripe from "stripe";
import { prisma } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const donationId = session.metadata?.donationId;

    const donation = donationId
      ? await prisma.donation.findUnique({ where: { id: donationId } })
      : await prisma.donation.findUnique({ where: { stripeSessionId: sessionId } });

    if (!donation) {
      return Response.json({ received: true });
    }

    if (donation.status === "paid") {
      return Response.json({ received: true });
    }

    await prisma.$transaction([
      prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "paid",
          donorEmail: session.customer_details?.email || null,
          stripePaymentIntentId: session.payment_intent
            ? String(session.payment_intent)
            : null,
        },
      }),
      prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raisedCents: { increment: donation.amountCents },
        },
      }),
    ]);
  }

  return Response.json({ received: true });
}
