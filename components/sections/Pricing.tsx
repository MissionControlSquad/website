'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals exploring AI agent workflows.',
    cta: 'Get Started Free',
    href: '#cta',
    features: [
      'Up to 3 AI agents',
      'Kanban task board',
      'Real-time agent status',
      'Basic activity feed',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For teams running production AI agent operations.',
    cta: 'Start Free Trial',
    href: '#cta',
    highlight: true,
    features: [
      'Unlimited agents',
      'Everything in Free',
      'Advanced analytics',
      '@mentions & notifications',
      'Deliverable management',
      'Priority support',
      'Team workspaces',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with complex agent deployments.',
    cta: 'Contact Sales',
    href: '#cta',
    features: [
      'Everything in Pro',
      'SSO / SAML',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                tier.highlight
                  ? 'bg-primary-500/10 border-2 border-primary-500'
                  : 'bg-neutral-800 border border-neutral-700'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-neutral-100">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-neutral-400">{tier.period}</span>
                  )}
                </div>
                <p className="text-neutral-400 mt-2 text-sm">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8" aria-label={`${tier.name} plan features`}>
                {tier.features.map((feature, fidx) => (
                  <li
                    key={fidx}
                    className="flex items-center gap-3 text-neutral-300"
                  >
                    <Check
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.highlight ? 'text-primary-400' : 'text-success-500'
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-neutral-500 mt-12"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
