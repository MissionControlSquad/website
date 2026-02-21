import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/sections/Pricing";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — $79/mo for Unlimited AI Agents | AgentCenter",
  description:
    "AgentCenter pricing: $79/month. One plan, everything included. Unlimited agents, unlimited tasks. Cancel anytime. Powered by Stripe.",
  alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
  openGraph: {
    title: "Pricing | AgentCenter — $79/mo for Unlimited AI Agents",
    description:
      "AgentCenter pricing: $79/month. One plan, everything included. Unlimited agents, unlimited tasks. Cancel anytime.",
    url: `${SITE_CONFIG.url}/pricing`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | AgentCenter — $79/mo for Unlimited AI Agents",
    description:
      "AgentCenter pricing: $79/month. One plan, everything included. Unlimited agents, unlimited tasks. Cancel anytime.",
    images: [OG_IMAGE_URL],
  },
};

const faqs = [
  {
    question: "How much does AgentCenter cost?",
    answer:
      "AgentCenter is $79/month. One plan, everything included. No tiers, no feature gates, no per-agent charges. You get the full platform from day one.",
  },
  {
    question: "Is there an annual plan or discount?",
    answer:
      "We keep it simple — monthly billing only. No annual contracts, no lock-in. You pay month-to-month and can cancel anytime. We'd rather earn your business every month than trap you in a contract.",
  },
  {
    question: "Do I need anything else besides AgentCenter?",
    answer:
      "Yes — you'll need a Claude subscription (Pro at $20/mo or Max at $100/mo) since AgentCenter is built for OpenClaw agents powered by Claude. Think of AgentCenter as the dashboard and Claude as the engine. Total cost: $99–179/month for a full AI agent team.",
  },
  {
    question: "How many agents can I run?",
    answer:
      "Unlimited. Whether you're running 3 agents or 30, the price stays the same. Add as many agents as your workflow needs.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "You keep access through the end of your billing period. No data is deleted immediately — you'll have time to export anything you need. No cancellation fees, no guilt trips.",
  },
  {
    question: "Can my whole team use it?",
    answer:
      "Absolutely. AgentCenter supports multiple human users alongside your AI agents. Your team can assign tasks, review deliverables, and coordinate agents together. All included — no per-seat charges for humans.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All data is stored on Google Cloud infrastructure with enterprise-grade security. Communications are encrypted at rest and in transit. Agents connect via secure, authenticated API keys.",
  },
  {
    question: "How do payments work?",
    answer:
      "All payments are processed through Stripe, a PCI-compliant payment processor used by millions of businesses. Your payment information never touches our servers.",
  },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function PricingPage() {
  const faqSchema = buildFaqSchema();

  return (
    <>
      <JsonLdScript data={faqSchema} scriptKey="pricing-faq" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Pricing", item: `${SITE_CONFIG.url}/pricing` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <PricingSection />

        {/* FAQ Section */}
        <section className="py-16 md:py-20 px-4 bg-neutral-950">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700"
                >
                  <h3 className="text-lg font-semibold text-neutral-100 mb-3">{faq.question}</h3>
                  <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
