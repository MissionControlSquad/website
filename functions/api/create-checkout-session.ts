import Stripe from "stripe";

// Must mirror BILLING_PLANS and DEFAULT_PLAN from lib/constants.ts
// (Pages Functions can't import from the Next.js app bundle)
const BILLING_PLANS = ["monthly", "yearly"] as const;
type BillingPlan = (typeof BILLING_PLANS)[number];
const DEFAULT_PLAN: BillingPlan = "monthly";

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID_MONTHLY: string;
  STRIPE_PRICE_ID_YEARLY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY, STRIPE_PRICE_ID_MONTHLY, STRIPE_PRICE_ID_YEARLY } = context.env;

  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID_MONTHLY || !STRIPE_PRICE_ID_YEARLY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const priceMap: Record<BillingPlan, string> = {
    monthly: STRIPE_PRICE_ID_MONTHLY,
    yearly: STRIPE_PRICE_ID_YEARLY,
  };

  let plan: BillingPlan = DEFAULT_PLAN;
  let referral: string | undefined;

  try {
    const body = (await context.request.json()) as {
      plan?: string;
      referral?: string;
    };

    // Validate plan against allowlist
    if (body.plan && BILLING_PLANS.includes(body.plan as BillingPlan)) {
      plan = body.plan as BillingPlan;
    }

    // Validate referral UUID format
    const raw = (body.referral || "").trim();
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (raw && UUID_RE.test(raw) && raw.length <= 200) {
      referral = raw;
    }
  } catch {
    // No body or invalid JSON — defaults apply
  }

  const url = new URL(context.request.url);
  const origin = url.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceMap[plan], quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/thank-you/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        plan,
        ...(referral ? { endorsely_referral: referral } : {}),
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
