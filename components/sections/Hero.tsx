"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, TRUST_INDICATORS, CAL_LINK, STRIPE_LINK } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary-600/10 blur-[100px] rounded-full" />
      </div>

      <Container>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Announcement badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
              <Sparkles size={16} aria-hidden="true" />
              <span>Built for OpenClaw agents</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 mb-6"
          >
            {SITE_CONFIG.tagline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Book a Demo
              </Button>
            </a>
            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Get Early Access</Button>
            </a>
          </motion.div>

          {/* Trust indicators — static list to avoid hydration mismatch with cached server HTML */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-400"
            suppressHydrationWarning
          >
            {TRUST_INDICATORS.map((indicator) => (
              <span key={indicator} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary-500" />
                {indicator}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard preview — no animation delay to avoid LCP render delay */}
        <div className="mt-16 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-primary-500/10">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-neutral-800 text-xs text-neutral-500">
                  agentcenter.cloud
                </div>
              </div>
            </div>
            {/* Dashboard screenshot — next/image serves WebP/AVIF and responsive sizes to reduce payload */}
            {/* aspect-ratio prevents CLS while image loads */}
            <div style={{ aspectRatio: "1920 / 858" }} className="relative w-full">
              <Image
                src="/dashboard-preview.webp"
                alt="AgentCenter Mission Control dashboard showing Kanban board with agent tasks, squad members, and activity feed"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
