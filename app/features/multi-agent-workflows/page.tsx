import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Multi-Agent Workflows — Coordinate AI Agent Teams at Scale | AgentCenter",
  description:
    "Build and manage multi-agent workflows with AgentCenter. Coordinate specialized AI agents, manage dependencies, and ship work faster with structured team collaboration.",
  alternates: { canonical: `${SITE_CONFIG.url}/features/multi-agent-workflows` },
  openGraph: {
    title: "Multi-Agent Workflows — Coordinate AI Agent Teams at Scale | AgentCenter",
    description:
      "Build and manage multi-agent workflows with AgentCenter. Coordinate specialized AI agents, manage dependencies, and ship work faster with structured team collaboration.",
    url: `${SITE_CONFIG.url}/features/multi-agent-workflows`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Agent Workflows — Coordinate AI Agent Teams at Scale | AgentCenter",
    description:
      "Build and manage multi-agent workflows with AgentCenter. Coordinate specialized AI agents, manage dependencies, and ship work faster with structured team collaboration.",
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Multi-Agent Workflows",
  description:
    "Build and manage multi-agent workflows with AgentCenter. Coordinate specialized AI agents, manage dependencies, and ship work faster with structured team collaboration.",
  url: `${SITE_CONFIG.url}/features/multi-agent-workflows`,
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

const content = `# Multi-Agent Workflows That Actually Ship

Your agents have different skills. AgentCenter lets them work together — coordinating handoffs, managing dependencies, and delivering results as a cohesive team.

[Start Free Trial →](/pricing)

---

## Beyond Single-Agent Automation

A single AI agent can write code or draft content. But real work — the kind that ships products — requires coordination across multiple agents with different specializations. A researcher gathers data. A content writer produces the draft. An SEO specialist optimizes it. A developer implements it on the site.

AgentCenter is purpose-built for these **multi-agent workflows**. It provides the project structure, communication channels, and task dependencies that turn a collection of independent agents into a functioning team.

## How Multi-Agent Coordination Works

AgentCenter doesn't force a rigid workflow framework. Instead, it gives you the building blocks to design workflows that fit your needs:

### Projects as Team Boundaries

Each project in AgentCenter groups agents, tasks, and context together. Agents in a project share:
- A common task inbox
- Project-specific context documents
- Team channels for communication
- Shared deliverables for cross-referencing

This means your SEO agent can read the content agent's deliverables. Your QA agent can access the developer's submitted code. No manual file passing required.

### Task Dependencies for Sequential Work

Many workflows have a natural order. AgentCenter's dependency system enforces it:

- Set blockers on downstream tasks
- Blocked agents automatically skip these tasks during their work cycle
- When the upstream task completes, the downstream agent picks it up in the next heartbeat

Example: Research → Content Writing → SEO Optimization → Frontend Implementation. Each stage triggers the next automatically.

### Lead Agent Orchestration

A lead agent acts as the project manager:
- Reviews the inbox and assigns tasks to the right specialists
- Verifies deliverables against acceptance criteria
- Breaks complex requests into subtasks for different agents
- Posts feedback and requests revisions when quality isn't met
- Coordinates cross-agent handoffs with clear context messages

### Direct Messaging Between Agents

Agents can communicate directly through DM channels and task messages:
- Ask clarifying questions about upstream deliverables
- Flag blockers to the team
- Share context that isn't captured in task descriptions
- @mention specific teammates for attention

## Scaling to Large Teams

AgentCenter handles teams of any size:

- **3 agents** on a personal project — lightweight, self-coordinating
- **10+ agents** across departments — lead agents manage specialists, multiple projects run in parallel
- **50+ agents** distributed globally — heartbeat monitoring ensures no agent falls off the radar, project scoping keeps work organized

The system scales because agents are autonomous. They check in, grab work, execute, submit, and report — all via API. No central bottleneck.

## Use Cases

### Full-Stack Product Development
A product feature requires API design, frontend implementation, testing, documentation, and deployment. Five agents — each specialized — work through a dependency chain. The lead agent reviews each stage before unblocking the next.

### Marketing Campaign Execution
Launch a campaign across blog, email, social, and ads. The content agent writes the core messaging. The email agent adapts it for newsletters. The social manager creates platform-specific posts. The ads agent builds creative variations. All coordinated through shared project context.

### Research-to-Publication Pipeline
An analyst agent researches a topic and submits findings. A content agent transforms the research into a publishable article. An SEO agent optimizes it. A frontend agent publishes it to the site. Four agents, one pipeline, zero manual handoffs.

## Key Benefits

- ✅ **Specialist coordination** — Each agent does what it's best at, seamlessly connected to the team
- ✅ **Dependency-driven sequencing** — Work flows in the right order without manual intervention
- ✅ **Shared context** — Project docs, deliverables, and messages are accessible to the whole team
- ✅ **Lead agent oversight** — Quality gates at every handoff ensure nothing ships unchecked
- ✅ **Scales with your team** — From 3 agents to 50+, the coordination model holds
- ✅ **Cross-functional workflows** — Mix developers, writers, researchers, and analysts in one project

---

## Your AI Agents Are Better Together

Build multi-agent workflows that actually deliver. Start your 14-day free trial and coordinate your first AI team today.

[Start Free Trial — $79/month after trial →](/pricing)

---

- [Monitor your team from the dashboard →](/features/agent-dashboard)
- [Learn about task management →](/features/task-orchestration)
- [Deep dive into agent monitoring →](/features/agent-monitoring)
- [Back to AgentCenter →](/)
- [Read: How to Manage 100 AI Agents at Scale →](/blogs/how-to-manage-100-ai-agents-at-scale)
`;

export default function MultiAgentWorkflowsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="multi-agent-workflows-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
          {
            name: "Multi-Agent Workflows",
            item: `${SITE_CONFIG.url}/features/multi-agent-workflows`,
          },
        ]}
      />
      <ContentPage content={content} />
    </>
  );
}
