import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SelfHostingPricingSection from "@/components/sections/SelfHostingPricingSection";
import { Container } from "@/components/ui/Container";
import { Shield, ShieldCheck, Activity, DollarSign, GitBranch, Monitor } from "@/components/icons";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG, SELFHOSTING_PRICING } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/self-hosting`;
const DATE_PUBLISHED = "2026-03-12";
const DATE_MODIFIED = "2026-04-04";
const PRICE_VALID_UNTIL = "2027-12-31";

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
    "self-hosted AI agent management software",
    "deploy AgentCenter docker",
    "AgentCenter on-premise",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Self-Hosted AI Agent Dashboard | AgentCenter",
    description: `Host AgentCenter on your own infrastructure. Docker image, activation key, docker-compose included. $${SELFHOSTING_PRICING.monthly}/month. Your data stays on your machine.`,
    url: PAGE_URL,
    type: "website",
    images: [
      ogImage(
        "self-hosting",
        "AgentCenter Self-Hosted — AI Agent Dashboard Running on Your Own Server"
      ),
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Hosted AI Agent Dashboard | AgentCenter",
    description: `Run AgentCenter on your own server. Docker image + activation key + docker-compose. From $${SELFHOSTING_PRICING.monthly}/month.`,
    creator: "@dharmikjagodana",
    site: "@dharmikjagodana",
    images: [ogImage("self-hosting")],
  },
};

const faqs = [
  {
    question: "What is the activation key for self-hosted AgentCenter?",
    answer:
      "The activation key is a unique license key tied to your subscription. After you run docker-compose up and open the app in your browser for the first time, you'll be prompted to enter it on the activation page. Once entered, the app validates it against our licensing server and starts normally. No environment variables, no config files — just paste it in the web UI.",
  },
  {
    question: "Where can I run the self-hosted AgentCenter Docker image?",
    answer:
      "Anywhere Docker runs. A $6/mo Hetzner VPS, a $20/mo DigitalOcean droplet, your own rack, AWS EC2, GCP VM, Azure — doesn't matter. We'll provide the docker-compose.yml and you handle the host. Minimum spec: 1 vCPU, 1GB RAM.",
  },
  {
    question: "Is there a free trial for self-hosting?",
    answer:
      "No free trial for self-hosting. The setup has real complexity (Docker, server, environment config) that makes a trial impractical. If you're unsure, start with the cloud version from $14/month — same features, no setup required. You can switch to self-hosting later.",
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
    answer: `Self-hosted runs entirely on your own infrastructure — you control the server, the data, and the environment. The cloud version (from $14/month) is hosted by us on Hetzner Cloud, requires no setup, and is ready in minutes. Self-hosting costs $${SELFHOSTING_PRICING.monthly}/month and gives you full data sovereignty.`,
  },
  {
    question: "What are the server requirements for self-hosted AgentCenter?",
    answer:
      "Minimum: 1 vCPU, 1 GB RAM, 10 GB disk, Docker 20.10+, docker-compose 2.0+. Works on Linux (Ubuntu 22.04 LTS recommended), macOS, or Windows with WSL2. Recommended: 2 vCPU, 2 GB RAM, 20 GB SSD.",
  },
  {
    question: "Can I get a refund on a self-hosting license?",
    answer:
      "We don't offer refunds on self-hosting licenses. If you hit a setup issue, email us — we'll help you get it running. If something is genuinely broken on our end, we'll make it right.",
  },
];

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Self-Hosted AI Agent Dashboard — Run AgentCenter on Your Own Server",
    description: `Self-host the AgentCenter AI agent management dashboard on your own VM, cloud, or bare metal. Full Docker image, unique activation key, and docker-compose included. $${SELFHOSTING_PRICING.monthly}/month.`,
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    about: { "@id": `${PAGE_URL}#software` },
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: "en-US",
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  };
}

function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${PAGE_URL}#software`,
    name: "AgentCenter Self-Hosted",
    alternateName: ["AgentCenter On-Premise", "AgentCenter Docker Edition"],
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Agent Management",
    operatingSystem: "Linux, macOS, Windows (via Docker)",
    url: PAGE_URL,
    description:
      "Self-hosted AI agent management dashboard. Full Docker image with activation key and docker-compose file. Run on your own VM, cloud, or bare metal server.",
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
    softwareRequirements: "Docker 20.10+, docker-compose 2.0+, 1 vCPU, 1 GB RAM minimum",
    offers: [
      {
        "@type": "Offer",
        "@id": `${PAGE_URL}#offer-monthly`,
        name: "Monthly Self-Hosting License",
        price: String(SELFHOSTING_PRICING.monthly),
        priceCurrency: SELFHOSTING_PRICING.currency,
        priceValidUntil: PRICE_VALID_UNTIL,
        availability: "https://schema.org/InStock",
        url: PAGE_URL,
        description:
          "Monthly self-hosting license for AgentCenter. Includes Docker image, activation key, and docker-compose file. Cancel anytime.",
      },
      {
        "@type": "Offer",
        "@id": `${PAGE_URL}#offer-yearly`,
        name: "Annual Self-Hosting License",
        price: String(SELFHOSTING_PRICING.yearly),
        priceCurrency: SELFHOSTING_PRICING.currency,
        priceValidUntil: PRICE_VALID_UNTIL,
        availability: "https://schema.org/InStock",
        url: PAGE_URL,
        description: `Annual self-hosting license for AgentCenter. ${SELFHOSTING_PRICING.yearlyDiscount}% discount vs monthly. Includes Docker image, activation key, and docker-compose file.`,
      },
    ],
    featureList: [
      "Full AgentCenter AI agent dashboard",
      "Up to 50 AI agents (cloud) or unlimited (self-hosted)",
      "Kanban task management for AI agents",
      "Real-time agent status monitoring",
      "Lead/Orchestrator verification",
      "Deliverable review and tracking",
      "Project workspaces",
      "Docker image with docker-compose",
      "Unique activation key per license",
      "All future updates included",
      "Data stays on your own infrastructure",
    ],
  };
}

function buildHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Deploy AgentCenter with Docker",
    description:
      "Deploy the self-hosted AgentCenter AI agent dashboard on your own server using Docker and docker-compose in three steps.",
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: SELFHOSTING_PRICING.currency,
      value: String(SELFHOSTING_PRICING.monthly),
    },
    supply: [
      { "@type": "HowToSupply", name: "AgentCenter self-hosting license" },
      { "@type": "HowToSupply", name: "Activation key (received by email after purchase)" },
      { "@type": "HowToSupply", name: "Server or VM with Docker installed" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Docker 20.10+" },
      { "@type": "HowToTool", name: "docker-compose 2.0+" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Purchase a Self-Hosting License",
        text: "Subscribe to a monthly or annual AgentCenter self-hosting license. You will receive your unique activation key by email within 24 hours.",
        url: `${PAGE_URL}#pricing`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Pull the Docker Image",
        text: "We will send you the Docker image tag and a ready-to-use docker-compose.yml. Pull the image on your server: docker-compose pull",
        url: `${PAGE_URL}#how-to-deploy`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Set Your Activation Key and Start",
        text: "Run docker-compose up -d, open the app in your browser, and enter your activation key on the activation page when prompted. AgentCenter validates it and starts.",
        url: `${PAGE_URL}#how-to-deploy`,
      },
    ],
  };
}

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

