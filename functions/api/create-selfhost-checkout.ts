import Stripe from "stripe";

const SELFHOST_PLANS = ["monthly", "yearly"] as const;
type SelfHostPlan = (typeof SELFHOST_PLANS)[number];

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID_SELFHOST_MONTHLY: string;
  STRIPE_PRICE_ID_SELFHOST_YEARLY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY, STRIPE_PRICE_ID_SELFHOST_MONTHLY, STRIPE_PRICE_ID_SELFHOST_YEARLY } =
    context.env;

  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID_SELFHOST_MONTHLY || !STRIPE_PRICE_ID_SELFHOST_YEARLY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const priceMap: Record<SelfHostPlan, string> = {
    monthly: STRIPE_PRICE_ID_SELFHOST_MONTHLY,
    yearly: STRIPE_PRICE_ID_SELFHOST_YEARLY,
  };

  let plan: SelfHostPlan = "monthly";

  try {
    const body = (await context.request.json()) as { plan?: string };
    if (body.plan && SELFHOST_PLANS.includes(body.plan as SelfHostPlan)) {
      plan = body.plan as SelfHostPlan;
    }
  } catch {
    // No body or invalid JSON — default to monthly
  }

  const url = new URL(context.request.url);
  const origin = url.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceMap[plan], quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/thank-you/self-hosting?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/self-hosting`,
      metadata: { plan, product: "self-hosting" },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
