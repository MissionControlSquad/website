'use client';

import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

const categories = [
  {
    name: 'Agent Frameworks',
    examples: 'CrewAI, LangGraph, AutoGen',
    description: 'Build and orchestrate AI agents',
    features: {
      'Build agents': true,
      'Run workflows': true,
      'Task management': false,
      'Human oversight': false,
      'Visual dashboard': false,
      'Team coordination': false,
    },
  },
  {
    name: 'Observability',
    examples: 'Langfuse, AgentOps, LangSmith',
    description: 'Monitor and trace agent execution',
    features: {
      'Build agents': false,
      'Run workflows': false,
      'Task management': false,
      'Human oversight': false,
      'Visual dashboard': true,
      'Team coordination': false,
    },
  },
  {
    name: 'Mission Control',
    examples: 'You are here',
    description: 'Manage your AI agent team',
    highlight: true,
    features: {
      'Build agents': false,
      'Run workflows': false,
      'Task management': true,
      'Human oversight': true,
      'Visual dashboard': true,
      'Team coordination': true,
    },
  },
];

const featureList = [
  'Build agents',
  'Run workflows',
  'Task management',
  'Human oversight',
  'Visual dashboard',
  'Team coordination',
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Not a Framework. Not Just Observability.
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            You build the agents. We help you manage them.
          </p>
        </motion.div>

        {/* Desktop view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full" aria-label="Feature comparison between agent frameworks, observability tools, and Mission Control">
            <thead>
              <tr>
                <th scope="col" className="text-left p-4 text-neutral-400 font-medium">
                  Feature
                </th>
                {categories.map((category, idx) => (
                  <th
                    key={category.name}
                    scope="col"
                    className={`p-4 text-center ${
                      category.highlight
                        ? 'bg-primary-500/10 rounded-t-lg border-t border-l border-r border-primary-500/30'
                        : ''
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      {category.highlight && (
                        <div className="flex items-center justify-center gap-2 text-primary-400 text-sm mb-2">
                          <Sparkles className="w-4 h-4" aria-hidden="true" />
                          <span>Recommended</span>
                        </div>
                      )}
                      <div className="text-lg font-semibold text-neutral-100">
                        {category.name}
                      </div>
                      <div className="text-sm text-neutral-500 mt-1">
                        {category.examples}
                      </div>
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureList.map((feature, idx) => (
                <motion.tr
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border-t border-neutral-800"
                >
                  <th scope="row" className="p-4 text-neutral-300 text-left font-normal">{feature}</th>
                  {categories.map((category) => (
                    <td
                      key={`${category.name}-${feature}`}
                      className={`p-4 text-center ${
                        category.highlight
                          ? 'bg-primary-500/10 border-l border-r border-primary-500/30'
                          : ''
                      }`}
                    >
                      {category.features[feature as keyof typeof category.features] ? (
                        <>
                          <Check
                            className={`w-5 h-5 mx-auto ${
                              category.highlight ? 'text-primary-400' : 'text-success-500'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="sr-only">Yes</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 mx-auto text-neutral-600" aria-hidden="true" />
                          <span className="sr-only">No</span>
                        </>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
              <tr className="border-t border-neutral-800">
                <td className="p-4" />
                {categories.map((category) => (
                  <td
                    key={`${category.name}-cta`}
                    className={`p-4 text-center ${
                      category.highlight
                        ? 'bg-primary-500/10 rounded-b-lg border-b border-l border-r border-primary-500/30'
                        : ''
                    }`}
                  >
                    {category.highlight && (
                      <a
                        href="#cta"
                        className="inline-flex items-center justify-center px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                      >
                        Get Started Free
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile view - cards */}
        <div className="md:hidden space-y-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-xl ${
                category.highlight
                  ? 'bg-primary-500/10 border border-primary-500/30'
                  : 'bg-neutral-800 border border-neutral-700'
              }`}
            >
              {category.highlight && (
                <div className="flex items-center gap-2 text-primary-400 text-sm mb-3">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Recommended</span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-neutral-100 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-500 mb-4">{category.examples}</p>
              <ul className="space-y-2">
                {featureList.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm"
                  >
                    {category.features[feature as keyof typeof category.features] ? (
                      <Check
                        className={`w-4 h-4 flex-shrink-0 ${
                          category.highlight ? 'text-primary-400' : 'text-success-500'
                        }`}
                        aria-hidden="true"
                      />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0 text-neutral-600" aria-hidden="true" />
                    )}
                    <span
                      className={
                        category.features[feature as keyof typeof category.features]
                          ? 'text-neutral-200'
                          : 'text-neutral-500'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {category.highlight && (
                <a
                  href="#cta"
                  className="mt-6 block w-full text-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  Get Started Free
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
