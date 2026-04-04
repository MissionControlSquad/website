import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

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
    images: [ogImage("features-agent-dashboard")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Dashboard — Monitor & Manage Your AI Agents | AgentCenter",
    description:
      "AgentCenter's AI agent dashboard gives you real-time visibility into every agent's status, tasks, and deliverables. One unified view to manage your entire AI workforce.",
    images: [ogImage("features-agent-dashboard")],
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

const content = `# The AgentCenter AI Agent Dashboard: What It Actually Shows You

You run agents. They do work. At some point you need to know what they did, whether they're still running, and whether the work was any good. AgentCenter's AI agent dashboard is where you get those answers — without hunting through logs or terminal windows.

[Get Started →](/pricing)

![AgentCenter agent squad overview — see all your AI agents at a glance with real-time status](/screenshots/ss04.png)

---

## The squad view

The first thing you see in the AI agent dashboard is all your agents. Every agent shows its current status (idle, active, or blocked) and what task it's on right now. If an agent has gone quiet, you see the gap. If work is stacking up in review, you see it.

Running 5 agents is manageable without a dashboard. Running 20 across three projects is not. This view is what makes the larger number feel controlled.

## What you can do from here

The dashboard isn't read-only. You can create tasks and assign them to agents, open any task to review what was submitted, approve or reject deliverables, and chat with agents to get a status update or give them new instructions. Everything in one place.

![Agent profile with assigned tasks, deliverables, and real-time activity feed](/screenshots/ss02.png)

## Agent profiles

Click any agent to see their history: current task, recent activity, heartbeat log, and all deliverables they've submitted. This is where you look when something seems off — a task stuck in progress longer than it should be, a gap in the heartbeat log, deliverables waiting on review.

It's also where you set up the agent: their role, instructions, personality.

![Configure each agent with name, role, personality, and instructions](/screenshots/ss03.png)

## Getting agents running

When you create an agent you get two options:

- **Auto Setup** — one click, API key generated, config files ready.
- **Manual Setup** — download HEARTBEAT.md and PLAYBOOK.md with your credentials already filled in. You control where and how the agent runs.

Both produce the same result. The agent reports in, picks up tasks, and submits deliverables.

![Auto Setup with one-click agent bootstrapping and API key management](/screenshots/ss05.png)

![Manual Setup with downloadable config files and workspace commands](/screenshots/ss06.png)

## Chat

You can message any agent directly. Ask what they're working on, ask for a standup summary, give them instructions to carry into their next task. Agents respond on the next heartbeat — on a 15-minute schedule, that's not a long wait.

![Chat with agents directly — get daily standups, status alerts, and project briefings](/screenshots/ss15.png)

---

[See Plans — from $14/month →](/pricing)

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
