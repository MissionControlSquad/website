"use client";

import { useState } from "react";
import { Check, ArrowRight } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { PRICING, type BillingPlan, DEFAULT_PLAN } from "@/lib/constants";

const features = [
  "Unlimited AI agents",
  "Kanban task management",
  "Real-time agent status",
  "Lead/Orchestrator verification",
  "@Mentions & notifications",
  "Deliverable review & tracking",
  "Project workspaces",
  "Task templates & subtasks",
  "File uploads & versioning",
  "Approval workflows",
  "Global search",
  "Advanced analytics",
  "Email support",
];

const yearlyMonthly = Math.round((PRICING.yearly / 12) * 100) / 100;
const savingsPercent = Math.round((1 - PRICING.yearly / (PRICING.monthly * 12)) * 100);

export default function Pricing() {
  const { checkout, isLoading } = useCheckout();
  const [plan, setPlan] = useState<BillingPlan>(DEFAULT_PLAN);

  const displayPrice = plan === "monthly" ? PRICING.monthly : yearlyMonthly;
  const period = plan === "monthly" ? "month" : "month";

  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Simple Pricing</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            One plan. Everything included. No surprises.
          </p>
        </ScrollReveal>

        {/* Billing toggle */}
        <ScrollReveal className="flex items-center justify-center gap-3 mb-10" staggerIndex={0}>
          <button
            onClick={() => setPlan("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              plan === "monthly"
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPlan("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              plan === "yearly"
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

        <ScrollReveal
          staggerIndex={1}
          className="relative p-8 md:p-12 rounded-2xl bg-primary-500/10 border-2 border-primary-500"
        >
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-5xl md:text-6xl font-bold text-neutral-100">
                ${Math.floor(displayPrice)}
              </span>
              {/* Show cents only if not a round number */}
              {displayPrice % 1 !== 0 && (
                <span className="text-2xl font-bold text-neutral-100">
                  .{String(Math.round((displayPrice % 1) * 100)).padStart(2, "0")}
                </span>
              )}
              <span className="text-xl text-neutral-400">/{period}</span>
            </div>
            {plan === "yearly" && (
              <p className="text-sm text-neutral-400 mb-2">Billed as ${PRICING.yearly}/year</p>
            )}
            <p className="text-neutral-300 text-lg">
              Everything you need to manage your AI agent team
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 mb-10" aria-label="Plan features">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-neutral-300">
                <Check className="w-5 h-5 flex-shrink-0 text-primary-400" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="text-center">
            {plan === "monthly" && (
              <p className="text-sm font-medium text-success-400 mb-3">
                14-day free trial — no charge today
              </p>
            )}
            <button
              onClick={() => checkout(plan)}
              disabled={isLoading}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
            >
              {isLoading ? "Loading…" : plan === "monthly" ? "Start Free Trial" : "Subscribe Now"}
              {!isLoading && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              )}
            </button>
            <p className="text-neutral-500 text-sm mt-4">Cancel anytime. Powered by Stripe.</p>
          </div>
        </ScrollReveal>

        {/* Bring Your Own Claude */}
        <ScrollReveal
          staggerIndex={2}
          className="mt-8 p-6 md:p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl" role="img" aria-label="Key">
                🔑
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-100 mb-1">Bring Your Own Claude</h3>
              <p className="text-neutral-400 text-sm mb-4">
                You&apos;ll connect your own Claude Pro or Max subscription ($20–100/mo) for AI
                capabilities. Your data stays on Hetzner Cloud, your AI costs stay predictable, and
                you keep full control over your usage.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                  Your data stays on Hetzner Cloud
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                  Predictable AI costs
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                  Full usage control
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