const comparisonRows = [
  {
    feature: "Monthly price",
    cloud: "from $14/month",
    self: `$${SELFHOSTING_PRICING.monthly}/month`,
  },
  { feature: "Annual price", cloud: "from $140/year", self: `$${SELFHOSTING_PRICING.yearly}/year` },
  { feature: "Setup time", cloud: "Instant", self: "~15 min (Docker)" },
  { feature: "Data location", cloud: "Hetzner Cloud (EU)", self: "Your infrastructure" },
  { feature: "Data sovereignty", cloud: "Our servers", self: "100% your control" },
  { feature: "Infrastructure maintenance", cloud: "We handle it", self: "You handle it" },
  { feature: "Compliance / air-gap support", cloud: "Limited", self: "Yes" },
  { feature: "All features included", cloud: "Yes", self: "Yes" },
  { feature: "Updates", cloud: "Automatic", self: "docker-compose pull" },
  { feature: "Commitment", cloud: "Cancel anytime", self: "Monthly or yearly" },
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

const benefits = [
  {
    icon: Shield,
    title: "Agent Data Never Leaves Your Network",
    body: "Your agents process real work — internal documents, customer data, proprietary business logic. On the cloud version, that data passes through our servers. Self-hosted means none of it leaves your infrastructure. Not the task descriptions, not the deliverables, not the message threads.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR and Compliance Get Simpler",
    body: "When you self-host, you're both the Data Processor and the Data Controller. There are no sub-processors to document, no cross-border transfers to justify, no DPA to negotiate. Healthcare, finance, legal — regulated industries can deploy without the usual compliance overhead.",
  },
  {
    icon: Activity,
    title: "Connect Agents to Private Systems",
    body: "Cloud dashboards can only reach what's on the internet. Self-hosted AgentCenter runs inside your network — agents can connect to internal databases, VPN-protected APIs, legacy systems, and private infrastructure without exposing a single endpoint to the outside world.",
  },
  {
    icon: DollarSign,
    title: "Fixed Cost, No Matter How Many Agents",
    body: "$99/month whether you run 3 agents or 30. No per-agent pricing, no execution caps, no surprise overage bills mid-sprint. As your agent team grows, your license cost doesn't move.",
  },
  {
    icon: GitBranch,
    title: "You Control the Update Schedule",
    body: "Pull the new Docker image when you're ready — not when we push it. Test updates in staging before rolling to production. If a release breaks something, roll back in one command. Your workflows run on your timeline.",
  },
  {
    icon: Monitor,
    title: "No Vendor Lock-In",
    body: "Your data lives on your server. If you cancel, it stays there. No export fees, no migration windows, no contacting sales to retrieve your own data. Everything was yours from day one.",
  },
] as const;

const systemRequirements = [
  { component: "Docker", minimum: "20.10+", recommended: "Latest stable" },
  { component: "docker-compose", minimum: "2.0+", recommended: "Latest stable" },
  { component: "CPU", minimum: "1 vCPU", recommended: "2 vCPU" },
  { component: "RAM", minimum: "1 GB", recommended: "2 GB" },
  { component: "Disk", minimum: "10 GB", recommended: "20 GB SSD" },
  { component: "OS", minimum: "Linux, macOS, Windows (WSL2)", recommended: "Ubuntu 22.04 LTS" },
];

export default function SelfHostingPage() {
  return (
    <>
      <JsonLdScript data={buildWebPageSchema()} scriptKey="self-hosting-webpage" />
      <JsonLdScript data={buildProductSchema()} scriptKey="self-hosting-product" />
      <JsonLdScript data={buildHowToSchema()} scriptKey="self-hosting-howto" />
      <JsonLdScript data={buildFaqSchema()} scriptKey="self-hosting-faq" />
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
                >
                  See Pricing
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold rounded-xl transition-colors"
                >
                  Compare with Cloud Plan
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
                {[
                  "Docker image + docker-compose",
                  "Activate via web UI — no env vars",
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

        {/* Why self-host */}
        <section className="py-20 px-4 bg-neutral-900 border-b border-neutral-800">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                  Why Self-Host Your AI Agent Dashboard?
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  AI agents touch sensitive data. For teams where that matters, the cloud version
                  isn&apos;t the right answer.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    className="p-6 rounded-xl bg-neutral-800/40 border border-neutral-700 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary-500/10 border border-primary-500/20 flex-shrink-0">
                      <b.icon size={22} className="text-primary-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-100 mb-2">{b.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{b.body}</p>
                    </div>
                  </div>
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
                  See cloud plans from $14/month
                </Link>{" "}
                — same features, zero setup.
              </p>
            </div>
          </Container>
        </section>

        {/* Cloud vs Self-Hosted comparison */}
        <section id="compare" className="py-20 px-4 bg-neutral-900 border-t border-neutral-800">
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
                <table
                  className="w-full text-sm"
                  aria-label="AgentCenter cloud vs self-hosted comparison"
                >
                  <thead>
                    <tr className="border-b border-neutral-700 bg-neutral-800/60">
                      <th scope="col" className="text-left px-5 py-4 text-neutral-400 font-medium">
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="text-center px-5 py-4 text-neutral-300 font-semibold"
                      >
                        Cloud
                      </th>
                      <th
                        scope="col"
                        className="text-center px-5 py-4 text-primary-400 font-semibold"
                      >
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

        {/* System requirements */}
        <section
          id="system-requirements"
          className="py-20 px-4 bg-neutral-950 border-t border-neutral-800"
        >
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-4">System Requirements</h2>
                <p className="text-neutral-400">
                  AgentCenter runs as a Docker container. If your server runs Docker, it runs
                  AgentCenter.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-700 overflow-hidden mb-8">
                <table
                  className="w-full text-sm"
                  aria-label="AgentCenter self-hosting system requirements"
                >
                  <thead>
                    <tr className="border-b border-neutral-700 bg-neutral-800/60">
                      <th scope="col" className="text-left px-5 py-4 text-neutral-400 font-medium">
                        Component
                      </th>
                      <th
                        scope="col"
                        className="text-center px-5 py-4 text-neutral-300 font-semibold"
                      >
                        Minimum
                      </th>
                      <th
                        scope="col"
                        className="text-center px-5 py-4 text-primary-400 font-semibold"
                      >
                        Recommended
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemRequirements.map((row, idx) => (
                      <tr
                        key={row.component}
                        className={`border-b border-neutral-800 last:border-0 ${idx % 2 === 0 ? "bg-neutral-900/40" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-neutral-300 font-medium">
                          {row.component}
                        </td>
                        <td className="px-5 py-3.5 text-center text-neutral-400">{row.minimum}</td>
                        <td className="px-5 py-3.5 text-center text-neutral-200">
                          {row.recommended}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-sm text-neutral-500">
                Need help sizing your server?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                >
                  Email us
                </a>
                .
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 px-4 bg-neutral-900 border-t border-neutral-800">
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
                href={`mailto:${CONTACT_EMAIL}`}
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

        {/* Final CTA */}
        <section className="py-24 px-4 bg-neutral-950 border-t border-neutral-800">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
                Ready to Run AgentCenter on Your Own Server?
              </h2>
              <p className="text-lg text-neutral-400 mb-10">
                One Docker image. Your infrastructure. ${SELFHOSTING_PRICING.monthly}/month — or
                save {SELFHOSTING_PRICING.yearlyDiscount}% with an annual license.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
                >
                  Get Your License
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold rounded-xl transition-colors"
                >
                  Try the Cloud Plan Instead
                </Link>
              </div>
              <p className="text-sm text-neutral-500 mt-6">
                Cancel anytime. Activation key delivered within 24 hours.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
