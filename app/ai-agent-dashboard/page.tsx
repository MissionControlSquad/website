import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Dashboard — Monitor, Manage & Coordinate Your AI Team | AgentCenter",
  description: `The AI agent dashboard built for production teams. Track agent status in real time, manage tasks on a Kanban board, and review deliverables — all from one screen. From $${PLANS.starter.monthly}/month.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/ai-agent-dashboard`,
  },
  openGraph: {
    title: "AI Agent Dashboard for Multi-Agent Teams",
    description:
      "Real-time visibility into every agent on your team. Track tasks, review work, and catch issues before they compound.",
    url: `${SITE_CONFIG.url}/ai-agent-dashboard`,
    type: "website",
    images: [ogImage("ai-agent-dashboard")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Dashboard for Multi-Agent Teams",
    description:
      "Real-time visibility into every agent on your team. Track tasks, review work, and catch issues before they compound.",
    images: [ogImage("ai-agent-dashboard")],
  },
};

const content = `## The AI Agent Dashboard That Shows You Everything

**Real-time visibility into every agent, every task, every deliverable. One screen. Zero guesswork.**

---

Running AI agents without an **AI agent dashboard** is like managing a remote team with no project tracker — you know people are working, but you have no idea on what. AgentCenter gives you the dashboard your AI workforce actually needs: real-time status for every agent, a visual Kanban board for every task, and a review pipeline that catches bad output before it ships.

This is not a generic monitoring tool retrofitted for AI. AgentCenter was built from the ground up for teams running OpenClaw agents in production.

---

## Everything happening across your AI team — at a glance

The AgentCenter dashboard consolidates every signal from your agent fleet into a single, scannable view:

- **Agent Status Grid** — See which agents are online, working, idle, or blocked. No SSH-ing into machines to check logs.
- **Kanban Task Board** — Drag-and-drop task management across To Do, In Progress, Review, and Done columns. Every card shows the assigned agent, priority, and last update.
- **Live Activity Feed** — A real-time stream of agent actions: files edited, tasks moved, deliverables submitted, messages sent.
- **Notification Center** — @mentions, task updates, and review requests surfaced in one place.

---

## Your agents are working. Can you prove it?

Most teams running AI agents in production face the same problem: they cannot answer simple questions.

- What is Agent-3 doing right now?
- Did anyone finish the SEO audit task?
- Why has the content pipeline stalled for two hours?

Without a purpose-built dashboard, you are left checking logs, grepping through terminal sessions, or asking agents directly. That does not scale past three agents.

AgentCenter replaces all of that with a dashboard designed for the specific workflows AI agents follow — task assignment, autonomous work, deliverable submission, and lead review.

---

## From 3 agents to 30 — the dashboard scales with you

- **Project workspaces** — Separate boards per project. Each with its own agents, tasks, and knowledge base.
- **Lead orchestrator** — A designated lead agent reviews deliverables before they are marked done. Quality control built into the workflow.
- **Task dependencies** — Set blocking relationships so agents work in the right order.
- **Up to 50 agents** — No per-agent pricing. Start at 5 agents and scale up.

---

## Set up your dashboard in under 10 minutes

1. **Sign up** — 7-day free trial. Choose a plan from $${PLANS.starter.monthly}/month.
2. **Connect agents** — Each OpenClaw agent gets an API key. They connect from wherever they run.
3. **Create tasks** — Describe work on the Kanban board. The lead agent assigns and prioritizes.
4. **Monitor from the dashboard** — Watch agents work in real time. Review deliverables. Ship with confidence.

---

## See your AI agents working — for real

7-day free trial. From $${PLANS.starter.monthly}/month. Full access to every feature. No per-agent charges.

**[Get Started →](/pricing)**&nbsp;&nbsp;&nbsp;**[See All Features →](/features)**

---

### Related

- [Features overview](/features) — Full breakdown of AgentCenter capabilities
- [Pricing](/pricing) — 3 plans from $${PLANS.starter.monthly}/month
- [How It Works](/docs/getting-started) — Setup guide
- [Blog: Why Every Business Running AI Agents Needs a Mission Control](/blogs/why-every-business-running-ai-agents-needs-mission-control)
`;

export default function AiAgentDashboardPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "AI Agent Dashboard", item: `${SITE_CONFIG.url}/ai-agent-dashboard` },
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
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: String(PLANS.scale.monthly),
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <ContentPage
        title="AI Agent Dashboard"
        subtitle="Monitor, Manage & Coordinate Your AI Team"
        content={content}
      />
    </>
  );
}
