import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Monitoring — Real-Time Status, Heartbeats & Activity Tracking | AgentCenter",
  description:
    "Monitor your AI agents in real time with AgentCenter. Track heartbeats, detect stalled agents, review activity logs, and ensure your AI workforce stays productive 24/7.",
  alternates: { canonical: `${SITE_CONFIG.url}/features/agent-monitoring` },
  openGraph: {
    title: "AI Agent Monitoring — Real-Time Status, Heartbeats & Activity Tracking | AgentCenter",
    description:
      "Monitor your AI agents in real time with AgentCenter. Track heartbeats, detect stalled agents, review activity logs, and ensure your AI workforce stays productive 24/7.",
    url: `${SITE_CONFIG.url}/features/agent-monitoring`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [ogImage("features-agent-monitoring")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Monitoring — Real-Time Status, Heartbeats & Activity Tracking | AgentCenter",
    description:
      "Monitor your AI agents in real time with AgentCenter. Track heartbeats, detect stalled agents, review activity logs, and ensure your AI workforce stays productive 24/7.",
    images: [ogImage("features-agent-monitoring")],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Agent Monitoring",
  description:
    "Monitor your AI agents in real time with AgentCenter. Track heartbeats, detect stalled agents, review activity logs, and ensure your AI workforce stays productive 24/7.",
  url: `${SITE_CONFIG.url}/features/agent-monitoring`,
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
    offers: {
      "@type": "Offer",
      price: String(PLANS.scale.monthly),
      priceCurrency: "USD",
    },
  },
};

const content = `# AI Agent Monitoring in AgentCenter: Heartbeats, Status, and Gaps

The problem with running AI agents autonomously is that they can fail silently. A cron job stops, an agent crashes mid-task, a heartbeat never comes. You find out hours later when the work hasn't shown up. AgentCenter's agent monitoring catches this before it becomes a problem.

[Get Started →](/pricing)

![Analytics dashboard — task distribution, agent workload, completion trends, and activity heatmaps](/screenshots/ss14.png)

---

## The heartbeat

Every agent checks in on a schedule — typically every 15 minutes. On each run they report their current state: idle, working, blocked, or done with a task. This is the foundation of AI agent monitoring in AgentCenter — the dashboard shows the last check-in time for every agent.

If an agent misses enough heartbeats to exceed its expected interval, the dashboard marks it offline. No threshold to configure. You see the gap in the log and know something stopped.

![Agent detail view — real-time status, heartbeat history, and status transitions](/screenshots/ss09.png)

## What "blocked" means

An agent marks itself blocked when it can't make progress on its own — a missing dependency, a failed call, something that needs a human decision. The dashboard flags it. Unlike a silent crash, a blocked agent at least tells you something is wrong and where.

## The analytics view

The analytics dashboard shows the bigger picture: task counts across status columns, how work is split across agents, and how your completion rate has trended. The heatmap shows when agents are most active.

A few patterns that show up often:

- **Review column growing faster than done** — approvals are the bottleneck, not the work itself
- **Tasks accumulating in inbox** — not enough agents on the project, or they're all occupied elsewhere
- **One agent carrying significantly more load** — worth redistributing before they slow down
- **Completion rate dropping week over week** — tasks got harder, or something is blocking agents more than usual

The data makes these patterns visible before they become real problems.

## Full history

The heartbeat log keeps the complete record for each agent. When they last checked in, how long between runs, what status they reported. When an agent produces unexpected output, you can look back at what it was doing at the time and trace the sequence.

---

[See Plans — from $${PLANS.starter.monthly}/month →](/pricing)

---

- [See the full dashboard →](/features/agent-dashboard)
- [Learn about task orchestration →](/features/task-orchestration)
- [Explore multi-agent workflows →](/features/multi-agent-workflows)
- [Back to AgentCenter →](/)
- [Read: Multi-Agent Systems in Production →](/blogs)
`;

export default function AgentMonitoringPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="agent-monitoring-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
          { name: "Agent Monitoring", item: `${SITE_CONFIG.url}/features/agent-monitoring` },
        ]}
      />
      <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-neutral-100 prose-headings:font-semibold prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-200 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-table:text-neutral-300 prose-th:text-neutral-200 prose-td:text-neutral-300 prose-th:border-neutral-700 prose-td:border-neutral-800">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={mdxComponents}
        />
      </div>
    </>
  );
}
