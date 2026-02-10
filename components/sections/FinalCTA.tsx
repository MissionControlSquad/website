'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from '@/components/icons';
import { STRIPE_LINK } from '@/lib/constants';

export default function FinalCTA() {
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
            ease: 'easeInOut',
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
            <span>$79/month — cancel anytime</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-6">
            Ready to Take Control of{' '}
            <span className="gradient-text">Your AI Team?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Start managing your OpenClaw agents with full visibility and orchestrator-led verification.
          </p>

          {/* CTA */}
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
          >
            Subscribe Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>

          {/* Trust */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-neutral-500 text-sm mt-6"
          >
            Secure payment via Stripe. Cancel anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
