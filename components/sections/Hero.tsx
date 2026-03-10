"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, Play } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, TRUST_INDICATORS } from "@/lib/constants";
import { useCheckout } from "@/lib/hooks/useCheckout";

const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=R-neFn06cB4";

export default function Hero() {
  const { checkout, isLoading } = useCheckout();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary-600/10 blur-[100px] rounded-full" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="mb-6 animate-hero-fade-in [animation-delay:100ms]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
              <Sparkles size={16} aria-hidden="true" />
              <span>The dashboard your AI agents deserve</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 mb-6 animate-hero-fade-in [animation-delay:200ms]">
            {SITE_CONFIG.tagline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 animate-hero-fade-in [animation-delay:300ms]">
            {SITE_CONFIG.description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-hero-fade-in [animation-delay:400ms]">
            <button
              onClick={() => checkout()}
              disabled={isLoading}
              className="group relative inline-flex flex-col items-center px-8 py-3.5 gradient-bg rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="flex items-center gap-2 text-white font-semibold text-base">
                {isLoading ? "Loading…" : "Start 14-Day Free Trial"}
                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </span>
              {!isLoading && (
                <span className="text-xs text-primary-200/70 mt-0.5">
                  then $79/mo · cancel anytime
                </span>
              )}
            </button>
            <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="gap-2">
                <Play size={18} aria-hidden="true" />
                Watch Demo
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-400 animate-hero-fade-in [animation-delay:500ms]">
            {TRUST_INDICATORS.map((indicator) => (
              <span key={indicator} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary-500" />
                {indicator}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard screenshot */}
        <div className="mt-16 md:mt-24 relative animate-hero-fade-in [animation-delay:600ms]">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-primary-500/10">
            <Image
              src="/dashboard-preview.webp"
              alt="AgentCenter dashboard — task board, agent status, and deliverable review in one view"
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
