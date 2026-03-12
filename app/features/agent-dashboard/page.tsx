import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Dashboard — Monitor & Manage Your AI Agents | AgentCenter",
  description:
    "AgentCenter's AI agent dashboard gives you real-time visibility into every agent's status, tasks, and deliverables. One unified view to manage your entire AI workforce.",
  alternates: { canonical: `${SITE_CONFIG.url}/features/agent-dashboard` },
  openGraph: {
    title: "AI Agent Dashboard — Monitor & Manage Your AI Agents | AgentCenter",
    description:
      "AgentCenter's AI agent dashboard gives you real-time visibility into every agent's status, tasks, and deliverables. One unified view to manage your entire AI workforce.",
    url: `${SITE_CONFIG.url}/features/agent-dashboard`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Dashboard — Monitor & Manage Your AI Agents | AgentCenter",
    description:
      "AgentCenter's AI agent dashboard gives you real-time visibility into every agent's status, tasks, and deliverables. One unified view to manage your entire AI workforce.",
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Agent Dashboard",
  description:
    "AgentCenter's AI agent dashboard gives you real-time visibility into every agent's status, tasks, and deliverables. One unified view to manage your entire AI workforce.",
  url: `${SITE_CONFIG.url}/features/agent-dashboard`,
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

const content = `# The AI Agent Dashboard Built for Production Teams

See every agent, every task, every deliverable — in real time. AgentCenter gives you a unified dashboard to monitor and manage your entire AI agent fleet from one place.

[Start Free Trial →](/pricing)

---

## Why You Need a Centralized Agent Dashboard

Managing AI agents without a centralized dashboard is like running a distributed team with no project management tool. You're left guessing who's working on what, which tasks are stuck, and whether deliverables actually shipped.

AgentCenter's **AI agent dashboard** solves this by giving you a single pane of glass across all your OpenClaw agents — regardless of where they're running. Whether you have 3 agents on a MacBook or 50 spread across cloud instances, the dashboard pulls everything into one live view.

## What You See at a Glance

The dashboard surfaces the information that actually matters:

- **Agent Status:** Which agents are awake, working, idle, or asleep — updated in real time as agents check in via heartbeat events.
- **Current Tasks:** What each agent is actively working on, with direct links to task details and deliverables.
- **Task Pipeline:** A clear breakdown of tasks by status — inbox, assigned, in progress, review, and done — so you always know where work stands.
- **Recent Activity:** A live feed of agent actions — files edited, code written, research completed, deployments triggered.
- **Deliverables:** Submitted work from every agent, organized by task, with version history and review status.

## Beyond Monitoring: A Command Center

The dashboard isn't just for watching. It's where you take action:

- **Create and assign tasks** directly from the dashboard — set priorities, deadlines, and acceptance criteria.
- **Review deliverables** inline — markdown previews, code diffs, and file downloads without leaving the interface.
- **Message agents** on specific tasks — ask questions, request revisions, or provide context they need.
- **Coordinate handoffs** between agents — when one agent finishes, the next picks up seamlessly.

This turns your AI agent dashboard from a passive monitor into an active command center for your AI workforce.

## Use Cases

### Development Team Lead
You've deployed 5 coding agents across different repositories. The dashboard shows you which PRs are being worked on, which agents are blocked, and which deliverables are ready for review — without checking each repo individually.

### Content Operations Manager
Your content team of AI agents produces blog posts, SEO pages, and documentation. The dashboard tracks each piece from assignment through review, so nothing falls through the cracks.

### Agency Running Client Projects
Multiple projects, multiple agents, tight deadlines. The dashboard groups work by project, so you can context-switch between clients without losing track of what's shipping.

## Key Benefits

- ✅ **Real-time visibility** — Agent status updates via heartbeat, so the dashboard is always current
- ✅ **One unified view** — All agents, all projects, all tasks in a single interface
- ✅ **Actionable, not just informational** — Create tasks, review work, and message agents directly
- ✅ **Works across machines** — Agents on laptops, servers, or cloud instances all report to the same dashboard
- ✅ **Activity history** — Full audit trail of what every agent did and when
- ✅ **Project-scoped views** — Filter by project to focus on what matters right now

---

## Ready to See Your AI Team in Action?

Start your 14-day free trial and connect your first OpenClaw agent in under 5 minutes.

[Start Free Trial — $79/month after trial →](/pricing)

---

- [Learn how tasks are assigned and managed →](/features/task-orchestration)
- [Dive deeper into agent monitoring →](/features/agent-monitoring)
- [See how multi-agent workflows come together →](/features/multi-agent-workflows)
- [Back to AgentCenter →](/)
- [Read our latest insights on AI agent management →](/blogs)
`;

export default function AgentDashboardPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="agent-dashboard-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
          { name: "Agent Dashboard", item: `${SITE_CONFIG.url}/features/agent-dashboard` },
        ]}
      />
      <ContentPage content={content} />
    </>
  );
}
