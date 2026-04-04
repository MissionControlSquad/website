"use client";

import { useState } from "react";
import { ArrowRight, Zap, CheckCircle } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CAL_LINK, DEFAULT_TIER } from "@/lib/constants";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { trackCTA } from "@/lib/analytics";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { checkout, isLoading } = useCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    trackCTA("bottom", "subscribe");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section id="cta" className="py-24 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-primary-950/40 to-neutral-950" />

      {/* Animated glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] animate-cta-glow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Launch your agent army</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-6">
            Ready to Take Control of <span className="gradient-text">Your AI Team?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Get started today and see why teams trust AgentCenter to coordinate their AI agents.
            Cancel anytime.
          </p>

          {/* Primary CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => {
                trackCTA("bottom", "get_started");
                checkout({ tier: DEFAULT_TIER });
              }}
              disabled={isLoading}
              className="group relative inline-flex flex-col items-center px-10 py-4 gradient-bg rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="flex items-center gap-2 text-white font-semibold text-lg">
                {isLoading ? "Loading…" : "Get Started"}
                {!isLoading && (
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </span>
              {!isLoading && (
                <span className="text-xs text-primary-200/70 mt-1">
                  from $14/mo · cancel anytime
                </span>
              )}
            </button>

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

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-md mx-auto mb-8">
            <div className="flex-1 h-px bg-neutral-700" />
            <span className="text-neutral-500 text-sm">or stay in the loop</span>
            <div className="flex-1 h-px bg-neutral-700" />
          </div>

          {/* Subscribe form */}
          <div className="max-w-md mx-auto mb-6">
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-success-500 py-3">
                <CheckCircle size={20} />
                <span className="font-medium">You&apos;re subscribed!</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Trust */}
          <p className="text-neutral-500 text-sm">No spam. Just product updates and tips.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
