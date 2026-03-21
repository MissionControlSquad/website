"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Turnstile site key — NEXT_PUBLIC_ so it's safe to expose in the browser.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

// ── Config ────────────────────────────────────────────────────────────────────
const EXPERIMENT_END = new Date("2026-03-31T23:59:59Z");
const CURRENT_PRICE = 79;
const REFRESH_PROMPT_AFTER = 60;

const TIERS = [
  { threshold: 100, price: 69, save: 10 },
  { threshold: 250, price: 59, save: 20 },
  { threshold: 500, price: 49, save: 30 },
  { threshold: 1000, price: 39, save: 40 },
  { threshold: 2500, price: 29, save: 50 },
];

const FEATURES = [
  {
    icon: "👁",
    title: "See every agent, live",
    desc: "Real-time status, last heartbeat, current task. When an agent goes silent, you know instantly — not an hour later.",
  },
  {
    icon: "📋",
    title: "Kanban for your AI team",
    desc: "Assign tasks, track progress, close work. Exactly like Jira — but your team runs 24/7 without you.",
  },
  {
    icon: "🔗",
    title: "Multi-agent coordination",
    desc: "Wire a lead agent to distribute work to specialists. Dependencies, handoffs, subtasks — no custom code.",
  },
  {
    icon: "✅",
    title: "Review before it ships",
    desc: "Every deliverable lands in a queue. You approve, reject, or send back for revision. Nothing slips through.",
  },
];

