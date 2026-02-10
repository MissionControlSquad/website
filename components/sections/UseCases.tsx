'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Code, Headphones } from 'lucide-react';

const useCases = [
  {
    id: 'content',
    icon: Users,
    title: 'Content Teams',
    shortTitle: 'Content',
    description:
      'AI writers and editors work together, with human approval before anything goes live.',
    example:
      'Your AI researcher finds topics, the writer drafts articles, and you review and approve before publishing.',
    benefits: [
      'Multi-agent content pipeline',
      'Human review checkpoints',
      'Version-controlled drafts',
    ],
  },
  {
    id: 'research',
    icon: Search,
    title: 'Research Squads',
    shortTitle: 'Research',
    description:
      'Multiple research agents gather and synthesize data, reporting findings to your dashboard.',
    example:
      'Assign market research to one agent, competitor analysis to another. See all findings in one place.',
    benefits: [
      'Parallel research tracks',
      'Consolidated findings',
      'Source tracking',
    ],
  },
  {
    id: 'dev',
    icon: Code,
    title: 'Dev Automation',
    shortTitle: 'Dev',
    description:
      'Coding agents write and test code, with human code review integrated into the workflow.',
    example:
      'Agent writes the feature, another writes tests, you review the PR before merge.',
    benefits: [
      'Automated code generation',
      'Test coverage agents',
      'Human code review',
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Customer Support',
    shortTitle: 'Support',
    description:
      'AI agents handle tickets with automatic escalation to humans for complex issues.',
    example:
      'Agents answer common questions instantly. Edge cases get flagged for your team.',
    benefits: [
      'Instant first response',
      'Smart escalation',
      'Quality control',
    ],
  },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState('content');
  const activeCase = useCases.find((uc) => uc.id === activeTab)!;
  const ActiveIcon = activeCase.icon;

  return (
    <section id="use-cases" className="py-24 px-4 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Built for Real Teams
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            See how teams use Mission Control to manage their AI agent workflows.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Use case categories"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            const isActive = activeTab === useCase.id;
            return (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${useCase.id}`}
                id={`tab-${useCase.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{useCase.title}</span>
                <span className="sm:hidden">{useCase.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Left: Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <ActiveIcon className="w-6 h-6 text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-100">
                  {activeCase.title}
                </h3>
              </div>
              <p className="text-lg text-neutral-300 mb-4">
                {activeCase.description}
              </p>
              <p className="text-neutral-400 mb-6 p-4 bg-neutral-800 rounded-lg border-l-4 border-primary-500">
                {activeCase.example}
              </p>
              <ul className="space-y-3">
                {activeCase.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-neutral-300"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Visual placeholder */}
            <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 min-h-[300px] flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <ActiveIcon className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
                <p className="text-sm">
                  {activeCase.title} workflow visualization
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
