"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Minus, LayoutList, Monitor } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PricingPage } from "@buildbase/sdk/react";
import { trackBeginCheckout } from "@/lib/analytics";
import { SELFHOSTING_PRICING, SELF_HOST_PLAN_NAME } from "@/lib/constants";
import { useBuildbaseReady } from "@/components/providers/BuildbaseProvider";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
const PLAN_GROUP_SLUG = process.env.NEXT_PUBLIC_PLAN_GROUP_SLUG ?? "";

type BillingInterval = "monthly" | "quarterly" | "yearly";

interface PlanData {
  _id: string;
  name: string;
  description?: string;
  pricingVariants?: Array<{ currency: string; basePricing?: Record<string, number> }>;
  features?: Record<string, boolean>;
  limits?: Record<string, number>;
  quotas?: Record<
    string,
    Record<string, { included?: number; overage?: number; unitSize?: number }>
  >;
  trial?: { enabled: boolean; durationDays: number; requireCard: boolean };
}

interface PlanItem {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description?: string;
}

function asPlanData(raw: unknown): PlanData {
  return raw as PlanData;
}
function asPlanItem(raw: unknown): PlanItem {
  return raw as PlanItem;
}

function calcSavings(monthlyCents: number, periodCents: number, months: number): number {
  if (!monthlyCents || !periodCents) return 0;
  return Math.round((1 - periodCents / (monthlyCents * months)) * 100);
}

function getActiveCents(
  billing: BillingInterval,
  monthly: number,
  quarterly: number,
  yearly: number
): number {
  if (billing === "quarterly") return quarterly;
  if (billing === "yearly") return yearly;
  return monthly;
}

function getPerMonthDollars(
  billing: BillingInterval,
  monthly: number,
  quarterly: number,
  yearly: number
): number {
  if (billing === "quarterly") return quarterly / 100 / 3;
  if (billing === "yearly") return yearly / 100 / 12;
  return monthly / 100;
}

// ─── Shimmer ──────────────────────────────────────────────────────────────────

