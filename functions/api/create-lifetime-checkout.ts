import Stripe from "stripe";
import { TIERS, TOTAL_SEATS, TIER_NAMES, countSoldSeats, type TierName } from "./_lifetime-config";

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRODUCT_ID_LIFETIME: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY, STRIPE_PRODUCT_ID_LIFETIME } = context.env;

  if (!STRIPE_SECRET_KEY || !STRIPE_PRODUCT_ID_LIFETIME) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  let tierName: TierName = "Founding Member";

  try {
    const body = (await context.request.json()) as { tier?: string };

    if (body.tier && TIER_NAMES.includes(body.tier as TierName)) {
      tierName = body.tier as TierName;
    }
  } catch {
    // No body or invalid JSON — defaults apply
  }

  // Check seat availability before creating checkout
  try {
    const sold = await countSoldSeats(stripe);

    if (sold >= TOTAL_SEATS) {
      return Response.json(
        { error: "All lifetime seats have been sold. The deal is closed." },
        { status: 410 }
      );
    }

    // Verify the requested tier is actually the current active tier
    const activeTier = TIERS.find((t) => sold < t.end);
    if (!activeTier || activeTier.name !== tierName) {
      // Requested tier isn't available — use the actual active tier
      if (activeTier) {
        tierName = activeTier.name as TierName;
      } else {
        return Response.json({ error: "All lifetime seats have been sold." }, { status: 410 });
      }
    }

    const tier = TIERS.find((t) => t.name === tierName)!;
    const amountInCents = tier.price * 100;

    const url = new URL(context.request.url);
    const origin = url.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: STRIPE_PRODUCT_ID_LIFETIME,
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/thank-you/lifetime-deal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/lifetime-deal`,
      metadata: {
        plan: "lifetime",
        tier: tierName,
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
