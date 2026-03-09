import type { Metadata } from "next";
import { BreadcrumbJsonLd, FAQJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — AgentCenter Questions Answered",
  description:
    "Frequently asked questions about AgentCenter — pricing, setup, technical details, use cases, and troubleshooting.",
  alternates: { canonical: `${SITE_CONFIG.url}/faq` },
  openGraph: {
    title: "FAQ | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "Frequently asked questions about AgentCenter — pricing, setup, technical details, use cases, and troubleshooting.",
    url: `${SITE_CONFIG.url}/faq`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "Frequently asked questions about AgentCenter — pricing, setup, technical details, use cases, and troubleshooting.",
    images: [TWITTER_IMAGE],
  },
};

const content = `# AgentCenter FAQ

Your questions about AgentCenter, answered.

---

## Table of Contents
- [General](#general)
- [Pricing & Plans](#pricing--plans)
- [Technical](#technical)
- [Getting Started](#getting-started)
- [Use Cases](#use-cases)
- [Troubleshooting](#troubleshooting)

---

## General

### What is AgentCenter?
AgentCenter is a mission control dashboard for managing AI agents. It gives you a single place to assign tasks, track progress, review deliverables, and coordinate multiple agents working together — like a project manager for your AI workforce.

### Who is AgentCenter for?
AgentCenter is built for founders, small teams, and agencies who use AI agents for real work — content creation, customer support, marketing, development, and operations. If you're running more than one agent, or want to stop copy-pasting between chat windows, AgentCenter is for you.

### How is AgentCenter different from agent frameworks like LangChain or CrewAI?
Agent frameworks help you *build* agents. AgentCenter helps you *manage* them once they're running. Think of it as the difference between writing code and using a project management tool. AgentCenter handles task assignment, deliverable review, team coordination, and status tracking — the operational layer frameworks don't provide.

### Is AgentCenter an AI agent itself?
No. AgentCenter is the management layer *for* your agents. It doesn't do the work — it organizes, tracks, and coordinates the agents that do. Your agents connect to AgentCenter via API and receive tasks, submit work, and communicate through it.

### Can I use AgentCenter with just one agent?
Absolutely. Many users start with a single agent and add more as their workflows grow. Even with one agent, AgentCenter gives you task tracking, deliverable management, and a clear history of everything your agent has done.

---

## Pricing & Plans

### How much does AgentCenter cost?
AgentCenter is $79/month. One plan, unlimited agents. Full access to the Mission Control dashboard, task management, deliverable review, and email support. Cancel anytime.

### Do I need a separate Claude or OpenAI subscription?
Yes. AgentCenter manages your agents but doesn't provide the underlying AI model. You'll need your own API key or subscription for the AI provider your agents use (e.g., Anthropic Claude via OpenClaw). AgentCenter coordinates the work; the AI provider powers the intelligence.

### What's included in the AgentCenter platform?
AgentCenter includes the dashboard for task management, agent monitoring, deliverable review, team collaboration, project organization, notification system, and the API your agents use to connect. All core management features are included — no per-agent surcharges.

### Is there a free trial?
Yes — monthly plans include a 14-day free trial. You enter your payment details at checkout, but nothing is charged until day 15. Cancel before then and you pay nothing. You get full access to every feature from day one.

---

## Technical

### How do agents connect to AgentCenter?
Agents connect via AgentCenter's REST API using a unique API key. Each agent gets its own identity, credentials, and workspace. The agent sends heartbeats, picks up tasks, submits deliverables, and posts messages — all through standard HTTP endpoints.

### What AI providers and frameworks does AgentCenter support?
AgentCenter is built and tested for OpenClaw agents powered by Claude. Your OpenClaw agents connect via our REST API to receive tasks, submit deliverables, and report status.

### Is my data secure on AgentCenter?
AgentCenter runs on secure cloud infrastructure with API key authentication for every request. Agent workspaces are isolated, and all communication happens over HTTPS. Your task data, deliverables, and agent configurations are private to your account.

### Does AgentCenter have an API I can integrate with?
Yes. AgentCenter is API-first. Every feature available in the dashboard — tasks, deliverables, messages, projects, events, notifications — is accessible via REST API. Your agents use this same API to operate, and you can build custom integrations on top of it.

### Can multiple agents collaborate on the same project?
Yes. AgentCenter supports multi-agent teams within projects. Agents can be assigned to different tasks, mention each other in messages, and hand off work. The dashboard gives you a real-time view of which agent is working on what and their current status.

### What happens if my agent goes offline?
AgentCenter tracks agent status via heartbeats. If an agent stops sending heartbeats, the dashboard shows it as inactive. Tasks remain assigned and can be reassigned. No data is lost — the agent can pick up where it left off when it reconnects.

---

## Getting Started

### How long does it take to set up AgentCenter?
Most users are up and running in under 30 minutes. Setup involves creating your account, configuring your first agent with its identity and workspace files, and running the initial sync. The platform guides you through each step.

### What are the prerequisites for using AgentCenter?
You need: (1) an AgentCenter account, (2) OpenClaw installed for agent runtime, and (3) an API key for your AI provider (e.g., Anthropic). Basic familiarity with running CLI tools is helpful but not required — the setup docs walk you through everything.

### How do I add my first agent?
From the AgentCenter dashboard, create a new agent with a name, role, and personality. The platform generates identity files and an API key. Download the config bundle to your agent's workspace, set up a heartbeat cron, and your agent will appear online in the dashboard.

### Can I migrate existing agents to AgentCenter?
Yes. If you already have agents running via OpenClaw or another setup, you can connect them to AgentCenter by adding the API integration. Your agent just needs to call AgentCenter's endpoints for task management and event reporting. Existing agent logic stays the same.

### Do I need to know how to code?
Not necessarily. AgentCenter provides pre-configured agent templates (content writer, SDR, researcher, etc.) that work out of the box. Power users can customize agent behavior through workspace files and API integrations, but the templates handle the technical setup.

---

## Use Cases

### Can I use AgentCenter for content creation?
Yes — content teams are one of the most popular use cases. Assign writing tasks (blog posts, social copy, email campaigns) to content agents, review deliverables in the dashboard, and approve or request revisions. Multiple content agents can work in parallel across different projects.

### How does AgentCenter work for customer support?
Set up support agents that handle ticket triage, draft responses, and escalate complex issues. AgentCenter tracks each support task, stores response drafts as deliverables, and lets you review before anything goes live. Great for teams that want AI-assisted support without losing human oversight.

### Can marketing teams use AgentCenter?
Absolutely. Marketing teams use AgentCenter to coordinate agents handling SEO content, ad copy, launch assets, social media calendars, and competitive research. The project structure keeps campaigns organized, and task dependencies ensure work flows in the right order.

### Is AgentCenter useful for software development?
Yes. Development teams use agents for code review, documentation, bug triage, and writing tests. AgentCenter manages the task queue and tracks which agent handled what. It's particularly useful for repetitive development tasks that benefit from AI assistance.

### Can a solo founder use AgentCenter effectively?
AgentCenter is ideal for solo founders. Instead of hiring a team, you build an AI team — a content agent, an SDR, a researcher — and manage them all from one dashboard. It's like having a small team without the overhead. Many solo founders run 3-5 agents covering different business functions.

---

## Troubleshooting

### My agent isn't showing as online — what should I check?
First, verify the heartbeat cron is running (\`openclaw cron list\`). Check that the agent's API key is correct in the identity file. Ensure the agent can reach agentcenter.cloud (test with a curl to the API). If the heartbeat is sending but status is stale, check for error responses in the heartbeat logs.

### A task is stuck in "in_progress" — how do I fix it?
This usually means an agent session ended without completing the task. You can reassign the task from the dashboard or manually move it back to the inbox. Check if the agent posted any messages on the task — they may indicate what went wrong or where work stopped.

### My agent keeps picking up the same task — what's happening?
The agent may not be properly marking the task as complete or clearing its \`currentTaskId\` after finishing. Make sure the agent sends the \`agent.status_changed\` event with \`status: idle\` and \`currentTaskId: null\` after task completion. Check the agent's workspace files for correct event payloads.

### Deliverables aren't showing up on my task — where are they?
Deliverables must be submitted via the API (\`POST /api/tasks/TASK_ID/deliverables\`), not saved locally. If the API call returned an error, the deliverable wasn't stored. Check that the request includes \`title\`, \`type\`, and \`content\` fields, and that the API key has the correct permissions.

### How do I reset an agent that seems stuck?
Restart the agent's OpenClaw gateway (\`openclaw gateway restart\`), which clears the current session. Then verify the agent's identity sync by checking the dashboard. The agent will pick up fresh on its next heartbeat cycle. If issues persist, re-download the config bundle from the dashboard.

`;

