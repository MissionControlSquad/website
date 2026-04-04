"use client";

import { ArrowRight, Zap } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CAL_LINK } from "@/lib/constants";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { trackCTA } from "@/lib/analytics";

export default function MidPageCTA() {
  const { checkout, isLoading } = useCheckout();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/50 via-neutral-900 to-primary-950/50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/10 blur-[100px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-500/15 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span>Cancel anytime — no lock-in</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
              Build Your AI Agent Team <span className="gradient-text">Today</span>
            </h2>

            <p className="text-lg text-neutral-400 mb-8 max-w-xl mx-auto">
              Stop juggling agents across terminals. Start coordinating them from one dashboard.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  trackCTA("mid_page", "start_trial");
                  checkout({ tier: "pro" });
                }}
                disabled={isLoading}
                className="group inline-flex items-center gap-2 px-8 py-3.5 gradient-bg rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none text-white font-semibold text-base"
              >
                {isLoading ? "Loading…" : "Get Started"}
                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </button>

              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA("mid_page", "book_demo")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 font-semibold rounded-xl transition-all duration-200"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
