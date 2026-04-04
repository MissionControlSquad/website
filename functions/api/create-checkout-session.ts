import Stripe from "stripe";

// Must mirror constants from lib/constants.ts
// (Pages Functions can't import from the Next.js app bundle)
const BILLING_PLANS = ["monthly", "yearly"] as const;
type BillingPlan = (typeof BILLING_PLANS)[number];

const PLAN_KEYS = ["starter", "pro", "scale"] as const;
type PlanKey = (typeof PLAN_KEYS)[number];

const DEFAULT_BILLING: BillingPlan = "monthly";
const DEFAULT_TIER: PlanKey = PLAN_KEYS[0]; // Keep in sync with DEFAULT_TIER in lib/constants.ts

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID_STARTER_MONTHLY: string;
  STRIPE_PRICE_ID_STARTER_YEARLY: string;
  STRIPE_PRICE_ID_PRO_MONTHLY: string;
  STRIPE_PRICE_ID_PRO_YEARLY: string;
  STRIPE_PRICE_ID_SCALE_MONTHLY: string;
  STRIPE_PRICE_ID_SCALE_YEARLY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const {
    STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID_STARTER_MONTHLY,
    STRIPE_PRICE_ID_STARTER_YEARLY,
    STRIPE_PRICE_ID_PRO_MONTHLY,
    STRIPE_PRICE_ID_PRO_YEARLY,
    STRIPE_PRICE_ID_SCALE_MONTHLY,
    STRIPE_PRICE_ID_SCALE_YEARLY,
  } = context.env;

  if (
    !STRIPE_SECRET_KEY ||
    !STRIPE_PRICE_ID_STARTER_MONTHLY ||
    !STRIPE_PRICE_ID_STARTER_YEARLY ||
    !STRIPE_PRICE_ID_PRO_MONTHLY ||
    !STRIPE_PRICE_ID_PRO_YEARLY ||
    !STRIPE_PRICE_ID_SCALE_MONTHLY ||
    !STRIPE_PRICE_ID_SCALE_YEARLY
  ) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const priceMap: Record<PlanKey, Record<BillingPlan, string>> = {
    starter: {
      monthly: STRIPE_PRICE_ID_STARTER_MONTHLY,
      yearly: STRIPE_PRICE_ID_STARTER_YEARLY,
    },
    pro: {
      monthly: STRIPE_PRICE_ID_PRO_MONTHLY,
      yearly: STRIPE_PRICE_ID_PRO_YEARLY,
    },
    scale: {
      monthly: STRIPE_PRICE_ID_SCALE_MONTHLY,
      yearly: STRIPE_PRICE_ID_SCALE_YEARLY,
    },
  };

  let tier: PlanKey = DEFAULT_TIER;
  let billing: BillingPlan = DEFAULT_BILLING;
  let referral: string | undefined;

  try {
    const body = (await context.request.json()) as {
      tier?: string;
      billing?: string;
      referral?: string;
    };

    if (body.tier && PLAN_KEYS.includes(body.tier as PlanKey)) {
      tier = body.tier as PlanKey;
    }

    if (body.billing && BILLING_PLANS.includes(body.billing as BillingPlan)) {
      billing = body.billing as BillingPlan;
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

  const priceId = priceMap[tier][billing];
  const url = new URL(context.request.url);
  const origin = url.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/thank-you/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        tier,
        billing,
        ...(referral ? { endorsely_referral: referral } : {}),
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