const FAQ = [
  {
    q: "What happens if the threshold isn't reached?",
    a: "Pricing stays exactly as it is. Nothing changes. This is an experiment — if demand doesn't show up, I have my answer and I'll move on to figuring out what the real objection is.",
  },
  {
    q: "Do I need to pay anything to join?",
    a: "Zero. Nothing. You're registering interest, not buying anything. You'll only hear from me if a pricing tier actually unlocks.",
  },
  {
    q: "When will I find out the result?",
    a: "The experiment closes March 31, 2026. If a tier unlocks, I'll email everyone who registered within 24 hours of closing.",
  },
  {
    q: "Why should I trust this?",
    a: "The count is live and public. The tiers are fixed and listed right on this page. If the numbers don't hit a threshold, nothing happens — and I can't pretend otherwise.",
  },
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

// Animate a number from `from` to `to` over `duration`ms (ease-out cubic).
function useCountUp(to: number, duration = 900) {
  const [value, setValue] = useState(to);
  const prevRef = useRef(to);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = to;
    if (from === to) return;

    const start = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  return value;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PricingDropContent() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [signups, setSignups] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const animatedSignups = useCountUp(signups);

  // ── Fetch real count from API ───────────────────────────────────────────────
  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/pricing-drop");
      if (!res.ok) throw new Error("Failed to fetch count");
      const { count } = await res.json();
      setSignups(Number(count) || 0);
      setLastUpdated(new Date());
    } catch {
      // Fail silently — form still works
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setShowRefresh(false);
    await fetchCount();
    setRefreshing(false);
    setTimeout(() => setShowRefresh(true), REFRESH_PROMPT_AFTER * 1000);
  }, [fetchCount]);

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    setTimeLeft(getTimeLeft(EXPERIMENT_END));
    const clock = setInterval(() => setTimeLeft(getTimeLeft(EXPERIMENT_END)), 1000);

    // Triple client-side guard: localStorage + sessionStorage + cookie
    const inLocal = !!localStorage.getItem("pd_submitted");
    const inSession = !!sessionStorage.getItem("pd_submitted");
    const inCookie = document.cookie.split(";").some((c) => c.trim().startsWith("pd_sub=1"));
    if (inLocal || inSession || inCookie) setSubmitted(true);

    fetchCount();
    const refreshTimer = setTimeout(() => setShowRefresh(true), REFRESH_PROMPT_AFTER * 1000);

    return () => {
      clearInterval(clock);
      clearTimeout(refreshTimer);
    };
  }, [fetchCount]);

  // ── Turnstile widget ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current || submitted) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!turnstileRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).turnstile?.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => setTurnstileToken(null),
        theme: "dark",
        size: "normal",
      });
    };

    return () => {
      script.remove();
    };
  }, [submitted]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || expired || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/pricing-drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          turnstileToken: turnstileToken ?? undefined,
          // honeypot intentionally omitted — only bots send it
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Set all three client-side guards simultaneously
      localStorage.setItem("pd_submitted", "1");
      sessionStorage.setItem("pd_submitted", "1");
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `pd_sub=1; expires=${expires}; path=/; SameSite=Strict`;
      setSubmitted(true);
      if (typeof data.count === "number") {
        setSignups(data.count);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const expired = timeLeft === null && typeof window !== "undefined";
  const nextTier = getNextTier(signups);
  const prevTier = getPrevTier(signups);
  const prevThreshold = prevTier?.threshold ?? 0;
  const progress = Math.min(
    ((signups - prevThreshold) / (nextTier.threshold - prevThreshold)) * 100,
    100
  );
  const unlockedCount = TIERS.filter((t) => signups >= t.threshold).length;
  const remaining = nextTier.threshold - signups;
  const maxTier = TIERS[TIERS.length - 1];
  const maxSavings = (CURRENT_PRICE - maxTier.price) * 12;

  function scrollToForm() {
    const el = document.getElementById("email-input");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el?.focus({ preventScroll: true }), 400);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main id="main-content" className="min-h-screen pt-16 bg-neutral-950 overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-b border-neutral-800">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-[560px] h-[560px] bg-primary-500/15 blur-[140px] rounded-full" />
          <div className="absolute top-32 right-1/4 w-[380px] h-[380px] bg-primary-600/8 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Live count badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs text-primary-400 mb-8 animate-hero-fade-in [animation-delay:100ms]">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse inline-block" />
            {loading
              ? "Loading experiment..."
              : `${animatedSignups.toLocaleString()} people already locked in`}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight tracking-tight mb-5 animate-hero-fade-in [animation-delay:200ms]">
            People said AgentCenter <span className="gradient-text">is too expensive.</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 mb-3 font-light animate-hero-fade-in [animation-delay:300ms]">
            So I&apos;m running a live experiment.
          </p>

          <p className="text-neutral-500 text-base max-w-xl mx-auto mb-10 animate-hero-fade-in [animation-delay:350ms]">
            The more people who join, the lower the price drops — permanently locked in for early
            supporters.{" "}
            {timeLeft && (
              <span className="text-neutral-400">
                Closes in {timeLeft.days}d {timeLeft.hours}h.
              </span>
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-hero-fade-in [animation-delay:400ms]">
            <button
              onClick={scrollToForm}
              className="gradient-bg px-8 py-4 rounded-xl text-white font-semibold text-sm shadow-[0_0_20px_rgba(14,165,233,0.35)] hover:shadow-[0_0_35px_rgba(14,165,233,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              Lock in my price →
            </button>
            <a
              href="https://twitter.com/agentcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-sm transition-all"
            >
              View on Twitter ↗
            </a>
          </div>

          {/* Micro trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 animate-hero-fade-in [animation-delay:500ms]">
            {["No payment today", "Closes Mar 31", "Public & verifiable"].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-neutral-600">
                <span className="w-1 h-1 rounded-full bg-primary-500/50 inline-block" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="rounded-2xl bg-neutral-900 border border-neutral-700/60 p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-7">
                How this works
              </p>
              <div className="space-y-6">
                {[
                  {
                    n: "1",
                    title: "You register your email",
                    body: "No payment. No commitment. Just a signal that pricing actually matters to you.",
                  },
                  {
                    n: "2",
                    title: "The counter rises publicly",
                    body: "Every signup is counted live. The number you see is the real number — nothing is hidden.",
                  },
                  {
                    n: "3",
                    title: "Tiers unlock when thresholds are hit",
                    body: "When a threshold is crossed, pricing drops for everyone who joined at or below that tier.",
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500/15 border border-primary-500/25 text-primary-400 text-xs font-bold flex items-center justify-center mt-0.5">
                      {n}
                    </span>
                    <div>
                      <p className="text-neutral-200 text-sm font-semibold mb-1">{title}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-neutral-500 text-xs mt-7 pt-5 border-t border-neutral-800">
                This is market research, not a promotion. If signups don&apos;t hit a threshold,
                nothing changes and I&apos;ll move on to finding the real objection.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── COUNTDOWN ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 border-b border-neutral-800">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary-500/5 blur-[80px]" />
        </div>
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            {expired ? (
              <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-12">
                <p className="text-2xl font-bold text-neutral-300">Experiment Closed</p>
                <p className="text-neutral-500 mt-2 text-sm">Pricing has been locked.</p>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                  Experiment closes in
                </p>
                <div className="flex justify-center gap-3 md:gap-4">
                  {timeLeft === null
                    ? [
                        { label: "days" },
                        { label: "hours" },
                        { label: "min" },
                        { label: "sec" },
                      ].map(({ label }) => (
                        <div key={label} className="flex flex-col items-center">
                          <div className="rounded-xl bg-neutral-900 border border-neutral-700/60 w-[72px] h-[72px] md:w-[84px] md:h-[84px] animate-pulse" />
                          <span className="text-xs text-neutral-600 mt-2">{label}</span>
                        </div>
                      ))
                    : (
                        [
                          { value: timeLeft.days, label: "days", isLive: false },
                          { value: timeLeft.hours, label: "hours", isLive: false },
                          { value: timeLeft.minutes, label: "min", isLive: false },
                          { value: timeLeft.seconds, label: "sec", isLive: true },
                        ] as const
                      ).map(({ value, label, isLive }) => (
                        <div key={label} className="flex flex-col items-center">
                          <div
                            className={`rounded-xl border w-[72px] h-[72px] md:w-[84px] md:h-[84px] flex items-center justify-center transition-all ${
                              isLive
                                ? "bg-neutral-900 border-primary-500/30 shadow-[0_0_18px_rgba(14,165,233,0.12)]"
                                : "bg-neutral-900 border-neutral-700/60"
                            }`}
                          >
                            {/* key change on seconds triggers CSS fade-in animation */}
                            <span
                              key={`${label}-${value}`}
                              className="text-2xl md:text-3xl font-bold text-neutral-100 tabular-nums animate-[fade-in_0.2s_ease_both]"
                            >
                              {String(value).padStart(2, "0")}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-500 mt-2">{label}</span>
                        </div>
                      ))}
                </div>
                <p className="text-xs text-neutral-500 mt-6">
                  After this closes, pricing returns to ${CURRENT_PRICE}/month permanently.
                </p>
              </>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRICING TIERS + LIVE PROGRESS ─────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Demand-based pricing
              </p>
              <p className="text-xs text-neutral-500">
                Current:{" "}
                <span className="text-neutral-400 font-medium">${CURRENT_PRICE}/month</span>
              </p>
            </div>

            <div className="space-y-2.5 mb-8">
              {TIERS.map((tier, i) => {
                const isNext = tier.threshold === nextTier.threshold;
                const isUnlocked = signups >= tier.threshold;
                const isMax = i === TIERS.length - 1;

                return (
                  <div
                    key={tier.threshold}
                    className={`flex items-center justify-between rounded-xl border px-5 py-4 transition-all duration-300 ${
                      isNext
                        ? "bg-primary-500/[0.07] border-primary-500/40 shadow-[0_0_20px_rgba(14,165,233,0.07)]"
                        : isUnlocked
                          ? "bg-neutral-800/40 border-neutral-700/50"
                          : "bg-neutral-900/40 border-neutral-800/60"
                    }`}
                  >
                    {/* Left — threshold + badges */}
                    <div className="flex items-center gap-3">
                      {isUnlocked ? (
                        <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3.5 h-3.5 text-primary-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            isNext
                              ? "border-primary-500/40 bg-primary-500/10"
                              : "border-neutral-700"
                          }`}
                        >
                          {isNext && (
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            isNext
                              ? "text-neutral-100"
                              : isUnlocked
                                ? "text-neutral-300"
                                : "text-neutral-500"
                          }`}
                        >
                          {tier.threshold.toLocaleString()} people
                        </span>
                        {isNext && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/25 font-medium">
                            next unlock
                          </span>
                        )}
                        {isUnlocked && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-700/40 text-neutral-500 font-medium">
                            unlocked ✓
                          </span>
                        )}
                        {isMax && !isUnlocked && !isNext && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500/70 border border-amber-500/20 font-medium">
                            max savings
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right — price */}
                    <div className="flex items-baseline gap-1.5 text-right flex-shrink-0">
                      <span
                        className={`font-bold text-base ${
                          isNext
                            ? "text-primary-300"
                            : isUnlocked
                              ? "text-neutral-200"
                              : "text-neutral-600"
                        }`}
                      >
                        ${tier.price}
                        <span className="text-xs font-normal">/mo</span>
                      </span>
                      <span
                        className={`text-xs ${
                          isNext
                            ? "text-primary-500/80"
                            : isUnlocked
                              ? "text-neutral-600"
                              : "text-neutral-600"
                        }`}
                      >
                        −${tier.save}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Live progress card */}
          <ScrollReveal staggerIndex={1}>
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              {unlockedCount > 0 && (
                <p className="text-[11px] text-center text-neutral-600 mb-4 uppercase tracking-wider">
                  {unlockedCount} of {TIERS.length} tiers unlocked
                </p>
              )}

              <div className="text-center mb-5">
                {loading ? (
                  <div className="h-11 w-36 bg-neutral-800 rounded-lg animate-pulse mx-auto mb-2" />
                ) : (
                  <p className="text-4xl font-bold text-neutral-100 tabular-nums">
                    {animatedSignups.toLocaleString()}
                    <span className="text-neutral-600 font-normal text-xl">
                      {" "}
                      / {nextTier.threshold.toLocaleString()}
                    </span>
                  </p>
                )}
                <p className="text-neutral-500 mt-2 text-sm">
                  to unlock{" "}
                  <span className="text-primary-400 font-semibold">${nextTier.price}/month</span>
                </p>
              </div>

              {/* Progress bar — gradient + glow */}
              <div className="relative h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-primary-600 to-primary-400"
                  style={{
                    width: loading ? "0%" : `${progress}%`,
                    boxShadow: progress > 5 ? "0 0 10px rgba(14,165,233,0.5)" : "none",
                  }}
                />
              </div>

              <p className="text-sm text-neutral-400 text-center mt-4 font-medium">
                Just{" "}
                <span className="text-neutral-100">{remaining.toLocaleString()} more people</span>{" "}
                to unlock <span className="text-primary-400">${nextTier.price}/month</span>
              </p>

              {/* Refresh controls */}
              <div className="flex flex-col items-center mt-4 gap-2 min-h-[32px]">
                {showRefresh && !refreshing && (
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-300 border border-neutral-800 hover:border-neutral-600 rounded-lg px-3 py-1.5 transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh stats
                  </button>
                )}
                {refreshing && <span className="text-xs text-neutral-500">Updating...</span>}
                {lastUpdated && !showRefresh && !refreshing && (
                  <span className="text-xs text-neutral-600">
                    Updated{" "}
                    {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURES AT A GLANCE ──────────────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
              What you&apos;re actually getting
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} staggerIndex={i % 2}>
                <div className="rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-5 transition-colors h-full">
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <p className="text-neutral-200 text-sm font-semibold mb-1.5">{f.title}</p>
                  <p className="text-neutral-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE COMPARISON ──────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
              The math
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Without experiment */}
              <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 text-center">
                <p className="text-xs text-neutral-600 uppercase tracking-wider mb-5">
                  Without this
                </p>
                <p className="text-4xl font-bold text-neutral-500">${CURRENT_PRICE}</p>
                <p className="text-xs text-neutral-500 mt-1">/month</p>
                <p className="text-xs text-neutral-500 mt-4 pb-1">
                  ${(CURRENT_PRICE * 12).toLocaleString()}/year
                </p>
              </div>

              {/* With max tier */}
              <div className="rounded-xl bg-primary-500/[0.07] border border-primary-500/30 p-6 text-center shadow-[0_0_28px_rgba(14,165,233,0.07)]">
                <p className="text-xs text-primary-400 uppercase tracking-wider mb-5">
                  Your locked price
                </p>
                <p className="text-4xl font-bold text-primary-300">${maxTier.price}</p>
                <p className="text-xs text-primary-500/60 mt-1">/month</p>
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-primary-500/15 border border-primary-500/20 inline-block">
                  <p className="text-xs text-primary-400 font-semibold">
                    Save ${maxSavings.toLocaleString()}/year
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-4">
              Locked price shown at {maxTier.threshold.toLocaleString()} signups. Each tier above
              guarantees progressively lower pricing for everyone who registered.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-28 border-b border-neutral-800" id="signup">
        {/* Glow blob behind form */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-primary-500/10 blur-[100px]" />
        </div>

        <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            {submitted ? (
              <div className="rounded-2xl bg-neutral-900 border border-primary-500/30 p-10 shadow-[0_0_40px_rgba(14,165,233,0.07)]">
                <div className="w-14 h-14 rounded-full bg-primary-500/15 border border-primary-500/25 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                  <svg
                    className="w-7 h-7 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-neutral-100 mb-1">You&apos;re in.</p>
                <p className="text-primary-400 text-sm font-medium mb-7">
                  #{signups.toLocaleString()} on the list
                </p>
                <div className="text-sm text-left space-y-2.5 mb-7">
                  <p className="text-neutral-600 text-xs mb-3">
                    If a tier unlocks, you&apos;ll receive:
                  </p>
                  {["Your permanently locked-in price", "A private access link to subscribe"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        <span className="text-neutral-300 text-sm">{item}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <p className="text-xs text-neutral-600 mb-3">
                    Know someone who also thinks AgentCenter is too expensive?
                  </p>
                  <a
                    href="https://twitter.com/intent/tweet?text=AgentCenter%20is%20running%20a%20pricing%20experiment%20%E2%80%94%20the%20more%20people%20join%2C%20the%20lower%20the%20price%20drops.%20Join%3A%20https%3A%2F%2Fagentcenter.cloud%2Fpricing-drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 border border-primary-500/20 hover:border-primary-500/40 rounded-lg px-4 py-2 transition-all"
                  >
                    Share the experiment ↗
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-8 md:p-10">
                <p className="text-2xl font-bold text-neutral-100 mb-2">Secure your price.</p>
                <p className="text-neutral-500 text-sm mb-1">
                  People paying ${CURRENT_PRICE}/month today won&apos;t get this. Ever.
                </p>
                <p className="text-neutral-600 text-xs mb-8">
                  Once the timer ends, this page goes dark.
                </p>

                {expired ? (
                  <div className="rounded-xl bg-neutral-800 border border-neutral-700 p-6">
                    <p className="text-neutral-400 text-sm">Signups are now closed.</p>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      {/* Honeypot — hidden from real users, bots fill it automatically */}
                      <input
                        type="text"
                        name="website"
                        aria-hidden="true"
                        tabIndex={-1}
                        autoComplete="off"
                        onChange={(e) => {
                          if (e.target.value) {
                            fetch("/api/pricing-drop", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: "", honeypot: e.target.value }),
                            });
                          }
                        }}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          pointerEvents: "none",
                          height: 0,
                          width: 0,
                          overflow: "hidden",
                        }}
                      />

                      <div className="flex flex-col gap-3">
                        <input
                          id="email-input"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={submitting}
                          className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3.5 text-neutral-100 placeholder-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={submitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                          className="w-full gradient-bg px-6 py-3.5 rounded-xl text-white font-semibold text-sm shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:shadow-none disabled:pointer-events-none transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        >
                          {submitting ? "Saving..." : "Lock in my price →"}
                        </button>
                      </div>

                      {/* Turnstile widget */}
                      {TURNSTILE_SITE_KEY && (
                        <div ref={turnstileRef} className="flex justify-center mt-1" />
                      )}
                    </form>

                    {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
                    <p className="text-xs text-neutral-500 mt-4">
                      No spam. One email if pricing drops.
                    </p>
                  </>
                )}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRODUCT CONTEXT ───────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
              What AgentCenter solves
            </p>
            <div className="rounded-2xl bg-neutral-900 border border-neutral-700/60 p-7 md:p-8">
              <p className="text-neutral-300 mb-4 leading-relaxed text-sm">
                Most multi-agent setups fail the same way: eight agents are running in parallel, one
                of them stalls, and you have no idea which one — or why.
              </p>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                AgentCenter gives you the observability and coordination layer those setups are
                missing. Without writing any orchestration code.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: "Multi-agent observability",
                    desc: "see what every agent is actually doing",
                  },
                  {
                    label: "Task coordination",
                    desc: "wire agents together without it becoming a mess",
                  },
                  { label: "Long-running workflows", desc: "jobs that take hours, not seconds" },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    </span>
                    <div>
                      <span className="text-neutral-200 text-sm font-semibold">{label}</span>
                      <span className="text-neutral-500 text-sm"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-neutral-600 text-xs mt-6 pt-5 border-t border-neutral-800">
                This is where most setups fail.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-8">
              Questions
            </p>
          </ScrollReveal>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <ScrollReveal key={i} staggerIndex={i % 2}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-5 py-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-neutral-200 text-sm font-medium">{item.q}</span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 text-neutral-500 transition-transform mt-0.5 ${openFaq === i ? "rotate-45" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  {openFaq === i && (
                    <p className="text-neutral-500 text-sm mt-3 leading-relaxed animate-[fade-in_0.2s_ease_both]">
                      {item.a}
                    </p>
                  )}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 bg-primary-500/8 blur-[100px]" />
        </div>
        <div className="max-w-sm mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-neutral-400 text-lg font-medium mb-2">
              {expired
                ? "The experiment has ended."
                : `${remaining.toLocaleString()} people away from $${nextTier.price}/month.`}
            </p>
            {!expired && (
              <p className="text-neutral-600 text-sm mb-8">Your signup is one of them.</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToForm}
                disabled={expired || submitted}
                className="gradient-bg px-8 py-4 rounded-xl text-white font-semibold text-sm shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_35px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                {submitted ? "You're locked in ✓" : "Lock in my price →"}
              </button>
              <a
                href="https://twitter.com/agentcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-sm transition-all"
              >
                View on Twitter ↗
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ANTI-ABUSE NOTICE ─────────────────────────────────────────────────── */}
      <section className="py-10 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <p className="text-xs text-neutral-500 leading-relaxed">
            To keep this experiment honest, we store a hashed fingerprint of your device and network
            to prevent duplicate entries. No raw IP addresses are ever saved. Your email is stored
            solely to notify you if pricing changes — it will not be shared, sold, or used for
            anything else.
          </p>
          <p className="text-xs text-neutral-500">
            Submissions from disposable email addresses, bots, or automated tools are automatically
            rejected. Each device may register once.
          </p>
        </div>
      </section>
    </main>
  );
}
