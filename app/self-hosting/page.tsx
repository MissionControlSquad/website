import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SelfHostingPricingSection from "@/components/sections/SelfHostingPricingSection";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG, SELFHOSTING_PRICING } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/self-hosting`;

export const metadata: Metadata = {
  title: `Self-Hosted AI Agent Dashboard — Run AgentCenter on Your Own Server | AgentCenter`,
  description: `Self-host the AgentCenter AI agent management dashboard on your own VM, cloud, or bare metal. Full Docker image, unique activation key, and docker-compose included. $${SELFHOSTING_PRICING.monthly}/month or $${SELFHOSTING_PRICING.yearly}/year (${SELFHOSTING_PRICING.yearlyDiscount}% off). Your data never leaves your machine.`,
  keywords: [
    "self-hosted AI agent dashboard",
    "on-premise AI agent management",
    "self-host AgentCenter",
    "docker AI agent dashboard",
    "AI agent management self-hosted",
    "private AI agent dashboard",
    "on-premise agent orchestration",
    "self-hosted OpenClaw dashboard",
    "docker compose AI agent",
    "AI agent management docker",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Self-Hosted AI Agent Dashboard | AgentCenter",
    description: `Host AgentCenter on your own infrastructure. Full Docker image, activation key, docker-compose included. $${SELFHOSTING_PRICING.monthly}/month. Your data stays on your machine.`,
    url: PAGE_URL,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Hosted AI Agent Dashboard | AgentCenter",
    description: `Run AgentCenter on your own server. Docker image + activation key + docker-compose. From $${SELFHOSTING_PRICING.monthly}/month.`,
    images: [TWITTER_IMAGE],
  },
};

const faqs = [
  {
    question: "What is the activation key for self-hosted AgentCenter?",
    answer:
      "The activation key is a unique license key tied to your subscription. When you start the Docker container, it validates the key against our licensing server. If the key is valid and the subscription is active, AgentCenter runs normally. This is how we enforce the license without collecting your data.",
  },
  {
    question: "Where can I run the self-hosted AgentCenter Docker image?",
    answer:
      "Anywhere Docker runs. A $6/mo Hetzner VPS, a $20/mo DigitalOcean droplet, your own rack, AWS EC2, GCP VM, Azure — doesn't matter. We'll provide the docker-compose.yml and you handle the host. Minimum spec: 1 vCPU, 1GB RAM.",
  },
  {
    question: "Is there a free trial for self-hosting?",
    answer:
      "No free trial for self-hosting. The setup has real complexity (Docker, server, environment config) that makes a trial impractical. If you're unsure, start with the cloud version at $79/month — same features, no setup required. You can switch to self-hosting later.",
  },
  {
    question: "Can I run multiple instances on one self-hosting license?",
    answer:
      "One license covers one running instance. If you need multiple isolated instances — for separate clients or workspaces — each needs its own license. Contact us if you're building something at scale and we'll figure out the right setup.",
  },
  {
    question: "What happens to my self-hosted AgentCenter when my subscription expires?",
    answer:
      "The activation key stops validating and AgentCenter will stop accepting new requests. Your data stays on your server — nothing is deleted remotely. Renew the subscription and it starts working again immediately.",
  },
  {
    question: "How do I update the self-hosted Docker image?",
    answer:
      "When we release a new version, we publish a new Docker image. You pull the new image, restart your container with docker-compose pull && docker-compose up -d, and you're on the latest version. We'll notify active subscribers of significant updates.",
  },
  {
    question: "Does my agent data leave my machine with self-hosting?",
    answer:
      "Only the activation key validation pings our licensing server at startup. Your agent data, tasks, messages, and deliverables stay entirely on your infrastructure. No telemetry, no data collection beyond license validation.",
  },
  {
    question: "What is the difference between self-hosted and cloud AgentCenter?",
    answer: `Self-hosted runs entirely on your own infrastructure — you control the server, the data, and the environment. The cloud version ($79/month) is hosted by us on Hetzner Cloud, requires no setup, and is ready in minutes. Self-hosting costs $${SELFHOSTING_PRICING.monthly}/month and gives you full data sovereignty.`,
  },
  {
    question: "Can I get a refund on a self-hosting license?",
    answer:
      "We don't offer refunds on self-hosting licenses. If you hit a setup issue, email us — we'll help you get it running. If something is genuinely broken on our end, we'll make it right.",
  },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AgentCenter Self-Hosted",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Linux, macOS, Windows (via Docker)",
    url: PAGE_URL,
    description:
      "Self-hosted AI agent management dashboard. Full Docker image with activation key and docker-compose file. Run on your own VM, cloud, or bare metal server.",
    offers: [
      {
        "@type": "Offer",
        name: "Monthly Self-Hosting License",
        price: String(SELFHOSTING_PRICING.monthly),
        priceCurrency: SELFHOSTING_PRICING.currency,
        description: "Monthly self-hosting license for AgentCenter. Cancel anytime.",
        url: PAGE_URL,
      },
      {
        "@type": "Offer",
        name: "Annual Self-Hosting License",
        price: String(SELFHOSTING_PRICING.yearly),
        priceCurrency: SELFHOSTING_PRICING.currency,
        description: `Annual self-hosting license for AgentCenter. ${SELFHOSTING_PRICING.yearlyDiscount}% off monthly price.`,
        url: PAGE_URL,
      },
    ],
    featureList: [
      "Full AgentCenter dashboard",
      "Unlimited AI agents",
      "Kanban task management",
      "Real-time agent status monitoring",
      "Lead/Orchestrator verification",
      "Deliverable review and tracking",
      "Project workspaces",
      "Docker image with docker-compose",
      "Unique activation key per license",
      "All future updates included",
    ],
  };
}

const comparisonRows = [
  { feature: "Monthly price", cloud: "$79/month", self: `$${SELFHOSTING_PRICING.monthly}/month` },
  { feature: "Annual price", cloud: "$799/year", self: `$${SELFHOSTING_PRICING.yearly}/year` },
  { feature: "Setup time", cloud: "Instant", self: "~15 min (Docker)" },
  { feature: "Data location", cloud: "Hetzner Cloud (EU)", self: "Your infrastructure" },
  { feature: "Data sovereignty", cloud: "Our servers", self: "100% your control" },
  { feature: "Infrastructure maintenance", cloud: "We handle it", self: "You handle it" },
  { feature: "Compliance / air-gap support", cloud: "Limited", self: "Yes" },
  { feature: "All features included", cloud: "Yes", self: "Yes" },
  { feature: "Updates", cloud: "Automatic", self: "docker-compose pull" },
  { feature: "Free trial", cloud: "14-day trial", self: "No trial" },
];

const useCases = [
  {
    title: "Data residency requirements",
    description:
      "Your company can't send data to third-party SaaS platforms. Self-hosting keeps all agent activity, task data, and deliverables within your own infrastructure.",
  },
  {
    title: "Compliance-sensitive environments",
    description:
      "Healthcare, finance, legal — regulated industries where you need to know exactly where data lives and who touches it. Self-hosting gives you the audit trail you need.",
  },
  {
    title: "Air-gapped or private networks",
    description:
      "Running agents behind a firewall or in a private VPC? Self-hosting works entirely on your network. The Docker image runs without internet access (except for license validation on startup).",
  },
  {
    title: "Agencies managing multiple clients",
    description:
      "Need a fully isolated AgentCenter instance per client? Each self-hosting license runs independently. No cross-contamination, no shared databases.",
  },
];

export default function SelfHostingPage() {
  return (
    <>
      <JsonLdScript data={buildFaqSchema()} scriptKey="self-hosting-faq" />
      <JsonLdScript data={buildProductSchema()} scriptKey="self-hosting-product" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Pricing", item: `${SITE_CONFIG.url}/pricing` },
          { name: "Self-Hosting", item: PAGE_URL },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 px-4 bg-neutral-950 border-b border-neutral-800">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                <span>🐳</span>
                <span>Self-Hosted Edition</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
                Self-Host the AgentCenter{" "}
                <span className="text-primary-400">AI Agent Dashboard</span> on Your Own Server
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                One Docker image. Your infrastructure. Full data sovereignty. We ship a
                production-ready container with every feature — you run it wherever Docker runs.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
                {[
                  "Docker image + docker-compose",
                  "Unique activation key per license",
                  "Data stays on your machine",
                  "All future updates included",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing + What's included + How it works (client component) */}
        <SelfHostingPricingSection />

        {/* Who is self-hosting for */}
        <section className="py-20 px-4 bg-neutral-950 border-t border-neutral-800">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-neutral-100 mb-4">
                  Who Should Self-Host AgentCenter?
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                  The cloud version works for most teams. Self-hosting makes sense when your
                  situation requires it.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {useCases.map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-xl bg-neutral-800/40 border border-neutral-700"
                  >
                    <h3 className="font-semibold text-neutral-100 mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-neutral-500 mt-10">
                Don&apos;t need full data sovereignty?{" "}
                <Link
                  href="/pricing"
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                >
                  See the cloud plan at $79/month
                </Link>{" "}
                — same features, zero setup.
              </p>
            </div>
          </Container>
        </section>

        {/* Cloud vs Self-Hosted comparison */}
        <section className="py-20 px-4 bg-neutral-900 border-t border-neutral-800">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-4">
                  Cloud vs. Self-Hosted AgentCenter
                </h2>
                <p className="text-neutral-400">
                  Both plans include every feature. The difference is where it runs.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-700 bg-neutral-800/60">
                      <th className="text-left px-5 py-4 text-neutral-400 font-medium">Feature</th>
                      <th className="text-center px-5 py-4 text-neutral-300 font-semibold">
                        Cloud
                      </th>
                      <th className="text-center px-5 py-4 text-primary-400 font-semibold">
                        Self-Hosted
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-neutral-800 last:border-0 ${idx % 2 === 0 ? "bg-neutral-900/40" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-neutral-300">{row.feature}</td>
                        <td className="px-5 py-3.5 text-center text-neutral-400">{row.cloud}</td>
                        <td className="px-5 py-3.5 text-center text-neutral-200 font-medium">
                          {row.self}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 px-4 bg-neutral-950 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center">
              Self-Hosting FAQ
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
            <p className="text-center text-sm text-neutral-500 mt-10">
              More questions?{" "}
              <a
                href="mailto:hey@dharmikjagodana.com"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
              >
                Email us
              </a>{" "}
              or check the{" "}
              <Link
                href="/docs"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
              >
                documentation
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
