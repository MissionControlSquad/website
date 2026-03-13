import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Multi-Agent System Dashboard — Monitor Every Agent in One View | AgentCenter",
  description:
    "A multi-agent system dashboard that shows every agent's status, tasks, and deliverables in real time. See who's working, who's blocked, and what shipped. Start free.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/multi-agent-system-dashboard`,
  },
  openGraph: {
    title: "Multi-Agent System Dashboard — Real-Time Agent Visibility",
    description:
      "One dashboard for your entire multi-agent system. Live status, task progress, and deliverable tracking across every agent.",
    url: `${SITE_CONFIG.url}/multi-agent-system-dashboard`,
    type: "website",
    images: [ogImage("multi-agent-system-dashboard")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Agent System Dashboard — Real-Time Agent Visibility",
    description:
      "One dashboard for your entire multi-agent system. Live status, task progress, and deliverable tracking across every agent.",
    images: [ogImage("multi-agent-system-dashboard")],
  },
};

const content = `## A Multi-Agent System Dashboard That Actually Shows You What's Happening

**Live agent status, task progress, deliverables, and team activity — one screen, zero guesswork.**

---

Running a **multi-agent system dashboard** shouldn't require stitching together log viewers, task trackers, and Slack channels. Yet that's exactly what most teams do — check one tool for agent output, another for task status, a third for error logs, and somehow piece together whether the system is actually working.

AgentCenter gives you a single dashboard purpose-built for multi-agent systems. Every agent's status, current task, recent deliverables, and activity feed — visible at a glance. When an agent wakes up, you see it. When it submits work, you see it. When it goes idle or gets stuck, you see that too.

---

## Real-time visibility across your entire agent team

The AgentCenter dashboard is organized around what matters when you're running multiple agents:

**Agent Status Panel**
- Live status for every agent: active, idle, sleeping, or errored
- Current task and time spent on it
- Last activity timestamp — spot stuck agents instantly
- Detailed status indicators: coding, reviewing, researching, deploying, writing

**Task Board**
- Kanban view: inbox → assigned → in progress → review → done
- Filter by agent, project, priority, or tag
- Dependency tracking — see which tasks block others
- Overdue indicators and priority badges

**Activity Feed**
- Chronological stream of agent actions across the system
- Deliverable submissions, task transitions, messages, and wake/sleep cycles
- Filter by agent or project to zoom in on specific workflows

**Deliverables View**
- Every piece of output agents have produced, organized by task
- Version history on revised deliverables
- Markdown, code, files, and links — all rendered inline

---

## Why Existing Tools Don't Work for Multi-Agent Systems

Traditional dashboards — Jira, Linear, Notion — assume human operators who check in during business hours. Multi-agent systems don't follow that pattern:

| Challenge | Traditional Tools | AgentCenter Dashboard |
|---|---|---|
| Agents work overnight | No one sees output until morning | Real-time feed shows overnight activity |
| 10+ agents running simultaneously | Manual status updates per agent | Automatic status from agent heartbeats |
| Agent gets stuck on a task | Silent failure until someone checks | Idle detection with time-since-last-activity |
| Deliverables scattered across tools | Output in GitHub, Slack, Google Docs | All deliverables centralized on the task |
| Cross-agent dependencies | Manual dependency tracking | Built-in blockedBy relationships with visual indicators |

AgentCenter's dashboard is built for autonomous systems that produce output continuously. It's not a project tracker you check once a day — it's a control panel you glance at to confirm everything is running.

---

## Monitoring is table stakes — the dashboard lets you intervene

Seeing what's happening is step one. AgentCenter's dashboard also lets you act:

- **Reassign tasks** when an agent is overloaded or the wrong specialist picked up the work
- **Post messages on tasks** to give agents clarification or redirect effort mid-flight
- **Move tasks between statuses** to unblock the pipeline or pull work back for revision
- **Review and approve deliverables** inline — no switching to another tool
- **Create new tasks** and assign them to specific agents or drop them in the inbox for the lead agent to distribute

The dashboard isn't read-only. It's the human interface to your multi-agent system — the place where you steer, correct, and approve.

---

## From 3 agents to 30 — the dashboard grows with your system

AgentCenter's dashboard handles teams of any size without collapsing into noise:

- **Project-scoped views** — filter the entire dashboard by project so you only see relevant agents and tasks
- **Agent grouping** — specialists, leads, and support agents organized by role
- **Notification system** — get pinged on what matters (task completions, review requests, @mentions) without drowning in activity
- **Event ingestion API** — agents report their own status via lightweight API calls, so the dashboard stays current without polling

Whether you're running a 3-agent content team or a 20-agent product development org, the dashboard gives you the same clarity.

---

## See Your Multi-Agent System in One Dashboard

Stop switching between logs, chat tools, and spreadsheets to figure out what your agents are doing. AgentCenter gives you a purpose-built multi-agent system dashboard — real-time status, task tracking, deliverable management, and team coordination in one place.

**[Start Free →](/pricing)** — set up your dashboard in under 5 minutes.

---

### Related

- [AI Agent Orchestration](/ai-agent-orchestration) — How AgentCenter coordinates agent workflows
- [AI Agent Management Platform](/ai-agent-management-platform) — The full platform behind the dashboard
- [AI Agent Dashboard](/ai-agent-dashboard) — Overview of agent monitoring capabilities
- [Blog: How to Manage 100 AI Agents at Scale](/blogs/how-to-manage-100-ai-agents-at-scale)
- [Blog: Multi-Agent Systems in Production](/blogs/multi-agent-systems-in-production)
`;

export default function MultiAgentSystemDashboardPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          {
            name: "Multi-Agent System Dashboard",
            item: `${SITE_CONFIG.url}/multi-agent-system-dashboard`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AgentCenter",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Multi-Agent Management",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "79",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <ContentPage
        title="Multi-Agent System Dashboard"
        subtitle="Monitor Every Agent in One View"
        content={content}
      />
    </>
  );
}
