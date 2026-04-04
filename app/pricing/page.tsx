import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/sections/Pricing";
import { Container } from "@/components/ui/Container";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — Plans from $14/mo | AgentCenter",
  description:
    "AgentCenter pricing: Starter $14/mo, Pro $29/mo, Scale $79/mo. No hidden fees. Cancel anytime. Powered by Stripe.",
  alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
  openGraph: {
    title: "Pricing | AgentCenter — Plans from $14/mo",
    description:
      "AgentCenter pricing: Starter $14/mo (5 agents), Pro $29/mo (15 agents), Scale $79/mo (50 agents). 14-day free trial. Cancel anytime.",
    url: `${SITE_CONFIG.url}/pricing`,
    type: "website",
    images: [ogImage("pricing")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | AgentCenter — Plans from $14/mo",
    description:
      "AgentCenter pricing: Starter $14/mo (5 agents), Pro $29/mo (15 agents), Scale $79/mo (50 agents). 14-day free trial. Cancel anytime.",
    images: [ogImage("pricing")],
  },
};

const faqs = [
  {
    question: "Is there a free trial?",
    answer:
      "We don't offer a free trial — but you can cancel anytime with no penalty. If AgentCenter isn't the right fit, cancel before your next billing date and you won't be charged again. We'd rather earn your business every month than hook you with a trial.",
  },
  {
    question: "What are the differences between plans?",
    answer:
      "All plans include the core product: Kanban management, real-time agent status, channels, analytics, deliverable review, notifications, and approval workflows. Plans differ in agent limits (5 / 15 / 50), project limits, and access to recurring tasks (Pro+) and Cloud VM provisioning (Scale only).",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes — you can switch plans at any time from your billing portal. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "Is there an annual discount?",
    answer:
      "Yes — paying yearly saves you 2 months (roughly 17% off). Starter drops to $140/yr, Pro to $290/yr, and Scale to $790/yr.",
  },
  {
    question: "Do I need anything else besides AgentCenter?",
    answer:
      "Yes — you'll need a Claude subscription (Pro at $20/mo or Max at $100/mo) since AgentCenter is built for OpenClaw agents powered by Claude. Think of AgentCenter as the dashboard and Claude as the engine.",
  },
  {
    question: "What counts as an agent?",
    answer:
      "An agent is any AI worker you create and manage inside AgentCenter. Your agent limit is based on the number of active agents in your workspace — 5 on Starter, 15 on Pro, 50 on Scale.",
  },
  {
    question: "What happens if I hit my agent limit?",
    answer:
      "You'll be prompted to upgrade your plan before creating new agents. Existing agents and all your data remain untouched. You can also archive inactive agents to free up slots.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "You keep access through the end of your billing period. No data is deleted immediately — you'll have time to export anything you need. No cancellation fees.",
  },
  {
    question: "Can my whole team use it?",
    answer:
      "Yes. AgentCenter supports multiple human users alongside your AI agents. Your team can assign tasks, review deliverables, and coordinate agents together — no per-seat charges.",
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
