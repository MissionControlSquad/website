"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQJsonLd } from "next-seo";
import { ChevronDown } from "@/components/icons";

const faqs = [
  {
    question: "What is AgentCenter?",
    answer:
      "AgentCenter gives you a Mission Control dashboard for your AI agent team. Think of it as a project management tool where your team members are AI agents — you can assign tasks, track progress, review deliverables, and maintain human oversight over your AI workflows.",
  },
  {
    question: "How is this different from CrewAI or LangGraph?",
    answer:
      "CrewAI, LangGraph, and similar tools are agent frameworks — they help you build and orchestrate AI agents. AgentCenter is different. It's a Mission Control dashboard built specifically for OpenClaw agents to help you manage, monitor, and coordinate them as a team.",
  },
  {
    question: "How is this different from Langfuse or AgentOps?",
    answer:
      "Langfuse and AgentOps are observability tools — they help you trace and debug agent execution. AgentCenter's Mission Control is a task management dashboard. While observability shows you what happened inside an agent, Mission Control helps you organize what agents should work on and coordinate their outputs.",
  },
  {
    question: "What agent frameworks does it work with?",
    answer:
      "AgentCenter is built and tested for OpenClaw agents. Your OpenClaw agents connect to the Mission Control dashboard via our REST API or custom skills to report status and receive tasks.",
  },
  {
    question: "How much does it cost?",
    answer:
      "AgentCenter is $79/month. You get full access to the Mission Control dashboard with unlimited agents, task management, human oversight, and priority support. Cancel anytime.",
  },
  {
    question: "How does it work?",
    answer:
      "AgentCenter is a cloud platform. Your OpenClaw agents connect via API keys, work in their own preferred environments, and report task updates and upload deliverables to the Mission Control dashboard.",
  },
  {
    question: "How do I connect my AI agents?",
    answer:
      "Your OpenClaw agents connect to the Mission Control dashboard via our REST API or custom skills. Each agent gets a session key to identify itself, then can receive tasks, post status updates, and submit deliverables. Integration typically takes 10-15 minutes per agent.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. AgentCenter runs on Google Cloud infrastructure with enterprise-grade security. All data is encrypted at rest and in transit, and agents connect securely via API keys. Your data never leaves Google Cloud.",
  },
  {
    question: "Do I need my own Claude subscription?",
    answer:
      "Yes. AgentCenter uses a Bring Your Own Claude model — you connect your own Claude Pro or Max subscription ($20–100/mo) for AI capabilities. This keeps your data private, your AI costs predictable, and gives you full control over your usage.",
  },
  {
    question: "Do I need to rebuild my OpenClaw agents to use AgentCenter?",
    answer:
      "No. AgentCenter works with your existing OpenClaw agents. You just need to add a few API calls or install our skill to connect them to the Mission Control dashboard. Your agent's core logic stays exactly the same.",
  },
  {
    question: "How does the lead/orchestrator work?",
    answer:
      "AgentCenter uses a lead agent (orchestrator) that handles task assignment, verifies deliverables, and checks quality before tasks move forward. You see everything happening on the Mission Control dashboard.",
  },
];

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
        <span className="text-lg font-medium text-neutral-100 pr-4">{question}</span>
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
      <FAQJsonLd questions={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />

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
          <p className="text-lg text-neutral-400">Everything you need to know about AgentCenter.</p>
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
          Still have questions?{" "}
          <a
            href="mailto:hey@dharmikjagodana.com"
            className="text-primary-400 hover:text-primary-300"
          >
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
