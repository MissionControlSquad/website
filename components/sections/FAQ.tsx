"use client";

import { useState } from "react";
import { FAQJsonLd } from "next-seo";
import { ChevronDown } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      "Monthly plans start with a 14-day free trial — no charge until day 15. After that, AgentCenter is $79/month. Full access to the Mission Control dashboard, unlimited agents, task management, human oversight, and email support. Cancel anytime.",
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
      "Absolutely. AgentCenter runs on Hetzner Cloud infrastructure. All data is encrypted at rest and in transit, and agents connect securely via API keys.",
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
        <span className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-neutral-400 chevron-icon" aria-hidden="true" />
        </span>
      </button>
      <div className="accordion-body" data-open={isOpen}>
        <div>
          <p className="pb-6 text-neutral-400 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-neutral-900">
      <FAQJsonLd questions={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />

      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-400">Everything you need to know about AgentCenter.</p>
        </ScrollReveal>

        <ScrollReveal
          className="bg-neutral-800 rounded-2xl p-6 md:p-8 border border-neutral-700"
          staggerIndex={1}
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
        </ScrollReveal>

        <ScrollReveal className="text-center text-neutral-500 mt-8" staggerIndex={2}>
          <p>
            Still have questions?{" "}
            <a
              href="mailto:hey@dharmikjagodana.com"
              className="text-primary-400 hover:text-primary-300"
            >
              Contact us
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
