"use client";

import { useState, useEffect } from "react";

// ── Config ────────────────────────────────────────────────────────────────────
const EXPERIMENT_END = new Date("2026-04-15T23:59:59Z");
const INITIAL_SIGNUPS = 742;
const CURRENT_PRICE = 79;

// Each tier: meaningful $10 step anchored to the real $79/month price.
// Thresholds scale — early tiers are easier, later ones require real traction.
const TIERS = [
  { threshold: 100, price: 69, save: 10  },
  { threshold: 250, price: 59, save: 20  },
  { threshold: 500, price: 49, save: 30  },
  { threshold: 1000, price: 39, save: 40  },
  { threshold: 2500, price: 29, save: 50  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getTimeLeft(end: Date) {
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function getNextTier(signups: number) {
  return TIERS.find((t) => signups < t.threshold) ?? TIERS[TIERS.length - 1];
}

function getPrevTier(signups: number) {
  const idx = TIERS.findIndex((t) => signups < t.threshold);
  return idx > 0 ? TIERS[idx - 1] : null;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PricingDropContent() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [signups, setSignups] = useState(INITIAL_SIGNUPS);

  useEffect(() => {
    setTimeLeft(getTimeLeft(EXPERIMENT_END));

    const stored = localStorage.getItem("pricing-drop-email");
    if (stored) setSubmitted(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(EXPERIMENT_END));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const expired = timeLeft === null && typeof window !== "undefined";
  const nextTier = getNextTier(signups);
  const prevTier = getPrevTier(signups);

  const prevThreshold = prevTier?.threshold ?? 0;
  const progress = Math.min(
    ((signups - prevThreshold) / (nextTier.threshold - prevThreshold)) * 100,
    100
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || expired) return;
    localStorage.setItem("pricing-drop-email", email);
    setSubmitted(true);
    setSignups((s) => s + 1);
  }

  function scrollToForm() {
    document.getElementById("email-input")?.focus({ preventScroll: false });
    document.getElementById("email-input")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main id="main-content" className="min-h-screen pt-16 bg-neutral-950">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse inline-block" />
              Market Research · Active Experiment
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight tracking-tight mb-5">
              People said AgentCenter{" "}
              <span className="gradient-text">is too expensive.</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 mb-3 font-light">
              So I&apos;m running a simple experiment.
            </p>

            <p className="text-neutral-500 text-base">
              I want to understand — is it really pricing, or something else?
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToForm}
                className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-medium text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                Join waitlist
              </button>
              <a
                href="https://twitter.com/agentcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-sm transition-all"
              >
                View on Twitter ↗
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Experiment Explanation ────────────────────────────────────────── */}
      <section className="py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl bg-neutral-900 border border-neutral-700/60 p-7 md:p-8">
              <p className="text-neutral-200 text-lg leading-relaxed mb-4">
                This is not a promotion. This is market research.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                If enough people are genuinely interested, I&apos;ll reduce pricing for early supporters.
              </p>
              <p className="text-neutral-400 mt-3 leading-relaxed">
                If not, pricing stays the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Countdown ─────────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">

            {expired ? (
              <div className="rounded-xl bg-neutral-900 border border-neutral-700 p-10">
                <p className="text-2xl font-bold text-neutral-300">Pricing Locked</p>
                <p className="text-neutral-500 mt-2 text-sm">The experiment has ended.</p>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                  Experiment closes in
                </p>
                <div className="flex justify-center gap-3 md:gap-5">
                  {timeLeft === null ? (
                    // Skeleton before hydration
                    [{ label: "days" }, { label: "hours" }, { label: "min" }, { label: "sec" }].map(({ label }) => (
                      <div key={label} className="flex flex-col items-center">
                        <div className="rounded-xl bg-neutral-900 border border-neutral-700/60 w-[68px] h-[68px] md:w-20 md:h-20 animate-pulse" />
                        <span className="text-xs text-neutral-600 mt-2">{label}</span>
                      </div>
                    ))
                  ) : (
                    [
                      { value: timeLeft.days, label: "days" },
                      { value: timeLeft.hours, label: "hours" },
                      { value: timeLeft.minutes, label: "min" },
                      { value: timeLeft.seconds, label: "sec" },
                    ].map(({ value, label }) => (
                      <div key={label} className="flex flex-col items-center">
                        <div className="rounded-xl bg-neutral-900 border border-neutral-700/60 w-[68px] h-[68px] md:w-20 md:h-20 flex items-center justify-center">
                          <span className="text-2xl md:text-3xl font-bold text-neutral-100 tabular-nums">
                            {String(value).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500 mt-2">{label}</span>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* ── Pricing Tiers ─────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">

            {/* Current price anchor */}
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Demand-based pricing
              </p>
              <p className="text-xs text-neutral-500">
                Current price:{" "}
                <span className="text-neutral-400 font-medium">${CURRENT_PRICE}/month</span>
              </p>
            </div>

            <div className="space-y-2">
              {TIERS.map((tier) => {
                const isNext = tier.threshold === nextTier.threshold;
                const isUnlocked = signups >= tier.threshold;

                return (
                  <div
                    key={tier.threshold}
                    className={`flex items-center justify-between rounded-xl border px-5 py-4 transition-all ${
                      isNext
                        ? "bg-primary-500/[0.08] border-primary-500/35"
                        : isUnlocked
                        ? "bg-neutral-800/40 border-neutral-700/50"
                        : "bg-neutral-900/40 border-neutral-800/60"
                    }`}
                  >
                    {/* Left: status + threshold */}
                    <div className="flex items-center gap-3">
                      {isUnlocked ? (
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-neutral-700 flex-shrink-0 inline-block" />
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${isNext ? "text-neutral-200" : isUnlocked ? "text-neutral-400" : "text-neutral-500"}`}>
                          {tier.threshold.toLocaleString()} people
                        </span>
                        {isNext && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/25">
                            next
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: price + savings */}
                    <div className="flex items-baseline gap-2 text-right">
                      <span className={`font-semibold text-sm ${isNext ? "text-primary-300" : isUnlocked ? "text-neutral-300" : "text-neutral-600"}`}>
                        ${tier.price}/month
                      </span>
                      <span className={`text-xs ${isNext ? "text-primary-500/70" : isUnlocked ? "text-neutral-500" : "text-neutral-700"}`}>
                        save ${tier.save}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Live Progress ─────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">

            <div className="text-center mb-5">
              <p className="text-3xl font-bold text-neutral-100 tabular-nums">
                {signups.toLocaleString()}
                <span className="text-neutral-500 font-normal text-xl">
                  {" "}/ {nextTier.threshold.toLocaleString()}
                </span>
              </p>
              <p className="text-neutral-400 mt-2 text-sm">
                unlocking{" "}
                <span className="text-primary-400 font-medium">${nextTier.price}/month</span>
              </p>
            </div>

            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-neutral-600 text-center mt-3">
              {Math.round(progress)}% toward next milestone
            </p>

          </div>
        </div>
      </section>

      {/* ── Email Capture ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">

            {submitted ? (
              <div className="rounded-xl bg-neutral-900 border border-primary-500/25 p-8 md:p-10">
                <div className="w-10 h-10 rounded-full bg-primary-500/15 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-neutral-100 mb-4">You&apos;re in.</p>
                <div className="text-sm text-neutral-400 text-left space-y-1">
                  <p className="text-neutral-500 mb-3">If pricing drops, you&apos;ll receive:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-0.5 flex-shrink-0">→</span>
                      your locked-in price
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-0.5 flex-shrink-0">→</span>
                      a private access link
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <p className="text-neutral-500 text-sm mb-3">
                  Only people who join before the timer ends get discounted pricing.
                </p>
                <p className="text-neutral-600 text-xs mb-7">
                  This will not be available later.
                </p>

                {expired ? (
                  <div className="rounded-xl bg-neutral-900 border border-neutral-700 p-7">
                    <p className="text-neutral-400 text-sm">Signups are closed.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-medium text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/40 whitespace-nowrap"
                    >
                      Get Early Access
                    </button>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      </section>

      {/* ── Clarity ───────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-neutral-400 text-sm leading-relaxed">
              This experiment is running across Twitter, Reddit, and other platforms.
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              The only thing that counts is joining here.
            </p>
          </div>
        </div>
      </section>

      {/* ── Product Context ───────────────────────────────────────────────── */}
      <section className="py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">

            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
              What is AgentCenter
            </p>

            <div className="rounded-xl bg-neutral-900 border border-neutral-700/60 p-7">
              <p className="text-neutral-300 mb-5 leading-relaxed">
                AgentCenter is built for running real multi-agent systems:
              </p>
              <ul className="space-y-3 mb-5">
                {[
                  { label: "observability", desc: "see what every agent is actually doing" },
                  { label: "coordination", desc: "wire agents together without it becoming a mess" },
                  { label: "long-running workflows", desc: "jobs that take hours, not seconds" },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                    <div>
                      <span className="text-neutral-300 text-sm font-medium">{label}</span>
                      <span className="text-neutral-500 text-sm"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-neutral-500 text-sm border-t border-neutral-800 pt-5">
                This is where most setups fail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-sm mx-auto text-center">
            <p className="text-neutral-500 text-sm mb-6">
              {expired
                ? "The experiment has ended."
                : "Join before the timer runs out."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToForm}
                disabled={expired || submitted}
                className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-400 disabled:opacity-40 disabled:pointer-events-none text-white font-medium text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                {submitted ? "You're on the list" : "Join waitlist"}
              </button>
              <a
                href="https://twitter.com/agentcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-sm transition-all"
              >
                View on Twitter ↗
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
