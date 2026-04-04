"use client";

import { useState } from "react";
import {
  Check,
  ArrowRight,
  Cloud,
  ShieldCheck,
  BookOpen,
  Monitor,
  Shield,
  Zap,
} from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSelfHostCheckout, type SelfHostPlan } from "@/lib/hooks/useSelfHostCheckout";
import { SELFHOSTING_PRICING } from "@/lib/constants";
import { trackBeginCheckout } from "@/lib/analytics";

const yearlyMonthly = Math.round((SELFHOSTING_PRICING.yearly / 12) * 100) / 100;

const features = [
  "Full AgentCenter dashboard",
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
  "All future updates included",
];

const whatsIncluded = [
  {
    icon: Cloud,
    title: "Docker Image",
    description:
      "Pre-built, production-ready Docker image with everything bundled. Pull it and run — no build step.",
  },
  {
    icon: ShieldCheck,
    title: "Unique Activation Key",
    description:
      "Each license comes with a unique activation key. Enter it once on the app's activation page after first launch — no config files, no environment variables.",
  },
  {
    icon: BookOpen,
    title: "Docker Compose File",
    description:
      "Ready-to-use docker-compose.yml for quick deployment. Bring your own volumes and environment.",
  },
  {
    icon: Monitor,
    title: "Run Anywhere",
    description:
      "Your VM, your VPS, AWS, GCP, Hetzner, DigitalOcean — if it runs Docker, it runs AgentCenter.",
  },
  {
    icon: Shield,
    title: "Your Data, Your Control",
    description:
      "All data stays on your infrastructure. Nothing leaves your machine except activation key validation.",
  },
  {
    icon: Zap,
    title: "All Future Updates",
    description:
      "Active subscriptions get new Docker image releases automatically. Pull, restart, done.",
  },
];

const steps = [
  {
    number: "1",
    title: "Purchase a License",
    description:
      "Subscribe monthly or yearly. You'll get an activation key by email within 24 hours.",
  },
  {
    number: "2",
    title: "Pull the Docker Image",
    description:
      "We'll send you the image tag and docker-compose.yml. Pull the image on your machine.",
  },
  {
    number: "3",
    title: "Add Your Activation Key",
    description:
      "Run docker-compose up, open the app in your browser, and enter your activation key when prompted. That's it.",
  },
];

export default function SelfHostingPricingSection() {
  const { checkout, isLoading } = useSelfHostCheckout();
  const [plan, setPlan] = useState<SelfHostPlan>("monthly");

  const displayPrice = plan === "monthly" ? SELFHOSTING_PRICING.monthly : yearlyMonthly;

  return (
    <>
      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
              Self-Hosting Pricing
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              One flat price. Every feature included. No per-agent fees.
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
              <span className="ml-2 text-xs bg-success-500/20 text-success-400 px-2 py-0.5 rounded-full">
                Save {SELFHOSTING_PRICING.yearlyDiscount}%
              </span>
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
                {displayPrice % 1 !== 0 && (
                  <span className="text-2xl font-bold text-neutral-100">
                    .{String(Math.round((displayPrice % 1) * 100)).padStart(2, "0")}
                  </span>
                )}
                <span className="text-xl text-neutral-400">/month</span>
              </div>
              {plan === "yearly" && (
                <p className="text-sm text-neutral-400 mb-2">
                  Billed as ${SELFHOSTING_PRICING.yearly}/year
                </p>
              )}
              <p className="text-neutral-300 text-lg">
                Full AgentCenter on your own infrastructure
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
              <button
                onClick={() => {
                  trackBeginCheckout(
                    "AgentCenter Self-Hosting License",
                    plan,
                    plan === "monthly" ? SELFHOSTING_PRICING.monthly : SELFHOSTING_PRICING.yearly
                  );
                  checkout(plan);
                }}
                disabled={isLoading}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
              >
                {isLoading ? "Loading…" : "Get Your License"}
                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </button>
              <p className="text-neutral-500 text-sm mt-4">
                Cancel anytime. You receive your activation key within 24 hours.
              </p>
            </div>

            {/* AI provider requirement note */}
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
                    OpenClaw-compatible provider: Claude (Pro/Max), OpenAI GPT-4, Google Gemini, and
                    more. With self-hosting, your data never leaves your machine.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-100 mb-4">
              What&apos;s Included in Your Self-Hosting License
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Every license ships with everything you need to run AgentCenter on your own server. No
              extra fees, no missing pieces.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatsIncluded.map((item, idx) => (
              <ScrollReveal
                key={idx}
                staggerIndex={idx}
                className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary-500/10 border border-primary-500/20 mb-4">
                  <item.icon size={22} className="text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-neutral-100 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-to-deploy" className="py-20 px-4 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-100 mb-4">
              How to Deploy AgentCenter with Docker
            </h2>
            <p className="text-neutral-400">From purchase to running agents — three steps.</p>
          </ScrollReveal>
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <ScrollReveal
                key={idx}
                staggerIndex={idx}
                className="flex items-start gap-5 p-6 rounded-xl bg-neutral-800/40 border border-neutral-700"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-bold text-lg">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
