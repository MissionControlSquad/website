import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import EarningsCalculator from "@/components/sections/EarningsCalculator";
import {
  Check,
  ArrowRight,
  Zap,
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Gift,
  Shield,
  Clock,
  Sparkles,
} from "@/components/icons";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG, PRICING, AFFILIATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Affiliate Program — Earn 30% Commission | AgentCenter",
  description:
    "Join AgentCenter's affiliate program and earn 30% recurring commission on every referral. Help others manage their AI agents while earning passive income.",
  alternates: { canonical: `${SITE_CONFIG.url}/affiliate` },
  openGraph: {
    title: "Affiliate Program — Earn 30% Commission | AgentCenter",
    description:
      "Join AgentCenter's affiliate program and earn 30% recurring commission on every referral. Help others manage their AI agents while earning passive income.",
    url: `${SITE_CONFIG.url}/affiliate`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Program — Earn 30% Commission | AgentCenter",
    description:
      "Join AgentCenter's affiliate program and earn 30% recurring commission on every referral. Help others manage their AI agents while earning passive income.",
    images: [TWITTER_IMAGE],
  },
};

const benefits = [
  {
    title: "30% Recurring Commission",
    description:
      "Earn 30% of every subscription payment, month after month. Your earnings grow as your referrals stay active.",
    icon: DollarSign,
  },
  {
    title: "Real-time Tracking",
    description:
      "Monitor clicks, conversions, and earnings in real-time through our affiliate dashboard.",
    icon: BarChart3,
  },
  {
    title: "Marketing Resources",
    description:
      "Access banners, copy, and promotional materials to help you promote AgentCenter effectively.",
    icon: Gift,
  },
  {
    title: "Automated Payouts",
    description:
      "Get paid automatically via PayPal. No manual requests, no delays — just consistent monthly payments.",
    icon: Clock,
  },
  {
    title: "No Limits",
    description: "Refer as many customers as you want. There's no cap on your earning potential.",
    icon: TrendingUp,
  },
  {
    title: "Dedicated Support",
    description: "Get help when you need it. Our team is here to support your affiliate success.",
    icon: Users,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Sign Up",
    description:
      "Join our affiliate program in seconds. Just provide your email and basic information.",
  },
  {
    step: 2,
    title: "Get Your Link",
    description: "Receive your unique affiliate tracking link and promotional materials.",
  },
  {
    step: 3,
    title: "Share & Earn",
    description:
      "Share AgentCenter with your audience. Every successful referral earns you 30% recurring commission.",
  },
];

