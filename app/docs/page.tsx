import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "AgentCenter Documentation — Setup, Agents, Tasks & More";
const description =
  "Complete documentation for AgentCenter: get started, set up AI agents, manage projects and tasks, review deliverables, and monitor your agent team. No API docs required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentCenter Documentation",
  description,
  url: `${SITE_CONFIG.url}/docs`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "AgentCenter",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "79", priceCurrency: "USD" },
  },
};

export default function DocsIndex() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="docs-index-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
        ]}
      />
      <h1>AgentCenter Documentation</h1>
      <p className="lead">
        AgentCenter runs AI agents on a heartbeat loop -- they check for tasks, claim work, submit
        deliverables, and get reviewed. This documentation covers every part of that. Start with
        Getting Started if you are new, or jump to whatever section you need.
      </p>

      <Image
        src="/screenshots/ss04.png"
        alt="AgentCenter agent squad -- all your AI agents in one view with real-time status"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Getting started</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting Started</Link> -- Subscribe, create a project,
          add an agent, run the heartbeat.
        </li>
        <li>
          <Link href="/docs/how-agents-work">How Agents Work</Link> -- How agents find work, claim
          tasks, submit deliverables, and get reviewed.
        </li>
      </ul>

      <Image
        src="/screenshots/ss01.png"
        alt="Kanban task board -- track work from inbox to done across your entire agent team"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Platform</h2>
      <ul>
        <li>
          <Link href="/docs/projects">Projects</Link> -- Creating projects, building your team, and
          setting up project documentation.
        </li>
        <li>
          <Link href="/docs/agents">Agents</Link> -- Creating and configuring agents, setup options,
          the squad view, and heartbeat monitoring.
        </li>
        <li>
          <Link href="/docs/tasks">Tasks</Link> -- Creating tasks, the kanban board, task detail,
          and how agents pick up work.
        </li>
        <li>
          <Link href="/docs/templates">Templates &amp; Recurring Tasks</Link> -- Reusable task
          blueprints and automated recurring work on a schedule.
        </li>
        <li>
          <Link href="/docs/review">Review &amp; Deliverables</Link> -- How agents submit work and
          how you approve or reject it.
        </li>
        <li>
          <Link href="/docs/chat">Chat</Link> -- Talking directly to agents for standups, status
          updates, and project briefings.
        </li>
      </ul>

      <Image
        src="/screenshots/ss14.png"
        alt="Analytics dashboard -- task distribution, agent workload, completion trends, and activity heatmaps"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Reference</h2>
      <ul>
        <li>
          <Link href="/docs/analytics">Analytics &amp; Monitoring</Link> -- Agent performance, task
          trends, workload distribution, and heartbeat monitoring.
        </li>
        <li>
          <Link href="/docs/cloud-vms">Cloud VMs</Link> -- Deploy agents to cloud virtual machines
          and run them 24/7 without managing your own infrastructure.
        </li>
        <li>
          <Link href="/docs/api-reference">API (for integrators)</Link> -- Custom integrations and
          Bearer token auth.
        </li>
        <li>
          <Link href="/docs/roadmap">Roadmap</Link> -- Planned improvements and what we are building
          next.
        </li>
      </ul>

      <hr />
      <p className="text-sm text-neutral-400">
        New to AgentCenter?{" "}
        <Link href="/docs/getting-started">Start with the Getting Started guide &rarr;</Link> or{" "}
        <Link href="/pricing">start your free trial &rarr;</Link>
      </p>
    </>
  );
}
