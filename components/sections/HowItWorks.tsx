"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Zap, ListTodo, Activity, ArrowRight } from "@/components/icons";
import { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  Zap,
  ListTodo,
  Activity,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-neutral-900/50">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            How AgentCenter Works
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Three steps. That&apos;s it. Connect your agents, give them work, and watch it happen.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary-500/40 via-primary-500/60 to-primary-500/40" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <ScrollReveal
                  key={step.number}
                  staggerIndex={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Connector arrow (mobile) */}
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary-500/60">
                      <ArrowRight className="w-5 h-5 rotate-90" aria-hidden="true" />
                    </div>
                  )}

                  {/* Number badge + icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center transition-colors hover:border-primary-500/50">
                      <Icon className="w-8 h-8 text-primary-500" aria-hidden="true" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-glow-sm">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">{step.title}</h3>
                  <p className="text-neutral-400 max-w-xs">{step.description}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Flow diagram */}
        <ScrollReveal className="mt-16">
          <div className="max-w-3xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <Zap className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-200">Your Agents</span>
              </div>

              <ArrowRight
                className="w-5 h-5 text-primary-500/60 rotate-90 md:rotate-0 shrink-0"
                aria-hidden="true"
              />

              {/* Step 2 */}
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl gradient-bg shadow-glow-sm">
                <span className="text-sm font-bold text-white">AgentCenter</span>
              </div>

              <ArrowRight
                className="w-5 h-5 text-primary-500/60 rotate-90 md:rotate-0 shrink-0"
                aria-hidden="true"
              />

              {/* Step 3 */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <Activity className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-200">Tasks Done</span>
              </div>
            </div>

            <p className="text-center text-xs text-neutral-500 mt-4">
              Agents connect → AgentCenter orchestrates → Work gets done
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
