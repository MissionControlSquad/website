import Stripe from "stripe";

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY, STRIPE_PRICE_ID } = context.env;

  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  let referral: string | undefined;
  try {
    const body = (await context.request.json()) as { referral?: string };
    const raw = (body.referral || "").trim();
    // Validate UUID format and cap length to prevent injection
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (raw && UUID_RE.test(raw) && raw.length <= 200) {
      referral = raw;
    }
  } catch {
    // No body or invalid JSON — that's fine, referral stays undefined
  }

  const url = new URL(context.request.url);
  const origin = url.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/thank-you/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        ...(referral ? { endorsely_referral: referral } : {}),
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
