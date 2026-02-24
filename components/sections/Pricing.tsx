"use client";

import { Check, ArrowRight } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useStripeLink } from "@/lib/hooks/useStripeLink";
import { PRICING } from "@/lib/constants";

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

export default function Pricing() {
  const stripeLink = useStripeLink();

  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Simple Pricing</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            One plan. Everything included. No surprises.
          </p>
        </ScrollReveal>

        <ScrollReveal
          staggerIndex={1}
          className="relative p-8 md:p-12 rounded-2xl bg-primary-500/10 border-2 border-primary-500"
        >
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-5xl md:text-6xl font-bold text-neutral-100">
                ${PRICING.monthly}
              </span>
              <span className="text-xl text-neutral-400">/{PRICING.billingPeriod}</span>
            </div>
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
            <a
              href={stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
            >
              Subscribe Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
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
