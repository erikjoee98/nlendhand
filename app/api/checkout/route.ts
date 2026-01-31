import Stripe from "stripe";
import { MOCK_CAMPAIGNS } from "../../../lib/mockData";

export const runtime = "nodejs";

type CheckoutRequest = {
  campaignId: string;
  amount: number;
  frequency: "once" | "monthly";
};

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return Response.json(
      { error: "STRIPE_SECRET_KEY is not set." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  let payload: CheckoutRequest | null = null;

  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload?.campaignId || typeof payload.amount !== "number") {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (payload.amount <= 0) {
    return Response.json({ error: "Amount must be greater than zero." }, { status: 400 });
  }

  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === payload.campaignId);
  if (!campaign) {
    return Response.json({ error: "Invalid campaignId." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";
  const unitAmount = Math.round(payload.amount * 100);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "usd",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name: campaign.title,
          },
        },
      },
    ],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/donate`,
    metadata: {
      campaignId: payload.campaignId,
      frequency: payload.frequency,
    },
  });

  return Response.json({ url: session.url });
}
