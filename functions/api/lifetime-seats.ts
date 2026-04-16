import Stripe from "stripe";
import {
  MONTHLY_PRICE,
  YEARLY_COST,
  TIERS,
  TOTAL_SEATS,
  SEATS_PER_TIER,
  countSoldSeats,
} from "./_lifetime-config";

const FEATURES = [
  "Full AgentCenter platform access",
  "All current agent roles (PM, FE, Analyst, Research, SEO, and more)",
  "Unlimited projects",
  "All future features shipping to the platform",
  "Priority support (lifetime members first)",
  "Founding Member badge — permanent recognition",
];

const FAQS = [
  {
    q: "Is this really limited to {total} seats?",
    a: 'Yes. Hard cap. This page shows "sold out" after seat {total} and redirects to monthly pricing.',
  },
  {
    q: "What happens after {total} seats sell?",
    a: "Monthly pricing continues at ${monthlyPrice}/mo (or higher). Lifetime closes forever.",
  },
  {
    q: "Can I use this for client work / agencies?",
    a: "Yes. One seat covers one workspace. Buy multiple seats now for multiple workspaces.",
  },
  {
    q: "Is there a refund policy?",
    a: "Lifetime deal purchases are heavily discounted and seats are limited, but we're fair — if something isn't right, contact us within 7 days and we'll work it out. Make sure it's the right fit before you buy.",
  },
  {
    q: "When does the price increase?",
    a: "The moment seat {seatsPerTier} sells, {currentTierName} closes and {nextTierName} (${nextTierPrice}) opens automatically.",
  },
  {
    q: "I'm already on monthly. Can I switch?",
    a: "Yes — we'll cancel your subscription when you purchase lifetime.",
  },
  {
    q: "What exactly is fair use?",
    a: "Lifetime includes generous limits on active agents and task completions per month. 95% of users will never hit these. Heavy compute usage beyond fair-use is billed at cost.",
  },
];

function interpolateFaqs(
  currentTierName: string,
  nextTierName: string | null,
  nextTierPrice: number | null
) {
  return FAQS.map((faq) => {
    const interpolate = (s: string) =>
      s
        .replace(/\{total\}/g, String(TOTAL_SEATS))
        .replace(/\{monthlyPrice\}/g, String(MONTHLY_PRICE))
        .replace(/\{seatsPerTier\}/g, String(SEATS_PER_TIER))
        .replace(/\{currentTierName\}/g, currentTierName)
        .replace(/\{nextTierName\}/g, nextTierName ?? "the next tier")
        .replace(/\{nextTierPrice\}/g, String(nextTierPrice ?? ""));

    return { q: interpolate(faq.q), a: interpolate(faq.a) };
  });
}

interface Env {
  STRIPE_SECRET_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { STRIPE_SECRET_KEY } = context.env;

  if (!STRIPE_SECRET_KEY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  try {
    const sold = await countSoldSeats(stripe);

    // Build tier data for frontend
    const activeTier = TIERS.find((t) => sold < t.end) ?? TIERS[TIERS.length - 1];
    const activeTierIndex = TIERS.indexOf(activeTier);
    const soldOut = sold >= TOTAL_SEATS;

    const tiers = TIERS.map((tier, index) => {
      const isActive = index === activeTierIndex && !soldOut;
      const isFilled = index < activeTierIndex || soldOut;

      let seatsSold = 0;
      let seatsRemaining = SEATS_PER_TIER;

      if (isFilled) {
        seatsSold = SEATS_PER_TIER;
        seatsRemaining = 0;
      } else if (isActive) {
        seatsSold = sold - tier.start;
        seatsRemaining = tier.end - sold;
      }

      return {
        name: tier.name,
        label: tier.label,
        seats: `${tier.start + 1}–${tier.end}`,
        price: tier.price,
        savings: YEARLY_COST - tier.price,
        breakeven: `Month ${Math.ceil(tier.price / MONTHLY_PRICE)}`,
        seatsPerTier: SEATS_PER_TIER,
        seatsSold,
        seatsRemaining,
        isActive,
        isFilled,
      };
    });

    // Next tier info
    const nextTier = activeTierIndex < TIERS.length - 1 ? TIERS[activeTierIndex + 1] : null;

    // Interpolate FAQs with live data
    const faqs = interpolateFaqs(activeTier.name, nextTier?.name ?? null, nextTier?.price ?? null);

    return Response.json(
      {
        sold,
        total: TOTAL_SEATS,
        remaining: TOTAL_SEATS - sold,
        soldOut,
        monthlyPrice: MONTHLY_PRICE,
        yearlyCost: YEARLY_COST,
        currentTier: {
          name: activeTier.name,
          price: activeTier.price,
          breakeven: `Month ${Math.ceil(activeTier.price / MONTHLY_PRICE)}`,
        },
        nextTier: nextTier ? { name: nextTier.name, price: nextTier.price } : null,
        tiers,
        features: FEATURES,
        faqs,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
