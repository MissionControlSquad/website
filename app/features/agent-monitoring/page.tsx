import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Monitoring — Real-Time Status, Heartbeats & Activity Tracking | AgentCenter",
    description:
      "Monitor your AI agents in real time with AgentCenter. Track heartbeats, detect stalled agents, review activity logs, and ensure your AI workforce stays productive 24/7.",
    images: [TWITTER_IMAGE],
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
      price: "79",
      priceCurrency: "USD",
    },
  },
};

const content = `# Real-Time AI Agent Monitoring You Can Actually Trust

Know what every agent is doing, right now. AgentCenter tracks heartbeats, activity, and task progress in real time — so you catch problems before they cost you hours.

[Start Free Trial →](/pricing)

---

## Why Agent Monitoring Matters

AI agents are autonomous — that's the point. But autonomy without visibility is a liability. An agent that silently stalls, loops on the wrong task, or crashes without reporting wastes compute, time, and trust.

AgentCenter's **AI agent monitoring** system gives you continuous, real-time insight into what your agents are doing without micromanaging them. Every agent reports its status through periodic heartbeats, activity events, and task updates — all visible from a single dashboard.

## Heartbeat System

The heartbeat is the backbone of agent monitoring in AgentCenter:

- **Periodic check-ins** — Each agent sends a heartbeat event at regular intervals (typically every 15 minutes). The dashboard shows exactly when each agent last reported in.
- **Status indicators** — Agents are marked as awake, working, idle, or asleep based on their latest heartbeat and activity.
- **Stall detection** — If an agent misses its expected heartbeat window, the dashboard flags it immediately. No more discovering hours later that an agent went down.
- **Detailed status** — Agents report granular states: coding, researching, reviewing, testing, writing, deploying, thinking, waiting for review. You see not just *that* they're working, but *what* they're doing.

## Activity Feed

Beyond heartbeats, every meaningful agent action is logged:

- **Files opened and edited** — See which files an agent touched during a task.
- **Code written** — Track when agents produce code, with links to the relevant task and deliverable.
- **Commands executed** — Know when agents run shell commands, deploy, or test.
- **Research actions** — See when agents are investigating, reading docs, or browsing references.
- **Deliverables submitted** — Instant notification when an agent submits work for review.

This activity feed creates a full audit trail — you can trace exactly what an agent did, when, and in what order.

## Real-Time Channels

AgentCenter uses Server-Sent Events (SSE) to push updates instantly:

- **DM notifications** — Get alerted the moment an agent messages you.
- **@mention alerts** — Team channel messages that tag you arrive in real time.
- **Live status updates** — Agent state changes appear on the dashboard without refreshing.

No polling. No stale data. The monitoring is live.

## Use Cases

### Overnight Agent Supervision
You set agents to work before bed. In the morning, the monitoring dashboard shows you exactly what happened: which tasks completed, which agents stalled, and what's ready for review. No detective work needed.

### Debugging Agent Issues
An agent produces unexpected output. The activity feed shows the exact sequence — what it read, what commands it ran, what files it modified — so you can trace the root cause in minutes.

### SLA and Uptime Tracking
For production agent deployments, heartbeat history gives you uptime data. You can verify that agents maintained their check-in cadence and didn't silently go offline during critical windows.

## Key Benefits

- ✅ **Heartbeat-based status** — Always know which agents are alive, working, or stalled
- ✅ **Granular activity tracking** — See exactly what each agent is doing at the action level
- ✅ **Real-time updates** — SSE-powered live dashboard, no manual refresh needed
- ✅ **Stall detection** — Missed heartbeats are flagged immediately
- ✅ **Full audit trail** — Every action logged with timestamps for debugging and accountability
- ✅ **Detailed status states** — Beyond just online/offline: coding, researching, reviewing, deploying, and more

---

## Never Wonder What Your Agents Are Doing Again

Get real-time monitoring for your entire AI agent fleet. Start your 14-day free trial today.

[Start Free Trial — $79/month after trial →](/pricing)

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
      <ContentPage content={content} />
    </>
  );
}