function Shimmer({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-neutral-700/60 ${className}`}
      style={style}
    >
      <div className="absolute inset-0 animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function PlanCardSkeleton({ popular = false }: { popular?: boolean }) {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-2xl ${popular ? "bg-primary-500/10 border-2 border-primary-500/30" : "bg-neutral-900 border border-neutral-700/80"}`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Shimmer className="h-5 w-24 rounded-full" />
        </div>
      )}
      <Shimmer className="h-5 w-16 mb-6" />
      <div className="mb-6">
        <div className="flex items-baseline gap-1.5">
          <Shimmer className="h-10 w-20" />
          <Shimmer className="h-4 w-8" />
        </div>
        <Shimmer className="h-3 w-28 mt-2" />
      </div>
      <Shimmer className="h-12 w-full rounded-xl mb-2" />
      <Shimmer className="h-3 w-40 mx-auto mb-2" />
      <Shimmer className="h-3 w-32 mx-auto mb-6" />
      <ul className="space-y-3 flex-1">
        {[72, 60, 80, 55, 68, 75, 50].map((w, i) => (
          <li key={i} className="flex items-center gap-3">
            <Shimmer className="w-4 h-4 rounded-full flex-shrink-0" />
            <Shimmer className="h-3.5 rounded" style={{ width: `${w}%` }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingGridSkeleton() {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-12">
        <Shimmer className="h-9 w-24 rounded-lg" />
        <Shimmer className="h-9 w-32 rounded-lg" />
        <Shimmer className="h-9 w-28 rounded-lg" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <PlanCardSkeleton />
        <PlanCardSkeleton popular />
        <PlanCardSkeleton />
      </div>
      <div className="flex justify-center mb-4">
        <Shimmer className="h-9 w-44 rounded-lg" />
      </div>
    </>
  );
}

function PricingSingleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Shimmer className="h-9 w-24 rounded-lg" />
        <Shimmer className="h-9 w-32 rounded-lg" />
        <Shimmer className="h-9 w-28 rounded-lg" />
      </div>
      <div className="relative p-8 md:p-12 rounded-2xl bg-primary-500/10 border-2 border-primary-500/30">
        <div className="text-center mb-8">
          <Shimmer className="h-16 w-44 mx-auto rounded-lg mb-3" />
          <Shimmer className="h-4 w-52 mx-auto rounded" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Shimmer className="w-5 h-5 rounded-full flex-shrink-0" />
              <Shimmer className="h-4 rounded flex-1" />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Shimmer className="h-14 w-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── BillingToggle ────────────────────────────────────────────────────────────

function BillingToggle({
  billing,
  onChange,
  quarterlySavings,
  yearlySavings,
  staggerIndex = 0,
  className = "flex items-center justify-center gap-3 mb-10",
}: {
  billing: BillingInterval;
  onChange: (b: BillingInterval) => void;
  quarterlySavings: number;
  yearlySavings: number;
  staggerIndex?: number;
  className?: string;
}) {
  return (
    <ScrollReveal className={className} staggerIndex={staggerIndex}>
      {(["monthly", "quarterly", "yearly"] as const).map((period) => {
        const savings =
          period === "quarterly" ? quarterlySavings : period === "yearly" ? yearlySavings : 0;
        return (
          <button
            key={period}
            onClick={() => onChange(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billing === period
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
            {savings > 0 && (
              <span className="ml-2 text-xs bg-success-500/20 text-success-400 px-2 py-0.5 rounded-full">
                Save ~{savings}%
              </span>
            )}
          </button>
        );
      })}
    </ScrollReveal>
  );
}

// ─── PriceDisplay ─────────────────────────────────────────────────────────────

function PriceDisplay({
  billing,
  monthlyCents,
  quarterlyCents,
  yearlyCents,
}: {
  billing: BillingInterval;
  monthlyCents: number;
  quarterlyCents: number;
  yearlyCents: number;
}) {
  const perMonthDollars = getPerMonthDollars(billing, monthlyCents, quarterlyCents, yearlyCents);
  return (
    <>
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <span className="text-5xl md:text-6xl font-bold text-neutral-100">
          ${Math.floor(perMonthDollars)}
        </span>
        {perMonthDollars % 1 !== 0 && (
          <span className="text-2xl font-bold text-neutral-100">
            .{String(Math.round((perMonthDollars % 1) * 100)).padStart(2, "0")}
          </span>
        )}
        <span className="text-xl text-neutral-400">/month</span>
      </div>
      {billing === "quarterly" && quarterlyCents > 0 && (
        <p className="text-sm text-neutral-400 mb-2">
          Billed as ${(quarterlyCents / 100).toFixed(0)}/quarter
        </p>
      )}
      {billing === "yearly" && yearlyCents > 0 && (
        <p className="text-sm text-neutral-400 mb-2">
          Billed as ${(yearlyCents / 100).toFixed(0)}/year
        </p>
      )}
    </>
  );
}

// ─── PlanFeatureList ──────────────────────────────────────────────────────────

function PlanFeatureList({
  plan,
  items,
  billing,
  columns = 2,
  iconSize = 5,
}: {
  plan: PlanData;
  items: PlanItem[];
  billing: BillingInterval;
  columns?: 1 | 2;
  iconSize?: number;
}) {
  const iconClass = `w-${iconSize} h-${iconSize} flex-shrink-0 text-primary-400`;
  const quotaItems = items.filter((i) => i.type === "quota");
  const limitItems = items.filter((i) => i.type === "limit");
  const featureItems = items.filter((i) => i.type === "feature");
  return (
    <ul
      className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      aria-label="Plan features"
    >
      {quotaItems.map((item) => {
        const q = plan.quotas?.[item.slug]?.[billing] ?? plan.quotas?.[item.slug]?.monthly;
        if (!q?.included) return null;
        return (
          <li key={item._id} className="flex items-center gap-3 text-neutral-300">
            <Check className={iconClass} aria-hidden="true" />
            {q.included.toLocaleString()} {item.name.toLowerCase()}
          </li>
        );
      })}
      {limitItems.map((item) => {
        const val = plan.limits?.[item.slug];
        if (val === undefined) return null;
        return (
          <li key={item._id} className="flex items-center gap-3 text-neutral-300">
            <Check className={iconClass} aria-hidden="true" />
            {val.toLocaleString()} {item.name.toLowerCase()}
          </li>
        );
      })}
      {featureItems.map((item) => {
        if (!plan.features?.[item.slug]) return null;
        return (
          <li key={item._id} className="flex items-center gap-3 text-neutral-300">
            <Check className={iconClass} aria-hidden="true" />
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

// ─── Comparison modal ────────────────────────────────────────────────────────

function CompareModal({
  plans,
  items,
  billing,
  onClose,
}: {
  plans: unknown[];
  items: unknown[];
  billing: "monthly" | "quarterly" | "yearly";
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const sortedPlans = [...plans].map(asPlanData).sort((a, b) => {
    const aPrice = a.pricingVariants?.[0]?.basePricing?.monthly ?? 0;
    const bPrice = b.pricingVariants?.[0]?.basePricing?.monthly ?? 0;
    return aPrice - bPrice;
  });

  const popularIdx = Math.floor(sortedPlans.length / 2);
  const allItems = items.map(asPlanItem);
  const featureItems = allItems
    .filter((i) => i.type === "feature")
    .sort((a, b) => {
      const aCount = sortedPlans.filter((p) => p.features?.[a.slug] === true).length;
      const bCount = sortedPlans.filter((p) => p.features?.[b.slug] === true).length;
      if (bCount !== aCount) return bCount - aCount;
      return a.name.localeCompare(b.name);
    });
  const limitItems = allItems.filter((i) => i.type === "limit");
  const quotaItems = allItems.filter((i) => i.type === "quota");
  const planCount = sortedPlans.length;

  const CYCLE_SUFFIX: Record<string, string> = { monthly: "mo", quarterly: "qtr", yearly: "yr" };

  function getPriceCents(plan: PlanData): number {
    return plan.pricingVariants?.[0]?.basePricing?.[billing] ?? 0;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-4xl max-h-[85vh] rounded-2xl bg-neutral-900 border border-neutral-700 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 px-5 py-4 border-b border-neutral-700">
          <h2 className="text-base font-semibold text-neutral-100">Feature Comparison</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable table */}
        <div className="flex-1 overflow-auto min-h-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ minWidth: 420 }}>
              {/* Sticky plan header */}
              <thead className="sticky top-0 z-10">
                <tr className="bg-neutral-900">
                  <th
                    style={{ minWidth: 180 }}
                    className="sticky left-0 z-20 w-[38%] border-b border-neutral-700 bg-neutral-900 py-3 text-left font-normal"
                  />
                  {sortedPlans.map((plan, i) => {
                    const isPopular = i === popularIdx;
                    const cents = getPriceCents(plan);
                    return (
                      <th
                        key={plan._id}
                        style={{ minWidth: 130 }}
                        className={`border-b border-neutral-700 py-3 pl-4 pr-3 text-left font-normal ${
                          isPopular ? "bg-primary-500/5" : ""
                        } ${i < planCount - 1 ? "border-r border-neutral-700" : ""}`}
                      >
                        <p
                          className={`text-sm font-bold ${isPopular ? "text-primary-400" : "text-neutral-100"}`}
                        >
                          {plan.name}
                        </p>
                        {cents > 0 && (
                          <p className="text-xs text-neutral-500">
                            ${(cents / 100).toFixed(0)}/{CYCLE_SUFFIX[billing]}
                          </p>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* Features */}
                {featureItems.length > 0 && (
                  <>
                    <SectionRow label="Features" planCount={planCount} />
                    {featureItems.map((item) => (
                      <tr key={item._id}>
                        <LabelCell label={item.name} description={item.description} />
                        {sortedPlans.map((plan, i) => (
                          <BoolCell
                            key={plan._id}
                            included={plan.features?.[item.slug] === true}
                            isPopular={i === popularIdx}
                            isLast={i === planCount - 1}
                          />
                        ))}
                      </tr>
                    ))}
                  </>
                )}

                {/* Limits */}
                {limitItems.length > 0 && (
                  <>
                    <SectionRow label="Limits" planCount={planCount} />
                    {limitItems.map((item) => (
                      <tr key={item._id}>
                        <LabelCell label={item.name} description={item.description} />
                        {sortedPlans.map((plan, i) => (
                          <ValueCell
                            key={plan._id}
                            value={
                              typeof plan.limits?.[item.slug] === "number"
                                ? plan.limits![item.slug].toLocaleString()
                                : null
                            }
                            isPopular={i === popularIdx}
                            isLast={i === planCount - 1}
                          />
                        ))}
                      </tr>
                    ))}
                  </>
                )}

                {/* Usage / quotas */}
                {quotaItems.length > 0 && (
                  <>
                    <SectionRow label="Usage" planCount={planCount} />
                    {quotaItems.map((item) => (
                      <tr key={item._id}>
                        <LabelCell label={item.name} description={item.description} />
                        {sortedPlans.map((plan, i) => {
                          const q =
                            plan.quotas?.[item.slug]?.[billing] ??
                            plan.quotas?.[item.slug]?.monthly;
                          return (
                            <ValueCell
                              key={plan._id}
                              value={q?.included !== undefined ? q.included.toLocaleString() : null}
                              isPopular={i === popularIdx}
                              isLast={i === planCount - 1}
                            />
                          );
                        })}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionRow({ label, planCount }: { label: string; planCount: number }) {
  return (
    <tr>
      <td className="sticky left-0 z-10 border-t border-neutral-700 bg-neutral-800/40 py-2 pl-3 pr-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
          {label}
        </span>
      </td>
      {Array.from({ length: planCount }).map((_, i) => (
        <td key={i} className="border-t border-neutral-700 bg-neutral-800/40" />
      ))}
    </tr>
  );
}

function LabelCell({ label, description }: { label: string; description?: string }) {
  return (
    <td className="sticky left-0 z-10 border-b border-neutral-700 bg-neutral-900 py-2.5 pl-3 pr-4 align-middle">
      <span className="text-sm text-neutral-200">{label}</span>
      {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
    </td>
  );
}

function BoolCell({
  included,
  isPopular,
  isLast,
}: {
  included: boolean;
  isPopular: boolean;
  isLast: boolean;
}) {
  return (
    <td
      className={`border-b border-neutral-700 py-2.5 text-center align-middle ${
        isPopular ? "bg-primary-500/5" : ""
      } ${!isLast ? "border-r border-neutral-700" : ""}`}
    >
      {included ? (
        <Check className="mx-auto w-4 h-4 text-primary-400" aria-hidden="true" />
      ) : (
        <Minus className="mx-auto w-4 h-4 text-neutral-600" aria-hidden="true" />
      )}
    </td>
  );
}

function ValueCell({
  value,
  isPopular,
  isLast,
}: {
  value: string | null;
  isPopular: boolean;
  isLast: boolean;
}) {
  return (
    <td
      className={`border-b border-neutral-700 py-2.5 text-center align-middle ${
        isPopular ? "bg-primary-500/5" : ""
      } ${!isLast ? "border-r border-neutral-700" : ""}`}
    >
      {value !== null ? (
        <span className="text-sm font-medium tabular-nums text-neutral-100">{value}</span>
      ) : (
        <Minus className="mx-auto w-4 h-4 text-neutral-600" aria-hidden="true" />
      )}
    </td>
  );
}

// ─── Wrapper that fires onReady after first paint ────────────────────────────

function PricingContent({ children, onReady }: { children: React.ReactNode; onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return <>{children}</>;
}

// ─── Main component ──────────────────────────────────────────────────────────

interface PricingProps {
  selfHostOnly?: boolean;
}

export default function Pricing({ selfHostOnly = false }: PricingProps) {
  const providerReady = useBuildbaseReady();
  const [canRender, setCanRender] = useState(false);
  const [pricingLoaded, setPricingLoaded] = useState(false);
  const [billing, setBilling] = useState<BillingInterval>("monthly");
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (providerReady) setCanRender(true);
  }, [providerReady]);

  const handlePricingReady = useCallback(() => setPricingLoaded(true), []);
  const closeCompare = useCallback(() => setCompareOpen(false), []);

  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className={selfHostOnly ? "max-w-3xl mx-auto" : "max-w-6xl mx-auto"}>
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            {selfHostOnly ? "Self-Hosting Pricing" : "Simple, Transparent Pricing"}
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {selfHostOnly
              ? "One flat price. Every feature included. No per-agent fees."
              : "Pick the plan that fits your team. All plans include the full product — no hidden feature gates."}
          </p>
        </ScrollReveal>

        {/* Skeleton — visible until API data arrives */}
        {!pricingLoaded && (selfHostOnly ? <PricingSingleSkeleton /> : <PricingGridSkeleton />)}

        {canRender && (
          <PricingPage slug={PLAN_GROUP_SLUG} redirectBaseUrl={APP_URL} loadingFallback={null}>
            {({ loading, error, items, plans, selectPlan }) => {
              if (loading || (!plans?.length && !error)) return null;

              if (error || !plans?.length) {
                return (
                  <PricingContent onReady={handlePricingReady}>
                    <p className="text-center py-16 text-neutral-500">
                      {error ?? "No plans available right now."}
                    </p>
                  </PricingContent>
                );
              }

              const allItems = (items ?? []).map(asPlanItem);
              const allPlanData = plans.map(asPlanData);
              const shPlan = allPlanData.find((p) => p.name === SELF_HOST_PLAN_NAME) ?? null;
              const cloudPlanRaws = plans.filter((r) => asPlanData(r).name !== SELF_HOST_PLAN_NAME);

              // Billing toggle savings — use first cloud plan, or first plan if no cloud plans
              const refPlan = cloudPlanRaws.length ? asPlanData(cloudPlanRaws[0]) : allPlanData[0];
              const refVariant = refPlan.pricingVariants?.[0];
              const quarterlySavings = calcSavings(
                refVariant?.basePricing?.monthly ?? 0,
                refVariant?.basePricing?.quarterly ?? 0,
                3
              );
              const yearlySavings = calcSavings(
                refVariant?.basePricing?.monthly ?? 0,
                refVariant?.basePricing?.yearly ?? 0,
                12
              );

              // ── Self-host only mode (used on /self-hosting page) ─────────────
              if (selfHostOnly) {
                if (!shPlan) {
                  return (
                    <PricingContent onReady={handlePricingReady}>
                      <p className="text-center py-16 text-neutral-500">
                        Plan unavailable right now.
                      </p>
                    </PricingContent>
                  );
                }

                const variant = shPlan.pricingVariants?.[0];
                const currency = variant?.currency ?? "usd";
                const monthlyCents = variant?.basePricing?.monthly ?? 0;
                const quarterlyCents = variant?.basePricing?.quarterly ?? 0;
                const yearlyCents = variant?.basePricing?.yearly ?? 0;
                const activeCents = getActiveCents(
                  billing,
                  monthlyCents,
                  quarterlyCents,
                  yearlyCents
                );

                return (
                  <PricingContent onReady={handlePricingReady}>
                    <>
                      <BillingToggle
                        billing={billing}
                        onChange={setBilling}
                        quarterlySavings={quarterlySavings}
                        yearlySavings={yearlySavings}
                        staggerIndex={0}
                      />
                      <ScrollReveal
                        staggerIndex={1}
                        className="relative p-8 md:p-12 rounded-2xl bg-primary-500/10 border-2 border-primary-500"
                      >
                        <div className="text-center mb-8">
                          <PriceDisplay
                            billing={billing}
                            monthlyCents={monthlyCents}
                            quarterlyCents={quarterlyCents}
                            yearlyCents={yearlyCents}
                          />
                          <p className="text-neutral-300 text-lg">
                            Full AgentCenter on your own infrastructure
                          </p>
                        </div>
                        <div className="mb-10">
                          <PlanFeatureList
                            plan={shPlan}
                            items={allItems}
                            billing={billing}
                            columns={2}
                            iconSize={5}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => {
                              trackBeginCheckout(
                                "AgentCenter Self-Hosting License",
                                billing,
                                activeCents / 100
                              );
                              selectPlan(shPlan._id, billing, currency);
                            }}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
                          >
                            Get Your License
                            <ArrowRight
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                              aria-hidden="true"
                            />
                          </button>
                          <p className="text-neutral-500 text-sm mt-4">
                            Cancel anytime. You receive your activation key within 24 hours.
                          </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-primary-500/20">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                            Also required
                          </p>
                          <div className="flex items-start gap-3">
                            <span className="text-base mt-0.5" role="img" aria-label="Key">
                              🔑
                            </span>
                            <div>
                              <p className="text-sm text-neutral-300 font-medium mb-1">
                                Your own AI provider subscription
                              </p>
                              <p className="text-sm text-neutral-500">
                                AgentCenter is the dashboard — the AI is the engine. Works with any
                                OpenClaw-compatible provider: Claude (Pro/Max), OpenAI GPT-4, Google
                                Gemini, and more. With self-hosting, your data never leaves your
                                machine.
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    </>
                  </PricingContent>
                );
              }

              // ── Cloud + self-host grid (main /pricing page) ──────────────────
              const featureItems = allItems
                .filter((i) => i.type === "feature")
                .filter((i) => cloudPlanRaws.some((r) => asPlanData(r).features?.[i.slug] === true))
                .sort((a, b) => {
                  const aCount = cloudPlanRaws.filter(
                    (r) => asPlanData(r).features?.[a.slug] === true
                  ).length;
                  const bCount = cloudPlanRaws.filter(
                    (r) => asPlanData(r).features?.[b.slug] === true
                  ).length;
                  if (bCount !== aCount) return bCount - aCount;
                  return a.name.localeCompare(b.name);
                });
              const quotaItems = allItems
                .filter((i) => i.type === "quota")
                .filter((i) =>
                  cloudPlanRaws.some((r) => {
                    const q = asPlanData(r).quotas?.[i.slug];
                    return q && Object.values(q).some((v) => v.included !== undefined);
                  })
                );
              const limitItems = allItems
                .filter((i) => i.type === "limit")
                .filter((i) =>
                  cloudPlanRaws.some((r) => asPlanData(r).limits?.[i.slug] !== undefined)
                );

              return (
                <PricingContent onReady={handlePricingReady}>
                  <>
                    <BillingToggle
                      billing={billing}
                      onChange={setBilling}
                      quarterlySavings={quarterlySavings}
                      yearlySavings={yearlySavings}
                      staggerIndex={0}
                      className="flex items-center justify-center gap-3 mb-12"
                    />

                    {/* Plan cards */}
                    <div className="overflow-x-auto -mx-4 px-4 pt-5 mb-8">
                      <div
                        className="grid gap-6"
                        style={{
                          gridTemplateColumns: `repeat(${cloudPlanRaws.length}, minmax(280px, 1fr))`,
                        }}
                      >
                        {cloudPlanRaws.map((raw, idx) => {
                          const plan = asPlanData(raw);
                          const variant = plan.pricingVariants?.[0];
                          const currency = variant?.currency ?? "usd";
                          const monthlyCents = variant?.basePricing?.monthly ?? 0;
                          const quarterlyCents = variant?.basePricing?.quarterly ?? 0;
                          const yearlyCents = variant?.basePricing?.yearly ?? 0;
                          const activeCents = getActiveCents(
                            billing,
                            monthlyCents,
                            quarterlyCents,
                            yearlyCents
                          );
                          const perMonthDollars = getPerMonthDollars(
                            billing,
                            monthlyCents,
                            quarterlyCents,
                            yearlyCents
                          );
                          const isApprox =
                            (billing === "quarterly" && quarterlyCents % 300 !== 0) ||
                            (billing === "yearly" && yearlyCents % 1200 !== 0);
                          const priceDisplay = Number.isInteger(perMonthDollars)
                            ? String(perMonthDollars)
                            : perMonthDollars.toFixed(2);
                          const isRecommended =
                            cloudPlanRaws.length > 1 &&
                            idx === Math.floor((cloudPlanRaws.length - 1) / 2);

                          return (
                            <ScrollReveal
                              key={plan._id}
                              staggerIndex={idx + 1}
                              className={`relative flex flex-col p-8 rounded-2xl transition-colors ${
                                isRecommended
                                  ? "bg-primary-500/10 border-2 border-primary-500"
                                  : "bg-neutral-800/50 border border-neutral-700"
                              }`}
                            >
                              {isRecommended && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                  <span className="px-3 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full whitespace-nowrap">
                                    Most Popular
                                  </span>
                                </div>
                              )}

                              <div className="mb-6">
                                <h3 className="text-lg font-semibold text-neutral-100">
                                  {plan.name}
                                </h3>
                                {plan.description && (
                                  <p className="text-sm text-neutral-400 mt-1">
                                    {plan.description}
                                  </p>
                                )}
                              </div>

                              <div className="mb-6">
                                <div className="flex items-baseline gap-0.5">
                                  {isApprox && (
                                    <span
                                      className="text-xl text-neutral-500 mr-0.5"
                                      title="Approximate monthly equivalent"
                                    >
                                      ~
                                    </span>
                                  )}
                                  <span className="text-4xl font-bold text-neutral-100">
                                    ${priceDisplay}
                                  </span>
                                  <span className="text-neutral-400">/mo</span>
                                </div>
                                {billing === "quarterly" && quarterlyCents > 0 && (
                                  <p className="text-xs text-neutral-500 mt-1">
                                    Billed as ${(quarterlyCents / 100).toFixed(0)}/quarter
                                  </p>
                                )}
                                {billing === "yearly" && yearlyCents > 0 && (
                                  <p className="text-xs text-neutral-500 mt-1">
                                    Billed as ${(yearlyCents / 100).toFixed(0)}/year
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => {
                                  trackBeginCheckout(
                                    `AgentCenter ${plan.name}`,
                                    billing,
                                    activeCents / 100
                                  );
                                  Promise.resolve(selectPlan(plan._id, billing, currency)).catch(
                                    (err) => console.error("selectPlan failed:", err)
                                  );
                                }}
                                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors mb-2 ${
                                  isRecommended
                                    ? "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                                    : "bg-neutral-700 hover:bg-neutral-600 text-neutral-100"
                                }`}
                              >
                                {plan.trial?.enabled
                                  ? `Start ${plan.trial.durationDays}-Day Free Trial`
                                  : "Get Started"}
                                <ArrowRight size={16} aria-hidden="true" />
                              </button>

                              {plan.trial?.enabled && (
                                <p className="text-xs text-center text-success-400 mb-2 font-medium">
                                  {plan.trial.durationDays} days free — no charge until trial ends
                                </p>
                              )}
                              <p className="text-xs text-center text-neutral-500 mb-6">
                                Cancel anytime. Powered by Stripe.
                              </p>

                              <ul
                                className="space-y-3 flex-1"
                                aria-label={`${plan.name} plan features`}
                              >
                                {quotaItems.map((item) => {
                                  const q = plan.quotas?.[item.slug]?.[billing];
                                  if (!q?.included) return null;
                                  return (
                                    <li
                                      key={item._id}
                                      className="flex items-start gap-3 text-sm text-neutral-300"
                                    >
                                      <Check
                                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                                        aria-hidden="true"
                                      />
                                      {q.included.toLocaleString()} {item.name.toLowerCase()}
                                    </li>
                                  );
                                })}
                                {limitItems.map((item) => {
                                  const val = plan.limits?.[item.slug];
                                  if (val === undefined) return null;
                                  return (
                                    <li
                                      key={item._id}
                                      className="flex items-start gap-3 text-sm text-neutral-300"
                                    >
                                      <Check
                                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                                        aria-hidden="true"
                                      />
                                      {val.toLocaleString()} {item.name.toLowerCase()}
                                    </li>
                                  );
                                })}
                                {featureItems.map((item) => {
                                  const enabled = plan.features?.[item.slug] ?? false;
                                  return (
                                    <li
                                      key={item._id}
                                      className={`flex items-start gap-3 text-sm ${enabled ? "text-neutral-300" : "text-neutral-600"}`}
                                    >
                                      {enabled ? (
                                        <Check
                                          className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <X
                                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      {item.name}
                                    </li>
                                  );
                                })}
                              </ul>
                            </ScrollReveal>
                          );
                        })}
                      </div>
                    </div>

                    {/* Compare all features button */}
                    <ScrollReveal
                      className="flex justify-center mb-4"
                      staggerIndex={cloudPlanRaws.length + 2}
                    >
                      <button
                        type="button"
                        onClick={() => setCompareOpen(true)}
                        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-200 underline-offset-4 hover:underline transition-colors border border-neutral-700 hover:border-neutral-500 px-4 py-2 rounded-lg"
                      >
                        <LayoutList size={16} aria-hidden="true" />
                        Compare all features
                      </button>
                    </ScrollReveal>

                    {compareOpen && (
                      <CompareModal
                        plans={cloudPlanRaws}
                        items={items ?? []}
                        billing={billing}
                        onClose={closeCompare}
                      />
                    )}
                  </>
                </PricingContent>
              );
            }}
          </PricingPage>
        )}

        {/* AI provider requirement note — cloud page only */}
        {!selfHostOnly && (
          <ScrollReveal staggerIndex={5} className="mb-6">
            <div className="p-5 rounded-xl bg-neutral-800/30 border border-neutral-700/50">
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5" role="img" aria-label="Key">
                  🔑
                </span>
                <div>
                  <p className="text-sm text-neutral-300 font-medium mb-1">
                    Your own AI provider subscription is also required
                  </p>
                  <p className="text-sm text-neutral-500">
                    AgentCenter is the dashboard — the AI is the engine. Works with any
                    OpenClaw-compatible provider: Claude (Pro/Max), OpenAI GPT-4, Google Gemini, and
                    more. You bring your own API key, your data stays on Hetzner Cloud, and your AI
                    costs stay predictable.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Self-hosting teaser */}
        {!selfHostOnly && (
          <ScrollReveal staggerIndex={6}>
            <Link
              href="/self-hosting"
              className="group block p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-neutral-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex-shrink-0 mt-0.5">
                    <Monitor size={20} className="text-primary-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-100 mb-1">
                      Need data sovereignty? Run it on your own server.
                    </p>
                    <p className="text-xs text-neutral-400 mb-3">
                      Same features, your infrastructure — from ${SELFHOSTING_PRICING.monthly}/month
                      <span className="ml-2 text-success-400">
                        (save {SELFHOSTING_PRICING.yearlyDiscount}% yearly)
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {[
                        "Data never leaves your machine",
                        "Works in private networks",
                        "Docker image + docker-compose",
                      ].map((point) => (
                        <span
                          key={point}
                          className="flex items-center gap-1.5 text-xs text-neutral-500"
                        >
                          <Check
                            className="w-3 h-3 text-neutral-600 flex-shrink-0"
                            aria-hidden="true"
                          />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
