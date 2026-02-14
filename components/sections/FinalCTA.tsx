"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle } from "@/components/icons";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
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
        <motion.div
          className="w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Stay in the loop</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-6">
            Ready to Take Control of <span className="gradient-text">Your AI Team?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Subscribe to get product updates, new features, and tips on managing your OpenClaw
            agents.
          </p>

          {/* Subscribe to updates form */}
          <div className="max-w-md mx-auto mb-6">
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-success-500 py-3">
                <CheckCircle size={20} />
                <span className="font-medium">You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Trust */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-neutral-500 text-sm"
          >
            No spam. Just product updates and tips.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
