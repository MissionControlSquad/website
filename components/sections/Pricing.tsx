"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Monitor } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useCheckout } from "@/lib/hooks/useCheckout";
import {
  PLANS,
  PLAN_KEYS,
  SELFHOSTING_PRICING,
  type BillingPlan,
  type PlanKey,
  DEFAULT_PLAN,
} from "@/lib/constants";
import { trackBeginCheckout } from "@/lib/analytics";

const PLAN_FEATURES: Record<
  PlanKey,
  { recurringTasks: boolean; cloudVMs: boolean; support: string | null }
> = {
  starter: { recurringTasks: false, cloudVMs: false, support: null },
  pro: { recurringTasks: true, cloudVMs: false, support: "Email support" },
  scale: { recurringTasks: true, cloudVMs: true, support: "Priority support" },
};

export default function Pricing() {
  const { checkout, isLoading, loadingTier } = useCheckout();
  const [billing, setBilling] = useState<BillingPlan>(DEFAULT_PLAN);

  const savingsPercent = Math.round((1 - PLANS.pro.yearly / (PLANS.pro.monthly * 12)) * 100);

  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Pick the plan that fits your team. All plans include the full product — no hidden
            feature gates.
          </p>
        </ScrollReveal>

        {/* Billing toggle */}
        <ScrollReveal className="flex items-center justify-center gap-3 mb-12" staggerIndex={0}>
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billing === "monthly"
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billing === "yearly"
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Yearly
            {savingsPercent > 0 && (
              <span className="ml-2 text-xs bg-success-500/20 text-success-400 px-2 py-0.5 rounded-full">
                Save {savingsPercent}%
              </span>
            )}
          </button>
        </ScrollReveal>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PLAN_KEYS.map((key, idx) => {
            const plan = PLANS[key];
            const features = PLAN_FEATURES[key];
            const price = billing === "monthly" ? plan.monthly : Math.round(plan.yearly / 12);
            const isRecommended = plan.recommended;
            const isThisLoading = isLoading && loadingTier === key;

            return (
              <ScrollReveal
                key={key}
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

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-100 mb-1">{plan.name}</h3>
                  <p className="text-sm text-neutral-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-neutral-100">${price}</span>
                    <span className="text-neutral-400">/mo</span>
                  </div>
                  {billing === "yearly" && (
                    <p className="text-xs text-neutral-500 mt-1">Billed as ${plan.yearly}/year</p>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    trackBeginCheckout(
                      `AgentCenter ${plan.name}`,
                      billing,
                      billing === "monthly" ? plan.monthly : plan.yearly
                    );
                    checkout({ tier: key, billing });
                  }}
                  disabled={isLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors mb-8 ${
                    isRecommended
                      ? "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                      : "bg-neutral-700 hover:bg-neutral-600 text-neutral-100"
                  } disabled:opacity-50`}
                >
                  {isThisLoading ? "Loading…" : "Get Started"}
                  {!isThisLoading && (
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <p className="text-xs text-center text-neutral-500 -mt-6 mb-6">
                  Cancel anytime. Powered by Stripe.
                </p>

                {/* Features */}
                <ul className="space-y-3 flex-1" aria-label={`${plan.name} plan features`}>
                  {/* Agent + project limits */}
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check
                      className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                      aria-hidden="true"
                    />
                    {plan.agents} AI agents
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check
                      className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                      aria-hidden="true"
                    />
                    {plan.projects} projects
                  </li>

                  {/* Core features — always included */}
                  {[
                    "Kanban task management",
                    "Real-time agent status",
                    "@Mentions & notifications",
                    "Deliverable review & tracking",
                    "Team channels & DMs",
                    "Advanced analytics",
                    "Approval workflows",
                    "Global search",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Check
                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}

                  {/* Plan-gated features */}
                  <li
                    className={`flex items-start gap-3 text-sm ${features.recurringTasks ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    {features.recurringTasks ? (
                      <Check
                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    )}
                    Recurring tasks
                  </li>
                  <li
                    className={`flex items-start gap-3 text-sm ${features.cloudVMs ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    {features.cloudVMs ? (
                      <Check
                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    )}
                    Cloud VM provisioning
                  </li>
                  <li
                    className={`flex items-start gap-3 text-sm ${features.support ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    {features.support ? (
                      <Check
                        className="w-4 h-4 flex-shrink-0 text-primary-400 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    )}
                    {features.support ?? "No dedicated support"}
                  </li>
                </ul>
              </ScrollReveal>
            );
          })}
        </div>

        {/* AI provider requirement note */}
        <ScrollReveal staggerIndex={4} className="mb-6">
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

        {/* Self-hosting teaser */}
        <ScrollReveal staggerIndex={5}>
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
      </div>
    </section>
  );
}
