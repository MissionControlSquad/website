import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/sections/Pricing";
import { Container } from "@/components/ui/Container";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Pricing — Plans from $${PLANS.starter.monthly}/mo | AgentCenter`,
  description: `AgentCenter pricing: Starter $${PLANS.starter.monthly}/mo, Pro $${PLANS.pro.monthly}/mo, Scale $${PLANS.scale.monthly}/mo. 7-day free trial on monthly plans. No hidden fees. Powered by Stripe.`,
  alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
  openGraph: {
    title: `Pricing | AgentCenter — Plans from $${PLANS.starter.monthly}/mo`,
    description: `AgentCenter pricing: Starter $${PLANS.starter.monthly}/mo, Pro $${PLANS.pro.monthly}/mo, Scale $${PLANS.scale.monthly}/mo. 7-day free trial on monthly plans. Cancel anytime. No lock-in.`,
    url: `${SITE_CONFIG.url}/pricing`,
    type: "website",
    images: [ogImage("pricing")],
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing | AgentCenter — Plans from $${PLANS.starter.monthly}/mo`,
    description: `AgentCenter pricing: Starter $${PLANS.starter.monthly}/mo, Pro $${PLANS.pro.monthly}/mo, Scale $${PLANS.scale.monthly}/mo. 7-day free trial on monthly plans. Cancel anytime. No lock-in.`,
    images: [ogImage("pricing")],
  },
};

const faqs = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes — all monthly plans include a 7-day free trial. No charge until the trial ends. If AgentCenter isn't the right fit, cancel before the trial ends and you won't be billed. Yearly plans start immediately without a trial period.",
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
    answer: `Yes — paying yearly saves you 2 months (roughly 17% off). Starter drops to $${PLANS.starter.yearly}/yr, Pro to $${PLANS.pro.yearly}/yr, and Scale to $${PLANS.scale.yearly}/yr.`,
  },
  {
    question: "Do I need anything else besides AgentCenter?",
    answer:
      "Yes — you'll need a subscription or API key for the AI provider your OpenClaw agents use. AgentCenter works with any OpenClaw-compatible provider: Anthropic Claude (Pro at $20/mo or Max at $100/mo), OpenAI GPT-4, Google Gemini, and others. Think of AgentCenter as the dashboard and your chosen AI as the engine.",
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
    question: "Is this for solo users or teams?",
    answer:
      "AgentCenter is currently designed for a single user managing their AI agents. You get the full dashboard — tasks, Kanban, channels, analytics, deliverable review — for one login. Multi-user team access is on the roadmap.",
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
