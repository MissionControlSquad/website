import Stripe from "stripe";

interface Env {
  STRIPE_SECRET_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY } = context.env;

  if (!STRIPE_SECRET_KEY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const url = new URL(context.request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return Response.json({ error: "Invalid session_id" }, { status: 400 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return Response.json({
      email: session.customer_details?.email ?? null,
      amount: session.amount_total,
      currency: session.currency,
      status: session.status,
      paymentStatus: session.payment_status,
      plan: session.metadata?.plan ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 400 });
  }
};