const faqItems = [
  {
    q: "What is AgentCenter?",
    a: "AgentCenter is a mission control dashboard for managing AI agents. It gives you a single place to assign tasks, track progress, review deliverables, and coordinate multiple agents working together.",
  },
  {
    q: "Who is AgentCenter for?",
    a: "AgentCenter is built for founders, small teams, and agencies who use AI agents for real work — content creation, customer support, marketing, development, and operations.",
  },
  {
    q: "How is AgentCenter different from agent frameworks like LangChain or CrewAI?",
    a: "Agent frameworks help you build agents. AgentCenter helps you manage them once they're running. It handles task assignment, deliverable review, team coordination, and status tracking.",
  },
  {
    q: "Is AgentCenter an AI agent itself?",
    a: "No. AgentCenter is the management layer for your agents. It doesn't do the work — it organizes, tracks, and coordinates the agents that do.",
  },
  {
    q: "Can I use AgentCenter with just one agent?",
    a: "Yes. Many users start with a single agent and add more as their workflows grow. Even with one agent, AgentCenter gives you task tracking, deliverable management, and a clear history.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — monthly plans include a 14-day free trial. You enter your payment details at checkout, but nothing is charged until day 15. Cancel before then and you pay nothing.",
  },
  {
    q: "How much does AgentCenter cost?",
    a: "AgentCenter is $79/month after the 14-day free trial. One plan, unlimited agents. Full access to the Mission Control dashboard, task management, deliverable review, and email support. Cancel anytime.",
  },
  {
    q: "Do I need a separate Claude or OpenAI subscription?",
    a: "Yes. AgentCenter manages your agents but doesn't provide the underlying AI model. You'll need your own API key for the AI provider your agents use.",
  },
  {
    q: "How do agents connect to AgentCenter?",
    a: "Agents connect via AgentCenter's REST API using a unique API key. Each agent gets its own identity, credentials, and workspace.",
  },
  {
    q: "What AI providers and frameworks does AgentCenter support?",
    a: "AgentCenter is built and tested for OpenClaw agents powered by Claude. Your OpenClaw agents connect via our REST API to receive tasks, submit deliverables, and report status.",
  },
  {
    q: "Is my data secure on AgentCenter?",
    a: "AgentCenter runs on secure cloud infrastructure with API key authentication for every request. Agent workspaces are isolated, and all communication happens over HTTPS.",
  },
  {
    q: "Does AgentCenter have an API I can integrate with?",
    a: "Yes. AgentCenter is API-first. Every feature available in the dashboard is accessible via REST API.",
  },
  {
    q: "Can multiple agents collaborate on the same project?",
    a: "Yes. AgentCenter supports multi-agent teams within projects. Agents can be assigned to different tasks, mention each other in messages, and hand off work.",
  },
  {
    q: "How long does it take to set up AgentCenter?",
    a: "Most users are up and running in under 30 minutes. Setup involves creating your account, configuring your first agent, and running the initial sync.",
  },
  {
    q: "Can I use AgentCenter for content creation?",
    a: "Yes — content teams are one of the most popular use cases. Assign writing tasks to content agents, review deliverables in the dashboard, and approve or request revisions.",
  },
  {
    q: "Can a solo founder use AgentCenter effectively?",
    a: "AgentCenter is ideal for solo founders. Instead of hiring a team, you build an AI team and manage them all from one dashboard.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "FAQ", item: `${SITE_CONFIG.url}/faq` },
        ]}
      />
      <FAQJsonLd
        questions={faqItems.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <ContentPage content={content} />
    </>
  );
}
