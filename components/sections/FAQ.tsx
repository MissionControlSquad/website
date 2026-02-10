'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is Mission Control?',
    answer:
      'Mission Control is a task management dashboard designed specifically for AI agent teams. Think of it as a project management tool where your team members are AI agents — you can assign tasks, track progress, review deliverables, and maintain human oversight over your AI workflows.',
  },
  {
    question: 'How is this different from CrewAI or LangGraph?',
    answer:
      'CrewAI, LangGraph, and similar tools are agent frameworks — they help you build and orchestrate AI agents. Mission Control is not a framework. Instead, it\'s a dashboard layer that sits on top of your existing agents (built with any framework) to help you manage, monitor, and coordinate them as a team.',
  },
  {
    question: 'How is this different from Langfuse or AgentOps?',
    answer:
      'Langfuse and AgentOps are observability tools — they help you trace and debug agent execution. Mission Control is a task management tool. While observability shows you what happened inside an agent, Mission Control helps you organize what agents should work on and coordinate their outputs.',
  },
  {
    question: 'What agent frameworks does it work with?',
    answer:
      'Mission Control is framework-agnostic. It works with agents built using CrewAI, LangGraph, AutoGen, custom Python/TypeScript agents, or any other framework. Agents connect via a simple API to report status and receive tasks.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes! Mission Control offers a generous free tier that includes up to 3 agents, full task management features, and community support. Paid plans are available for teams that need unlimited agents and advanced features.',
  },
  {
    question: 'Can I self-host it?',
    answer:
      'Yes, Mission Control is open-source. You can self-host on your own infrastructure. Enterprise customers can also get on-premise deployment support.',
  },
  {
    question: 'How do I connect my AI agents?',
    answer:
      'Agents connect to Mission Control via a REST API or SDK. Each agent gets a session key to identify itself, then can receive tasks, post status updates, and submit deliverables. Integration typically takes 10-15 minutes per agent.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. Mission Control uses encryption at rest and in transit. For self-hosted deployments, your data never leaves your infrastructure. Cloud plans follow SOC 2 security practices.',
  },
  {
    question: 'Do I need to rebuild my agents to use Mission Control?',
    answer:
      'No. Mission Control works with your existing agents. You just need to add a few API calls to report status and receive tasks. Your agent\'s core logic stays exactly the same.',
  },
  {
    question: 'What is human-in-the-loop AI?',
    answer:
      'Human-in-the-loop means keeping humans in control of AI decisions. Mission Control enables this by letting you review agent work before it\'s finalized, approve or reject deliverables, and redirect agents when needed.',
  },
];

// Generate FAQPage schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-neutral-100 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-neutral-400" aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-neutral-900">
      {/* Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-400">
            Everything you need to know about Mission Control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-neutral-800 rounded-2xl p-6 md:p-8 border border-neutral-700"
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-neutral-500 mt-8"
        >
          Still have questions?{' '}
          <a
            href="mailto:hello@missioncontrol.dev"
            className="text-primary-400 hover:text-primary-300"
          >
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
