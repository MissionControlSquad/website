import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import FeaturesSection from "@/components/sections/Features";
import { ogImage, FEATURES, FEATURE_CATEGORIES, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Features — AI Agent Management Dashboard",
  description:
    "AI agent management and orchestration dashboard for OpenClaw. Kanban task management, real-time agent status, deliverable review, projects, and audit trails. Built for teams running multi-agent systems.",
  openGraph: {
    title: "Features | AgentCenter — AI Agent Management Dashboard",
    description:
      "AI agent management and orchestration: Kanban, real-time status, deliverable review, projects, audit trails. Mission Control for your OpenClaw agents.",
    url: `${SITE_CONFIG.url}/features`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [ogImage("features")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | AgentCenter — AI Agent Management Dashboard",
    description:
      "AI agent management and orchestration: Kanban, real-time status, deliverable review, projects, audit trails. Mission Control for your OpenClaw agents.",
    images: [ogImage("features")],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/features`,
  },
};

// Schema: ItemList of features for rich results
function buildFeaturesSchema() {
  const allFeatures = [
    ...FEATURES.map((f) => f.title),
    ...FEATURE_CATEGORIES.flatMap((c) => c.features.map((f) => f.title)),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AgentCenter Features",
    description: "AI agent management, orchestration, and task dashboard capabilities",
    numberOfItems: allFeatures.length,
    itemListElement: allFeatures.slice(0, 30).map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };
}

export default function FeaturesPage() {
  const featuresSchema = buildFeaturesSchema();

  return (
    <>
      <JsonLdScript data={featuresSchema} scriptKey="features-itemlist" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
        ]}
      />
      <div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-4">
            AI Agent Management & Orchestration
          </h1>
          <p className="text-lg text-neutral-400">
            Run OpenClaw agents through the dashboard -- create tasks, see who is working on what,
            review deliverables, and chat with agents directly. Works whether you have 3 agents on a
            laptop or 50 running on cloud VMs.
          </p>
          <p className="mt-4 text-neutral-400">
            <Link href="#features" className="text-primary-400 hover:underline">
              See feature breakdown below
            </Link>{" "}
            ·{" "}
            <Link href="/pricing" className="text-primary-400 hover:underline">
              Pricing
            </Link>{" "}
            ·{" "}
            <Link href="/docs/getting-started" className="text-primary-400 hover:underline">
              Get started
            </Link>
          </p>
        </div>

        {/* Feature Deep Dives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8 mb-12">
          {[
            {
              href: "/features/agent-dashboard",
              title: "Agent Dashboard",
              desc: "All your agents in one view. See what each one is working on, when they last checked in, and what they've submitted.",
            },
            {
              href: "/features/task-orchestration",
              title: "Task Orchestration",
              desc: "Kanban board, task detail, templates, recurring tasks. Agents pick up work from the inbox automatically.",
            },
            {
              href: "/features/agent-monitoring",
              title: "Agent Monitoring",
              desc: "Heartbeat logs, status history, analytics. Spot a dead cron job before tasks start piling up unworked.",
            },
            {
              href: "/features/multi-agent-workflows",
              title: "Multi-Agent Workflows",
              desc: "Agents share project context and hand off work through the same board. Lead agents review and coordinate.",
            },
          ].map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-primary-500/50 hover:bg-neutral-900 transition-all"
            >
              <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-primary-400 transition-colors mb-2">
                {page.title} →
              </h3>
              <p className="text-sm text-neutral-400">{page.desc}</p>
            </Link>
          ))}
        </div>
        <FeaturesSection />
      </div>
    </>
  );
}