const faqs = [
  {
    question: "How much can I earn?",
    answer: `You earn ${(AFFILIATE.commissionRate * 100).toFixed(0)}% of every subscription payment. Since AgentCenter costs $${PRICING.monthly}/${PRICING.billingPeriod}, you'll earn $${AFFILIATE.monthlyCommission.toFixed(2)} per referral per month. With 10 active referrals, that's $${(AFFILIATE.monthlyCommission * 10).toFixed(2)}/month or $${(AFFILIATE.monthlyCommission * 10 * 12).toFixed(2)}/year in passive income.`,
  },
  {
    question: "When do I get paid?",
    answer:
      "Payouts are processed automatically via PayPal on a monthly basis. You'll receive your commission for all active referrals each month.",
  },
  {
    question: "Is the commission recurring?",
    answer:
      "Yes! You earn 30% commission every month for as long as your referrals remain active subscribers. This means your earnings can grow over time.",
  },
  {
    question: "How do I track my referrals?",
    answer:
      "Once you sign up, you'll get access to a dashboard where you can track clicks, conversions, and earnings in real-time.",
  },
  {
    question: "Are there any requirements to join?",
    answer:
      "No! Anyone can join our affiliate program. Whether you're a content creator, developer, or just someone who loves AgentCenter, you're welcome to participate.",
  },
  {
    question: "What if someone cancels their subscription?",
    answer:
      "If a referral cancels, you'll stop earning commission for that referral. However, you'll continue earning from all your other active referrals.",
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

export default function AffiliatePage() {
  const faqSchema = buildFaqSchema();

  return (
    <>
      <JsonLdScript data={faqSchema} scriptKey="affiliate-faq" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Affiliate", item: `${SITE_CONFIG.url}/affiliate` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-neutral-950 to-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium mb-6">
                  <Sparkles size={16} className="text-primary-400" />
                  Join Our Affiliate Program
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-neutral-100 mb-6">
                  Earn <span className="text-primary-400">30% Commission</span> on Every Referral
                </h1>
                <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                  Help others discover AgentCenter and earn recurring passive income. Every active
                  referral pays you{" "}
                  <span className="text-primary-400 font-semibold">
                    ${AFFILIATE.monthlyCommission.toFixed(2)}/month.
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={AFFILIATE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
                  >
                    Join Now — It&apos;s Free
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <a
                    href="#earnings"
                    className="text-neutral-400 hover:text-neutral-100 transition-colors underline underline-offset-4"
                  >
                    See Earning Potential
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Earnings Calculator Section */}
        <EarningsCalculator />

        {/* What We Provide Section */}
        <section className="py-20 px-4 bg-neutral-900">
          <Container>
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  What We Provide
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Everything you need to succeed as an AgentCenter affiliate.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, idx) => {
                  const IconComponent = benefit.icon;
                  return (
                    <ScrollReveal key={idx} staggerIndex={idx} className="relative">
                      <div className="h-full p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700 hover:border-primary-500/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                          <IconComponent size={24} className="text-primary-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">{benefit.description}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-neutral-400">Get started in three simple steps.</p>
              </ScrollReveal>

              <div className="space-y-8">
                {howItWorks.map((step, idx) => (
                  <ScrollReveal key={idx} staggerIndex={idx} className="relative">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 relative">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border-2 border-primary-500 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-400">{step.step}</span>
                        </div>
                        {idx < howItWorks.length - 1 && (
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-neutral-700" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-2xl font-semibold text-neutral-100 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal staggerIndex={3} className="mt-12 text-center">
                <a
                  href={AFFILIATE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
                >
                  Sign Up Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Why AgentCenter Section */}
        <section className="py-20 px-4 bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  Why Promote AgentCenter?
                </h2>
                <p className="text-lg text-neutral-400">
                  AgentCenter is solving a real problem for teams managing AI agents. Your referrals
                  will thank you.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                <ScrollReveal
                  staggerIndex={0}
                  className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Zap size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                        High-Value Product
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        AgentCenter provides real value at ${PRICING.monthly}/$
                        {PRICING.billingPeriod}, making it easy to justify and recommend.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  staggerIndex={1}
                  className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                        Growing Market
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        The AI agent market is exploding. Get in early and build a sustainable
                        affiliate income stream.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  staggerIndex={2}
                  className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                        Recurring Revenue
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        Unlike one-time commissions, you earn every month your referrals stay
                        active. Build long-term wealth.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  staggerIndex={3}
                  className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                        Easy to Promote
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        We provide all the marketing materials you need. Just share your link and
                        start earning.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-neutral-950">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ScrollReveal className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-400">
                  Everything you need to know about our affiliate program.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <ScrollReveal key={idx} staggerIndex={idx}>
                    <div className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700">
                      <h3 className="text-lg font-semibold text-neutral-100 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  Ready to Start Earning?
                </h2>
                <p className="text-lg text-neutral-400 mb-8">
                  Join our affiliate program today and start earning $
                  {AFFILIATE.monthlyCommission.toFixed(2)} per referral, every month.
                </p>
                <a
                  href={AFFILIATE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
                >
                  Join the Affiliate Program
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <p className="text-sm text-neutral-500 mt-4">
                  Sign up takes less than 60 seconds. No credit card required.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
