"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SOCIAL_PROOF } from "@/lib/constants";

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-label="Built for AI Builders"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/10 blur-[100px] rounded-full" />
      </div>

      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
            Trusted by builders
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Built for AI Builders
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Developers and teams running autonomous AI workflows rely on AgentCenter every day.
          </p>
        </ScrollReveal>

        {/* Metrics row */}
        <ScrollReveal className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SOCIAL_PROOF.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="text-center p-6 rounded-xl border border-neutral-800 bg-neutral-900/50"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-neutral-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SOCIAL_PROOF.testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.handle} staggerIndex={index}>
              <Card className="h-full flex flex-col justify-between">
                {/* Quote */}
                <div>
                  {/* Star rating */}
                  <div className="flex items-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-neutral-300 text-sm leading-relaxed mb-5">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-700">
                  <div className="w-9 h-9 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-sm font-bold text-primary-400">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-100">{testimonial.name}</div>
                    <div className="text-xs text-neutral-500">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom trust strip */}
        <ScrollReveal>
          <div className="text-center py-6 px-8 rounded-2xl border border-neutral-800 bg-neutral-900/40">
            <p className="text-neutral-400 text-sm md:text-base">
              Trusted by builders running autonomous workflows across{" "}
              <span className="text-neutral-200 font-medium">research, development, and ops</span>{" "}
              — all from one dashboard.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
