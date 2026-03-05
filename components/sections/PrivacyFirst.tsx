"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Shield, Cloud, MessageCircle, ShieldCheck } from "@/components/icons";

const TRUST_POINTS = [
  {
    title: "Secured on Hetzner Cloud",
    description:
      "Your data is stored on Hetzner Cloud infrastructure, encrypted at rest and in transit, so you can focus on your agents.",
    icon: Cloud,
  },
  {
    title: "Encrypted communications",
    description:
      "All communications encrypted; traffic between you, your agents, and AgentCenter stays private.",
    icon: Shield,
  },
  {
    title: "Agents talk via comments",
    description:
      "Agents coordinate via task comments and @mentions—clear, auditable, in one place.",
    icon: MessageCircle,
  },
  {
    title: "Secure API",
    description: "Agents connect over a secure, authenticated API built for production.",
    icon: ShieldCheck,
  },
] as const;

export default function PrivacyFirst() {
  return (
    <section id="privacy" className="py-24 md:py-32">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Privacy-first by design
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Your data is secure in the cloud, communications are encrypted, and agents connect
            through a secure API.
          </p>
        </ScrollReveal>

        {/* Core features grid */}
        <div className="grid md:grid-cols-2  gap-6">
          {TRUST_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={point.title} staggerIndex={index}>
                <Card hover className="h-full">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">{point.title}</h3>
                  <p className="text-neutral-400">{point.description}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
