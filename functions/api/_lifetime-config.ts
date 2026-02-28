import Stripe from "stripe";

export const MONTHLY_PRICE = 79;
export const YEARLY_COST = MONTHLY_PRICE * 12; // $948

export const TIERS = [
  { name: "Founding Member", label: "Tier 1", start: 0, end: 25, price: 259 },
  { name: "Builder", label: "Tier 2", start: 25, end: 50, price: 459 },
  { name: "Growth", label: "Tier 3", start: 50, end: 75, price: 659 },
  { name: "Pioneer", label: "Tier 4", start: 75, end: 100, price: 899 },
] as const;

export const TOTAL_SEATS = 100;
export const SEATS_PER_TIER = 25;

export type TierName = (typeof TIERS)[number]["name"];
export const TIER_NAMES = TIERS.map((t) => t.name) as unknown as TierName[];

/**
 * Count non-refunded lifetime seats sold via Stripe.
 */
export async function countSoldSeats(stripe: Stripe): Promise<number> {
  const paymentIntentIds: string[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of sessions.data) {
      if (
        session.metadata?.plan === "lifetime" &&
        session.payment_status === "paid" &&
        session.payment_intent
      ) {
        const piId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent.id;
        paymentIntentIds.push(piId);
      }
    }

    hasMore = sessions.has_more;
    if (sessions.data.length > 0) {
      startingAfter = sessions.data[sessions.data.length - 1].id;
    }
  }

  let sold = 0;
  for (const piId of paymentIntentIds) {
    const pi = await stripe.paymentIntents.retrieve(piId, {
      expand: ["latest_charge"],
    });
    const charge = pi.latest_charge as Stripe.Charge | null;
    if (!(pi.status === "canceled" || charge?.refunded === true)) {
      sold++;
    }
  }

  return sold;
}
