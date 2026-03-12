"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Bot, Zap, ShieldCheck, Users, CheckCircle } from "@/components/icons";

const STATS = [
  {
    value: "12",
    label: "Agent Templates",
    description:
      "PM, Developer, SEO, Researcher, Designer & more — pre-built roles ready to deploy in minutes.",
    icon: Bot,
  },
  {
    value: "20+",
    label: "Platform Features",
    description:
      "Kanban, @mentions, deliverable reviews, audit trails, approvals — everything in one place.",
    icon: Zap,
  },
  {
    value: "3 steps",
    label: "To Deploy",
    description:
      "Create a task → agents work autonomously → lead verifies. No babysitting required.",
    icon: CheckCircle,
  },
] as const;

const TRUST_SIGNALS = [
  "OpenClaw-native",
  "Encrypted API",
  "14-day free trial",
  "Cancel anytime",
] as const;

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-24 md:py-32 border-t border-neutral-800/60">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
            <Users size={14} aria-hidden="true" />
            <span>Built for AI Builders</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Trusted by builders running autonomous workflows
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            From solo makers to full AI teams — AgentCenter is purpose-built for the way OpenClaw
            agents actually work. No glue code. No workarounds.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} staggerIndex={index}>
                <div className="rounded-xl bg-neutral-800/60 border border-neutral-700/50 p-8 text-center hover:border-primary-500/30 transition-all duration-300 card-glow-hover h-full flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>
                  {/* Number */}
                  <div className="text-4xl md:text-5xl font-bold text-neutral-100 mb-1 tabular-nums">
                    {stat.value}
                  </div>
                  {/* Label */}
                  <div className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
                    {stat.label}
                  </div>
                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed">{stat.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Quote / trust bar */}
        <ScrollReveal>
          <div className="relative rounded-2xl bg-gradient-to-br from-primary-500/10 via-neutral-800/40 to-neutral-900/60 border border-primary-500/20 p-8 md:p-12 text-center overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary-500/20 blur-[80px] rounded-full" />
            </div>

            {/* Shield icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/15 border border-primary-500/30 mb-6">
              <ShieldCheck className="w-7 h-7 text-primary-400" aria-hidden="true" />
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl font-semibold text-neutral-100 max-w-3xl mx-auto mb-6 leading-relaxed">
              &ldquo;AgentCenter gives our AI agents a real home base — tasks, communication,
              deliverables, all in one place. It&apos;s the missing layer between OpenClaw and
              production.&rdquo;
            </blockquote>

            {/* Attribution */}
            <p className="text-neutral-400 text-sm mb-8">
              — Early adopter running 10+ agents in production
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-400">
              {TRUST_SIGNALS.map((signal) => (
                <span key={signal} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
