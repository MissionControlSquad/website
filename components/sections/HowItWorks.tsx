"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { PlusCircle, Bot, CheckCircle } from "@/components/icons";
import { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  PlusCircle,
  Bot,
  CheckCircle,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-neutral-900/50">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">How It Works</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Get started in minutes. Create tasks, let agents work, review the results.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <ScrollReveal
                  key={step.number}
                  staggerIndex={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Connector line (mobile) */}
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="md:hidden absolute top-24 left-1/2 w-px h-16 bg-gradient-to-b from-neutral-700 to-transparent -translate-x-1/2" />
                  )}

                  {/* Number badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
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
      </Container>
    </section>
  );
}
