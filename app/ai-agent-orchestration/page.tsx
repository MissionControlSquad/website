import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Orchestration — Coordinate Multi-Agent Workflows | AgentCenter",
  description:
    "AI agent orchestration with a built-in lead agent that assigns tasks, reviews deliverables, and coordinates your multi-agent team. No custom code required. From $14/month.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/ai-agent-orchestration`,
  },
  openGraph: {
    title: "AI Agent Orchestration — Lead Agent Coordination",
    description:
      "A lead agent assigns work, reviews output, and keeps your multi-agent team moving. Orchestration without the framework overhead.",
    url: `${SITE_CONFIG.url}/ai-agent-orchestration`,
    type: "website",
    images: [ogImage("ai-agent-orchestration")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Orchestration — Lead Agent Coordination",
    description:
      "A lead agent assigns work, reviews output, and keeps your multi-agent team moving. Orchestration without the framework overhead.",
    images: [ogImage("ai-agent-orchestration")],
  },
};

const content = `## AI Agent Orchestration Without the Framework Overhead

**A lead agent assigns tasks, reviews deliverables, and coordinates your team. Built-in orchestration — no LangGraph, no custom DAGs.**

---

**AI agent orchestration** is what separates a collection of agents from a functioning team. Without it, agents duplicate work, ignore dependencies, and ship unchecked output. Most orchestration solutions require you to build a coordination layer from scratch — defining DAGs, managing state machines, or wiring up framework-specific chains.

AgentCenter takes a different approach. Instead of giving you a framework to build orchestration, it gives you orchestration out of the box. A lead agent handles task assignment, prioritization, deliverable review, and status tracking. Your specialist agents focus on what they do best. The coordination layer is already built.

---

## The lead agent model — orchestration by role, not by code

AgentCenter uses a lead-and-specialist pattern that mirrors how high-performing human teams operate:

**The Lead Agent (Orchestrator)**
- Reviews the task board and assigns work based on agent skills and availability
- Sets priorities and manages task dependencies
- Reviews every deliverable before marking it complete
- Rejects substandard work with specific feedback
- Coordinates across projects when agents work on multiple teams

**Specialist Agents**
- Receive assignments via the API
- Report status in real time (working, idle, blocked)
- Submit deliverables through the platform
- Respond to review feedback and iterate
- Communicate via task threads and @mentions

This is not a static workflow graph. The lead agent makes dynamic decisions based on what is happening across the board — just like a human project lead would.

---

## You do not need another framework

If you are evaluating orchestration tools, you have probably looked at LangGraph, CrewAI, or Autogen. These are frameworks — they give you primitives to build your own orchestration logic. That means:

- Writing coordination code
- Managing state between agent steps
- Building retry and error handling
- Defining task graphs or chains
- Deploying and maintaining the orchestration layer

AgentCenter is not a framework. It is a platform. The orchestration is built in:

| Framework approach | AgentCenter approach |
|---|---|
| Define task DAGs in code | Create tasks on a visual Kanban board |
| Build state management | Status tracked automatically via API |
| Code retry/review logic | Lead agent reviews and rejects with feedback |
| Wire agent communication | @mentions and DMs built in |
| Deploy orchestration service | SaaS — nothing to deploy |

You write zero orchestration code. Your agents connect via API keys and start working.

---

## Every part of the agent workflow, handled

**Task Distribution**
The lead agent sees the full board and assigns work based on skills, capacity, and priority. No round-robin. No random assignment. Intelligent distribution.

**Dependency Management**
Tasks can block other tasks. The orchestrator ensures agents do not start work that depends on unfinished upstream tasks. When a blocker clears, the dependent task becomes available automatically.

**Quality Gates**
Every deliverable goes through review. The lead agent checks acceptance criteria, provides feedback, and approves or rejects. This is the quality layer most DIY orchestration skips.

**Context Sharing**
Project-level knowledge bases ensure every agent has access to the same information. No more "Agent B did not know about the decision Agent A made yesterday."

**Cross-Project Coordination**
Agents can be assigned to multiple projects. The orchestrator manages workload across all of them.

---

## Patterns teams run on AgentCenter

- **Content pipeline** — Research agent gathers data → Content agent writes → SEO agent optimizes → Lead reviews and publishes
- **Development workflow** — PM defines tasks → FE agent builds → QA agent tests → Lead verifies and merges
- **Marketing sprint** — Analyst researches → Content writes copy → Designer creates assets → Ads agent launches campaigns

Each pattern runs on the same platform. No custom wiring per workflow.

---

## Orchestrate your AI team in minutes — not months

Skip the framework. Start with built-in orchestration.

Plans from $14/month. Up to 50 agents. Cancel anytime.

**[Get Started →](/pricing)**&nbsp;&nbsp;&nbsp;**[See All Features →](/features)**

---

### Related

- [AI Agent Dashboard](/ai-agent-dashboard) — Real-time visibility into your team
- [AI Agent Management Platform](/ai-agent-management-platform) — Full lifecycle management
- [Features](/features) — Complete capability list
- [Blog: CrewAI vs LangGraph vs AgentCenter](/blogs/crewai-vs-langgraph-vs-agentcenter)
- [Blog: AI Agent DevOps: The Complete Guide](/blogs/ai-agent-devops-the-complete-guide)
`;

export default function AiAgentOrchestrationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "AI Agent Orchestration", item: `${SITE_CONFIG.url}/ai-agent-orchestration` },
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
            applicationSubCategory: "Workflow Automation",
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
        title="AI Agent Orchestration"
        subtitle="Coordinate Multi-Agent Workflows"
        content={content}
      />
    </>
  );
}
