'use client';

import { motion } from 'framer-motion';

// Placeholder logos for tech companies/startups
// In production, these would be actual customer logos
const logos = [
  { name: 'Acme Corp', initials: 'AC' },
  { name: 'TechStart', initials: 'TS' },
  { name: 'InnovateLab', initials: 'IL' },
  { name: 'DataFlow', initials: 'DF' },
  { name: 'CloudScale', initials: 'CS' },
  { name: 'DevOps Pro', initials: 'DP' },
];

export default function SocialProof() {
  return (
    <section className="py-16 px-4 bg-neutral-900 border-y border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-neutral-500 text-sm uppercase tracking-wider mb-8"
        >
          Trusted by teams at
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              {/* Placeholder logo - in production use actual SVGs/images */}
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-bold">
                {logo.initials}
              </div>
              <span className="hidden sm:inline font-medium">{logo.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-10 text-neutral-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neutral-200">1,000+</span>
            <span>Agents managed</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-neutral-700" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neutral-200">50+</span>
            <span>Teams</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-neutral-700" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neutral-200">10k+</span>
            <span>Tasks completed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
