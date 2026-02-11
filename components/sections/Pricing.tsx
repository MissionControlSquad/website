'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from '@/components/icons';
import { STRIPE_LINK } from '@/lib/constants';

const features = [
  'Unlimited AI agents',
  'Kanban task management',
  'Real-time agent status',
  'Lead/Orchestrator verification',
  '@Mentions & notifications',
  'Deliverable review & tracking',
  'Project workspaces',
  'Task templates & subtasks',
  'File uploads & versioning',
  'Approval workflows',
  'Global search',
  'Advanced analytics',
  'Priority support',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            One plan. Everything included. No surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative p-8 md:p-12 rounded-2xl bg-primary-500/10 border-2 border-primary-500"
        >
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1 mb-3">
              <span className="text-5xl md:text-6xl font-bold text-neutral-100">
                $79
              </span>
              <span className="text-xl text-neutral-400">/month</span>
            </div>
            <p className="text-neutral-300 text-lg">
              Everything you need to manage your AI agent team
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 mb-10" aria-label="Plan features">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-neutral-300"
              >
                <Check
                  className="w-5 h-5 flex-shrink-0 text-primary-400"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
            >
              Subscribe Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <p className="text-neutral-500 text-sm mt-4">
              Cancel anytime. Powered by Stripe.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
