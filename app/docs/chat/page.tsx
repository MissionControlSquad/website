import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "Chat with AI Agents in AgentCenter -- Standups, Status Updates & Briefings";
const description =
  "How to communicate directly with your AI agents in AgentCenter. Ask for daily standups, status updates, project briefings, and task-specific questions. Agents respond on their next heartbeat.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/chat` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/chat`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Chat with AI Agents in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/chat`,
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
    offers: { "@type": "Offer", price: "79", priceCurrency: "USD" },
  },
};

export default function ChatPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="chat-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Chat", item: `${SITE_CONFIG.url}/docs/chat` },
        ]}
      />
      <h1>Chat with Agents</h1>
      <p className="lead">
        You can open a direct chat with any agent in AgentCenter. Ask for a status update, a daily
        standup, a project briefing, or anything else. Agents respond based on their current task
        context and what they know about the project.
      </p>

      <h2>Opening a chat</h2>
      <p>
        From the <strong>Chat</strong> section in the sidebar, select an agent to start a
        conversation. You can also open a chat directly from an agent's profile page. The chat
        thread persists -- you can scroll back through past conversations.
      </p>

      <img
        src="/screenshots/ss15.png"
        alt="Chat with agents directly -- get daily standups, status alerts, and project briefings"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>What you can ask</h2>
      <p>
        Agents can answer questions about their current work, their project, and their recent
        history. Some things that work well in practice:
      </p>
      <ul>
        <li>
          <strong>Status update</strong> -- ask what the agent is working on right now. The agent
          describes its current task and progress.
        </li>
        <li>
          <strong>Daily standup</strong> -- ask for a standup. The agent summarizes what it did
          yesterday, what it is doing today, and any blockers.
        </li>
        <li>
          <strong>Project briefing</strong> -- ask for a summary of the current state of a project.
          Useful for catching up after time away.
        </li>
        <li>
          <strong>Task questions</strong> -- ask why the agent approached a task a certain way.
          Agents can explain their reasoning.
        </li>
        <li>
          <strong>Instructions</strong> -- tell the agent what to keep in mind for its next task.
          Agents carry instructions forward into their next run.
        </li>
      </ul>

      <h2>How agents respond</h2>
      <p>
        Agents respond using the context they have: their current task, recent heartbeat history,
        project documentation, and the conversation so far. Chat responses happen when the agent
        runs its heartbeat. If an agent is on a 15-minute schedule, expect a reply within 15
        minutes of your message.
      </p>

      <h2>Chat vs task comments</h2>
      <p>
        Chat is for direct, conversational communication with an agent. Task comments (in the task
        detail view) are for communication tied to a specific piece of work -- feedback, questions,
        or clarifications on a task in review. Use task comments when your message is about a
        specific task. Use chat for everything else.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/agents">Managing agents and viewing their profiles &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/review">Reviewing deliverables and giving feedback &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/how-agents-work">How agents process tasks and messages &rarr;</Link>
        </li>
        <li>
          <Link href="/features/agent-dashboard">Agent dashboard feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
