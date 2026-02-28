"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import ClaimSeatButton from "./ClaimSeatButton";

interface TierData {
  name: string;
  label: string;
  seats: string;
  price: number;
  savings: number;
  breakeven: string;
  seatsPerTier: number;
  seatsSold: number;
  seatsRemaining: number;
  isActive: boolean;
  isFilled: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SeatApiResponse {
  sold: number;
  total: number;
  remaining: number;
  soldOut: boolean;
  monthlyPrice: number;
  yearlyCost: number;
  currentTier: { name: string; price: number; breakeven: string };
  nextTier: { name: string; price: number } | null;
  tiers: TierData[];
  features: string[];
  faqs: FaqItem[];
}

export default function LifetimeDealContent() {
  const [data, setData] = useState<SeatApiResponse | null>(null);

  useEffect(() => {
    fetch("/api/lifetime-seats", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((d: SeatApiResponse) => {
        if (!d.tiers) throw new Error("Invalid API response");
        setData(d);
      })
      .catch((err) => {
        console.error("[lifetime-seats] Failed to load seat data:", err);
      });
  }, []);

  if (!data) {
    return <SkeletonView />;
  }

  const {
    sold,
    total,
    remaining,
    soldOut,
    monthlyPrice,
    yearlyCost,
    currentTier,
    nextTier,
    tiers,
    features,
    faqs,
  } = data;

  if (soldOut) {
    return (
      <SoldOutView
        total={total}
        monthlyPrice={monthlyPrice}
        tiers={tiers}
        features={features}
        faqs={faqs}
      />
    );
  }

  return (
    <ActiveDealView
      sold={sold}
      total={total}
      remaining={remaining}
      monthlyPrice={monthlyPrice}
      yearlyCost={yearlyCost}
      currentTier={currentTier}
      nextTier={nextTier}
      tiers={tiers}
      features={features}
      faqs={faqs}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Shimmer skeleton — shown while fetching live seat data            */
/* ------------------------------------------------------------------ */

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-800 ${className ?? ""}`} />;
}

function SkeletonCard({ highlight }: { highlight?: boolean }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        highlight ? "border-primary-500/30 bg-primary-500/5" : "border-neutral-800 bg-neutral-900"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Bone className="h-6 w-24" />
        </div>
      )}
      <Bone className="mb-2 h-3 w-24" />
      <Bone className="mb-4 h-6 w-36" />
      <Bone className="mb-1 h-10 w-28" />
      <Bone className="mb-4 h-4 w-16" />
      <Bone className="mb-1 h-3 w-full" />
      <Bone className="mb-4 h-2 w-full" />
      <Bone className="mb-6 h-4 w-44" />
      <Bone className="mt-auto h-12 w-full" />
    </div>
  );
}

function SkeletonView() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary-500/10 blur-[150px]" />

        <Container className="relative text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex justify-center">
              <Bone className="h-9 w-72" />
            </div>
            <Bone className="mx-auto h-14 w-full max-w-2xl sm:h-16" />
            <Bone className="mx-auto mt-3 h-14 w-3/4 max-w-xl sm:h-16" />
            <Bone className="mx-auto mt-6 h-5 w-full max-w-lg" />
            <Bone className="mx-auto mt-2 h-5 w-3/4 max-w-md" />

            <div className="mt-8 flex justify-center">
              <Bone className="h-14 w-52" />
            </div>

            {/* Seat counter skeleton */}
            <div className="mx-auto mt-10 max-w-md">
              <div className="mb-2 flex justify-between">
                <Bone className="h-4 w-28" />
                <Bone className="h-4 w-24" />
              </div>
              <Bone className="h-3 w-full rounded-full" />
              <Bone className="mx-auto mt-2 h-3 w-56" />
            </div>
          </div>
        </Container>
      </section>

      {/* Social proof skeleton */}
      <section className="border-y border-neutral-800 py-12">
        <Container className="text-center">
          <Bone className="mx-auto h-5 w-32" />
          <Bone className="mx-auto mt-4 h-6 w-full max-w-xl" />
          <Bone className="mx-auto mt-2 h-6 w-3/4 max-w-md" />
          <Bone className="mx-auto mt-4 h-4 w-40" />
        </Container>
      </section>

      {/* Pricing cards skeleton */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Bone className="mx-auto h-10 w-56" />
            <Bone className="mx-auto mt-4 h-5 w-64" />
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonCard highlight />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sold-out state — thank-you hero + existing sections (view only)   */
/* ------------------------------------------------------------------ */

function SoldOutView({
  total,
  monthlyPrice,
  tiers,
  features,
  faqs,
}: {
  total: number;
  monthlyPrice: number;
  tiers: TierData[];
  features: string[];
  faqs: FaqItem[];
}) {
  return (
    <>
      {/* Thank-you hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-success-500/10 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary-500/8 blur-[120px]" />
        </div>

        <Container className="relative text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-success-500/20 bg-success-500/10 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
              <span className="text-5xl">&#10003;</span>
            </div>

            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-success-500/30 bg-success-500/10 px-4 py-2 text-sm font-medium text-success-500">
              All {total} seats claimed
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
              The lifetime deal is closed.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl">
              Thank you to every founding member who believed in AgentCenter early. All {total}{" "}
              lifetime seats have been claimed — this offer is now permanently closed.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
              >
                View Monthly Pricing →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-8 py-4 text-lg font-semibold text-neutral-200 transition hover:border-primary-500 hover:text-primary-400"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-6 text-sm text-neutral-500">
              Questions? Email{" "}
              <a
                href="mailto:founder@agentcenter.cloud"
                className="text-primary-400 hover:underline"
              >
                founder@agentcenter.cloud
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* Founding members summary */}
      <section className="border-y border-neutral-800 py-12">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-400">{total}</p>
              <p className="mt-1 text-sm text-neutral-500">Founding Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-400">4</p>
              <p className="mt-1 text-sm text-neutral-500">Tiers Filled</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success-500">Closed</p>
              <p className="mt-1 text-sm text-neutral-500">Forever</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing cards — all blurred, view only */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">All tiers — sold out</h2>
            <p className="mt-4 text-neutral-500">
              Here&apos;s what the lifetime deal looked like. Every tier has been claimed.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900 p-6 opacity-50 blur-[1px]"
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl">
                  <span className="rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-1.5 text-xs font-medium text-neutral-400 blur-0">
                    Sold out
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {tier.label} · Seats {tier.seats}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-neutral-50">{tier.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-50">${tier.price}</span>
                  <span className="ml-1 text-neutral-500">one-time</span>
                </div>

                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-neutral-500">
                    <span>0 of {tier.seatsPerTier} seats remaining</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
                    <div className="h-full w-full rounded-full bg-primary-500" />
                  </div>
                </div>

                <p className="mb-6 text-sm text-neutral-500">
                  Save <span className="font-medium text-primary-400">${tier.savings}</span> vs
                  annual · Pays for itself by{" "}
                  <span className="font-medium text-neutral-300">{tier.breakeven}</span>
                </p>

                <span className="mt-auto inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-neutral-700 px-6 py-3 font-semibold text-neutral-500">
                  Sold Out
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What was included */}
      <section className="bg-neutral-900/50 py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            What founding members got — forever
          </h2>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-xs text-primary-400">
                  ✓
                </span>
                <p className="text-sm text-neutral-200 sm:text-base">{feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            Common questions
          </h2>

          <div className="mx-auto mt-10 max-w-2xl space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-neutral-200 transition hover:text-primary-400">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-xl text-neutral-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-neutral-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA — monthly */}
      <section className="border-t border-neutral-800 bg-neutral-900/50 py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
            Missed the lifetime deal?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-400">
            You can still use AgentCenter with our monthly plan. Same platform, same agents, same
            results.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
          >
            View Monthly Pricing — ${monthlyPrice}/mo →
          </Link>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Active deal — normal purchase flow                                */
/* ------------------------------------------------------------------ */

function ActiveDealView({
  sold,
  total,
  remaining,
  monthlyPrice,
  yearlyCost,
  currentTier,
  nextTier,
  tiers,
  features,
  faqs,
}: {
  sold: number;
  total: number;
  remaining: number;
  monthlyPrice: number;
  yearlyCost: number;
  currentTier: SeatApiResponse["currentTier"];
  nextTier: SeatApiResponse["nextTier"];
  tiers: TierData[];
  features: string[];
  faqs: FaqItem[];
}) {
  return (
    <>
      {/* Hero seat counter */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary-500/10 blur-[150px]" />

        <Container className="relative text-center">
          <div className="mx-auto max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-400">
              ⚡ {remaining} of {total} seats remaining — then it&apos;s gone forever
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl lg:text-7xl">
              Own your AI agent platform. <span className="text-primary-400">Forever.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl">
              {total} lifetime seats. Starts at ${currentTier.price} — price increases every 25
              sold. Stop renting access. Lock in founder pricing before it&apos;s gone.
            </p>

            <a
              href="#pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
            >
              Claim Your Seat →
            </a>

            {/* Live seat counter */}
            <div className="mx-auto mt-10 max-w-md">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-primary-400">{sold} seats claimed</span>
                <span className="text-neutral-500">{remaining} remaining</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-700"
                  style={{ width: `${(sold / total) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                {sold} of {total} lifetime seats sold — real-time from Stripe
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="border-y border-neutral-800 py-12">
        <Container className="text-center">
          <div className="mb-4 flex items-center justify-center gap-1 text-primary-400">
            {"★★★★★".split("").map((_, i) => (
              <span key={i} className="text-xl">
                ★
              </span>
            ))}
          </div>
          <blockquote className="mx-auto max-w-2xl text-lg italic text-neutral-200 sm:text-xl">
            &ldquo;We used the team to ship a full go-to-market plan, product PRD, and affiliate
            program in 5 days. The agents actually work.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-neutral-500">— Early user, agentcenter.cloud</p>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">Who this is for</h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              This is not for casual experimenters. The lifetime deal rewards builders who are
              serious about AI-native workflows.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                icon: "⚡",
                title: "Build with AI",
                desc: "Developers and founders deploying AI agents in real products",
              },
              {
                icon: "👥",
                title: "Run lean teams",
                desc: "Replace or augment headcount with specialized AI agents",
              },
              {
                icon: "🕐",
                title: "Think in years, not months",
                desc: "You're building something that will still need this in 2027",
              },
              {
                icon: "🛡️",
                title: "Hate subscription creep",
                desc: `You know what $${monthlyPrice}/month becomes after 3 years ($${monthlyPrice * 36})`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-primary-500/30"
              >
                <span className="shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-50">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Math — table */}
      <section className="bg-neutral-900/50 py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              The math speaks for itself
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              At ${monthlyPrice}/month, you&apos;d pay ${yearlyCost} in year 1. {currentTier.name}{" "}
              costs ${currentTier.price}. You&apos;re ahead by {currentTier.breakeven.toLowerCase()}
              .
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">Plan</th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">Cost</th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Year 1 Savings
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Break-even
                    <span className="block text-[11px] font-normal text-neutral-500">
                      When lifetime costs less than monthly
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-800 text-neutral-500">
                  <td className="px-4 py-4">Monthly (current)</td>
                  <td className="px-4 py-4">
                    ${monthlyPrice}/mo → ${yearlyCost}/yr
                  </td>
                  <td className="px-4 py-4">—</td>
                  <td className="px-4 py-4">—</td>
                </tr>
                {tiers.map((tier) => (
                  <tr
                    key={tier.name}
                    className={`border-b border-neutral-800 ${
                      tier.isActive ? "bg-primary-500/5" : ""
                    } ${!tier.isActive ? "blur-[1.5px] opacity-40" : ""}`}
                  >
                    <td
                      className={`px-4 py-4 font-medium ${
                        tier.isActive ? "text-primary-400" : "text-neutral-200"
                      }`}
                    >
                      {tier.name}
                    </td>
                    <td className="px-4 py-4 font-semibold text-neutral-100">${tier.price} once</td>
                    <td className="px-4 py-4 text-primary-400">Save ${tier.savings}</td>
                    <td className="px-4 py-4 text-neutral-200">{tier.breakeven}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            After your break-even month, every additional month is{" "}
            <strong className="text-primary-400">pure profit</strong> on your investment.
          </p>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">Choose your tier</h2>
            <p className="mt-4 text-neutral-400">
              <span className="font-medium text-primary-400">{sold} sold</span> · {remaining} left ·
              Price increases every 25 seats.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, index) => {
              const progressPercent = (tier.seatsSold / tier.seatsPerTier) * 100;

              return (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                    tier.isActive
                      ? "border-primary-500 bg-primary-500/5 shadow-glow"
                      : "border-neutral-800 bg-neutral-900"
                  } ${!tier.isActive ? "pointer-events-none select-none blur-[2px] opacity-40" : ""}`}
                >
                  {!tier.isActive && !tier.isFilled && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl">
                      <span className="rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-1.5 text-xs font-medium text-neutral-400 blur-0">
                        🔒 Opens when previous tier fills
                      </span>
                    </div>
                  )}

                  {tier.isFilled && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl">
                      <span className="rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-1.5 text-xs font-medium text-neutral-400 blur-0">
                        ✅ Sold out
                      </span>
                    </div>
                  )}

                  {tier.isActive && index === 0 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-neutral-950">
                      🟢 Best Value
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider text-neutral-500">
                      {tier.label} · Seats {tier.seats}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-neutral-50">{tier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-50">${tier.price}</span>
                    <span className="ml-1 text-neutral-500">one-time</span>
                  </div>

                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-xs text-neutral-500">
                      <span>
                        {tier.seatsRemaining} of {tier.seatsPerTier} seats remaining
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-primary-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <p className="mb-6 text-sm text-neutral-500">
                    Save <span className="font-medium text-primary-400">${tier.savings}</span> vs
                    annual · Pays for itself by{" "}
                    <span className="font-medium text-neutral-300">{tier.breakeven}</span>
                  </p>

                  <ClaimSeatButton
                    tierName={tier.name}
                    highlight={tier.isActive}
                    active={tier.isActive}
                  />
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm italic text-neutral-500">
            Lifetime closes permanently after seat {total}. No exceptions. This isn&apos;t a
            countdown timer — it&apos;s math.
          </p>
        </Container>
      </section>

      {/* What You Get */}
      <section className="bg-neutral-900/50 py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            What you get — forever
          </h2>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-xs text-primary-400">
                  ✓
                </span>
                <p className="text-sm text-neutral-200 sm:text-base">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400">
              <strong className="text-neutral-200">Fair Use:</strong> Lifetime includes generous
              limits on active agents and task completions per month. Heavy compute usage beyond
              fair-use is billed at cost — we&apos;re protecting the platform for everyone. 95% of
              users will never hit this.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            Common questions
          </h2>

          <div className="mx-auto mt-10 max-w-2xl space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-neutral-200 transition hover:text-primary-400">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-xl text-neutral-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-neutral-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-neutral-800 bg-neutral-900/50 py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
            The window is open. It won&apos;t stay open.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-400">
            {remaining} builders left who get to own AgentCenter forever.
            <br />
            After seat {total}, this page goes dark.
          </p>

          <p className="mt-2 font-medium text-neutral-200">
            You&apos;re either a Founding Member, or you&apos;re not.
          </p>

          <a
            href="#pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
          >
            Claim Your {currentTier.name} Seat — ${currentTier.price} →
          </a>

          {nextTier && (
            <p className="mt-4 text-sm text-neutral-500">
              Price increases to ${nextTier.price} when {currentTier.name} tier fills.
            </p>
          )}

          <p className="mt-8 text-sm text-neutral-500">
            Questions? Email{" "}
            <a href="mailto:founder@agentcenter.cloud" className="text-primary-400 hover:underline">
              founder@agentcenter.cloud
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
