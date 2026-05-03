"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CAL_LINK, PLANS } from "@/lib/constants";
import { trackCTA } from "@/lib/analytics";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-primary-950/40 to-neutral-950" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] animate-cta-glow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Launch your agent army</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-6">
            Ready to Take Control of <span className="gradient-text">Your AI Team?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Get started today and see why teams trust AgentCenter to coordinate their AI agents.
            Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              onClick={() => trackCTA("bottom", "get_started")}
              className="group relative inline-flex flex-col items-center px-10 py-4 gradient-bg rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="flex items-center gap-2 text-white font-semibold text-lg">
                Get Started
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </span>
              <span className="text-xs text-primary-200/70 mt-1">
                {`7-day free trial · from $${PLANS.starter.monthly}/mo`}
              </span>
            </Link>

            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("bottom", "book_demo")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 font-semibold rounded-xl transition-all duration-200 text-lg"
            >
              Book a Demo
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
