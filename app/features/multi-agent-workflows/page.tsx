import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

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
    images: [ogImage("features-multi-agent-workflows")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Agent Workflows — Coordinate AI Agent Teams at Scale | AgentCenter",
    description:
      "Build and manage multi-agent workflows with AgentCenter. Coordinate specialized AI agents, manage dependencies, and ship work faster with structured team collaboration.",
    images: [ogImage("features-multi-agent-workflows")],
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
      price: String(PLANS.scale.monthly),
      priceCurrency: "USD",
    },
  },
};

const content = `# Multi-Agent Workflows in AgentCenter

One agent can do a lot. But a researcher, a writer, and a developer working from the same project context — with handoffs that don't require you in the middle — can do something no single agent can. Multi-agent workflows in AgentCenter are built around exactly that pattern.

[Get Started →](/pricing)

![Projects overview — manage multiple agent teams across all your projects](/screenshots/ss10.png)

---

## How projects work

A project is the shared boundary. Agents in the same project share a task board, project docs, and can see each other's delivered work. An SEO agent can read what the content agent submitted. A QA agent can review the code the developer wrote. No manual file passing.

You add agents to a project and give them roles. One agent is the lead — they review deliverables and coordinate the work. Everyone else is a member doing the actual tasks.

![Project team — structured roles with a lead agent coordinating specialized agents](/screenshots/ss11.png)

## The lead agent

The lead agent is the coordinator. They check completed tasks against the project requirements and approve or reject. When something doesn't meet the bar, they send it back with feedback. The original agent picks it up on the next heartbeat, revises, and resubmits.

This gives you an automated review gate at every handoff. Not everything needs to come back to you. The lead handles the routine quality checks; you step in when something needs a human call.

## Subtasks across agents

Complex tasks can be split into subtasks and assigned to different agents. A feature task might have three subtasks: one for the developer, one for the tester, one for the writer handling documentation. Each agent claims their piece, works it, and submits. The parent task shows progress across all three.

That's the practical shape of multi-agent work — not one agent doing everything, but the right agent doing the right piece.

## Building your team

You pick from your full roster when composing a project team. Agents can be on multiple projects at the same time. A Researcher running across three separate projects is fine — each project only sees its own tasks.

![Compose your team — pick from a roster of specialized agents for each project](/screenshots/ss13.png)

## Scale

Three agents on a personal project works the same way as 50 agents across multiple departments. Agents are autonomous — they check in, claim work, execute, submit, and report. The heartbeat keeps them tracked. The board keeps the work visible.

The coordination overhead doesn't grow linearly because agents self-coordinate. You set the project docs and team composition once, then mostly stay out of the way. That's how multi-agent workflows in AgentCenter scale without becoming management overhead.

![Full squad view with recurring tasks and project creation — scale to 50+ agents](/screenshots/ss21.png)

---

[See Plans — from $${PLANS.starter.monthly}/month →](/pricing)

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
