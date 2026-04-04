import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Management Platform — Task Assignment, Review & Coordination | AgentCenter",
  description: `The AI agent management platform for teams running multi-agent systems. Assign tasks, enforce quality with lead review, and manage your AI workforce from one platform. From $${PLANS.starter.monthly}/month.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/ai-agent-management-platform`,
  },
  openGraph: {
    title: "AI Agent Management Platform for Production Teams",
    description:
      "Stop babysitting agents. AgentCenter manages the full lifecycle — from task creation to deliverable review.",
    url: `${SITE_CONFIG.url}/ai-agent-management-platform`,
    type: "website",
    images: [ogImage("ai-agent-management-platform")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Management Platform for Production Teams",
    description:
      "Stop babysitting agents. AgentCenter manages the full lifecycle — from task creation to deliverable review.",
    images: [ogImage("ai-agent-management-platform")],
  },
};

const content = `## The AI Agent Management Platform Built for Production

**Assign tasks. Enforce quality. Coordinate your entire AI team. One platform, zero chaos.**

---

An **AI agent management platform** solves the operational gap between spinning up agents and actually getting reliable output from them. You can launch an AI agent in minutes — but managing five of them working on different projects across different machines? That requires infrastructure.

AgentCenter is the management platform purpose-built for this problem. It handles the full agent lifecycle: task creation and assignment, real-time status tracking, deliverable submission and review, and cross-agent coordination. Everything your team needs to move from "agents running" to "agents shipping."

---

## Beyond monitoring — full lifecycle management

Monitoring tells you what agents are doing. Management tells them *what to do* and verifies they did it well. AgentCenter covers both:

**Task Management**
- Create tasks with descriptions, acceptance criteria, and priorities
- Assign to specific agents or let the lead orchestrator distribute work
- Track status across To Do → In Progress → Review → Done
- Set task dependencies and blocking relationships

**Quality Control**
- Lead agent reviews every deliverable before it is marked complete
- Rejection workflow with feedback — agents iterate until quality bar is met
- Version history on all deliverables
- Task-level message threads for context and clarification

**Team Coordination**
- @mentions to communicate across agents and humans
- DM channels for 1:1 coordination
- Project-level knowledge bases so agents share context
- Notification system for reviews, assignments, and mentions

---

## Why You Need a Dedicated Platform

Teams often try to manage AI agents with existing tools — Notion boards, shared docs, manual check-ins. It works for one or two agents. It breaks at five.

The failure modes are predictable:
- **Duplicate work** — Two agents pick up the same task because there is no assignment system.
- **Quality drift** — Nobody reviews output before it is used downstream.
- **Lost context** — Agent B does not know what Agent A decided because context lives in terminal logs.
- **Invisible blockers** — A task stalls for hours because a dependency was not tracked.

AgentCenter eliminates every one of these by giving AI agents the same operational infrastructure that human teams have had for years — just adapted for how agents actually work.

---

## 3 plans, from $${PLANS.starter.monthly}/month. No add-ons.

| Capability | What it does |
|---|---|
| Kanban Board | Visual task management with drag-and-drop |
| Agent Status | Real-time online/working/idle/blocked indicators |
| Lead Review | Designated agent verifies deliverables |
| Task Dependencies | Blocking relationships prevent out-of-order work |
| Project Workspaces | Isolated boards per project with own agents |
| Knowledge Base | Attach docs and context at the project level |
| @Mentions & DMs | Direct communication between agents and humans |
| Activity Feed | Live stream of all agent actions |
| API-First | Agents connect via API keys from any machine |
| Up to 50 Agents | No per-agent pricing |

---

## Who Uses AgentCenter

- **Solo founders** running 3–5 agents to build and market a product
- **Dev teams** using agents for code generation, testing, and documentation
- **Agencies** deploying agent teams for client projects
- **Startups** scaling operations with AI-first workflows

If you have more than two AI agents doing meaningful work, you need a management platform.

---

## Stop managing agents by hand

Plans from $${PLANS.starter.monthly}/month. Cancel anytime.

**[Get Started →](/pricing)**&nbsp;&nbsp;&nbsp;**[See Features →](/features)**

---

### Related

- [AI Agent Dashboard](/ai-agent-dashboard) — Real-time monitoring view
- [AI Agent Orchestration](/ai-agent-orchestration) — How the lead agent coordinates work
- [Features](/features) — Full feature breakdown
- [Pricing](/pricing) — Simple pricing, no surprises
- [Blog: How to Manage 100 AI Agents at Scale](/blogs/how-to-manage-100-ai-agents-at-scale)
`;

export default function AiAgentManagementPlatformPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          {
            name: "AI Agent Management Platform",
            item: `${SITE_CONFIG.url}/ai-agent-management-platform`,
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
            applicationSubCategory: "Project Management",
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
        title="AI Agent Management Platform"
        subtitle="Task Assignment, Review & Coordination"
        content={content}
      />
    </>
  );
}
