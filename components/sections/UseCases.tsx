"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { USE_CASES } from "@/lib/constants";
import { Search, Bot, Zap, Activity, ArrowRight } from "@/components/icons";
import { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  Search,
  Bot,
  Zap,
  Activity,
};

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 md:py-32">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            What Can You Build With AgentCenter?
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            From research to deployment, AgentCenter powers every kind of autonomous workflow.
          </p>
        </ScrollReveal>

        {/* Use case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((useCase, index) => {
            const Icon = iconMap[useCase.icon];
            return (
              <ScrollReveal key={useCase.title} staggerIndex={index}>
                <Link href={useCase.href} className="block h-full group">
                  <Card hover className="h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-neutral-100 mb-2">{useCase.title}</h3>
                    <p className="text-sm text-neutral-400 flex-1">{useCase.description}</p>

                    {/* Link indicator */}
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
