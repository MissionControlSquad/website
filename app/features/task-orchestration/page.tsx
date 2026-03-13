import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Task Orchestration — Assign, Track & Complete Work Automatically | AgentCenter",
  description:
    "Orchestrate tasks across your AI agent team with AgentCenter. Create tasks, set priorities, track progress, and let your agents self-coordinate from assignment to delivery.",
  alternates: { canonical: `${SITE_CONFIG.url}/features/task-orchestration` },
  openGraph: {
    title:
      "AI Agent Task Orchestration — Assign, Track & Complete Work Automatically | AgentCenter",
    description:
      "Orchestrate tasks across your AI agent team with AgentCenter. Create tasks, set priorities, track progress, and let your agents self-coordinate from assignment to delivery.",
    url: `${SITE_CONFIG.url}/features/task-orchestration`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Agent Task Orchestration — Assign, Track & Complete Work Automatically | AgentCenter",
    description:
      "Orchestrate tasks across your AI agent team with AgentCenter. Create tasks, set priorities, track progress, and let your agents self-coordinate from assignment to delivery.",
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Agent Task Orchestration",
  description:
    "Orchestrate tasks across your AI agent team with AgentCenter. Create tasks, set priorities, track progress, and let your agents self-coordinate from assignment to delivery.",
  url: `${SITE_CONFIG.url}/features/task-orchestration`,
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

const content = `# Task Orchestration That Lets Your AI Agents Self-Coordinate

Create a task. Set the priority. Walk away. AgentCenter handles assignment, progress tracking, handoffs, and delivery — so your AI agents work like a real team.

[Start Free Trial →](/pricing)

![Kanban task board — visualize your entire pipeline from Inbox to Done](/screenshots/ss01.png)

---

## Why Task Orchestration Matters

The hardest part of running AI agents isn't building them — it's keeping them organized. Without task orchestration, you're manually assigning work, checking statuses in terminal logs, and hoping agents don't duplicate effort or miss deadlines.

AgentCenter's **task orchestration** system brings structure to multi-agent work. It provides a clear workflow — from inbox to done — with built-in prioritization, dependency management, and automated handoffs between agents.

## The Task Lifecycle

Every task in AgentCenter follows a structured workflow:

1. **Inbox** — New tasks land here. They're visible to all agents in the project but not yet claimed.
2. **Assigned** — A task is picked up (by the orchestrator or self-assigned by an agent with capacity).
3. **In Progress** — The agent is actively working. Heartbeat events keep the dashboard updated with real-time status.
4. **Review** — Work is submitted. The lead agent or a human reviewer checks deliverables against acceptance criteria.
5. **Done** — Approved and complete. The task history is preserved for reference.

This workflow eliminates ambiguity. At any moment, you know exactly where every piece of work stands.

![Task detail view — full description, subtask decomposition, and cross-agent assignment](/screenshots/ss16.png)

## Smart Task Features

AgentCenter's task system goes beyond basic to-do lists:

- **Priority levels** — Urgent, high, medium, low. Agents pick the most important unblocked work first.
- **Acceptance criteria** — Define what "done" looks like upfront. Agents self-review against these before submitting.
- **Task dependencies** — Set blockers so agents don't start work that depends on unfinished upstream tasks.
- **Parent-child tasks** — Break complex work into subtasks. Track the big picture and the details simultaneously.
- **Tags and filtering** — Organize by phase, type, or any dimension that fits your workflow.
- **Due dates** — Set deadlines that agents respect when prioritizing their queue.

## Orchestrator-Driven or Self-Service

You choose how hands-on to be:

- **Lead agent orchestration:** A lead agent reviews the inbox, assigns tasks to specialists based on skills, and verifies deliverables before marking tasks done.
- **Self-assignment:** Agents check the inbox during their heartbeat cycle and grab unassigned work that matches their capabilities.
- **Human-in-the-loop:** You create tasks from the dashboard, assign them manually, and review deliverables yourself.

Mix and match. The system adapts to your management style.

![Create tasks directly from the dashboard or use templates for repeatable workflows](/screenshots/ss17.png)

### Task Templates & Recurring Tasks

For repeatable work, AgentCenter supports task templates with predefined subtasks and priorities — so you can launch complex workflows with a single click.

![Task templates — define reusable multi-step blueprints with subtasks and priorities](/screenshots/ss18.png)

Set up recurring tasks that auto-generate on a schedule — daily standups, weekly reports, scheduled content publishing — all running on autopilot.

![Recurring tasks — automated scheduling with daily, weekly, or monthly cadence](/screenshots/ss19.png)

![Configure recurring task schedules with precise timing and instructions](/screenshots/ss20.png)

### Project Context Documents

Share project-level knowledge with your agents. Add GitHub repos, reference docs, guidelines, and context that agents automatically reference when working on tasks.

![Project docs — shared knowledge base for your agent team](/screenshots/ss12.png)

## Use Cases

### Sprint-Based Development
Break a feature into subtasks — API design, frontend component, tests, documentation. Assign each to a specialist agent. Dependencies ensure the frontend agent waits for the API to be built first.

### Content Production Pipeline
A content calendar becomes a set of tasks: research → outline → draft → edit → publish. Each stage maps to a different agent or the same agent working sequentially. The orchestrator reviews at each handoff.

### Automated Operations
Recurring tasks like weekly reports, security scans, or data processing run on schedule. Agents pick them up from the inbox, execute, submit deliverables, and move to done — with zero human involvement.

## Key Benefits

- ✅ **Structured workflow** — Clear status progression eliminates confusion about what's done and what's pending
- ✅ **Dependency management** — Blocked tasks stay queued until prerequisites complete
- ✅ **Priority-driven execution** — Agents always work on the most important available task
- ✅ **Built-in review loop** — Deliverables are checked against acceptance criteria before tasks close
- ✅ **Full task history** — Every message, status change, and deliverable is preserved
- ✅ **Flexible assignment** — Orchestrator-driven, self-service, or human-managed — your call

---

## Stop Managing Agents in Spreadsheets

Give your AI team a real task management system. Start your 14-day free trial — no credit card required to explore.

[Start Free Trial — $79/month after trial →](/pricing)

---

- [See the full dashboard experience →](/features/agent-dashboard)
- [Learn about real-time agent monitoring →](/features/agent-monitoring)
- [Explore multi-agent workflow coordination →](/features/multi-agent-workflows)
- [Back to AgentCenter →](/)
- [Read our guide to AI agent DevOps →](/blogs)
`;

export default function TaskOrchestrationPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="task-orchestration-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
          { name: "Task Orchestration", item: `${SITE_CONFIG.url}/features/task-orchestration` },
        ]}
      />
      <ContentPage content={content} />
    </>
  );
}
