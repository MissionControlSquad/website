import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chat with Agents",
  description:
    "How to communicate with your agents directly in AgentCenter -- standups, status updates, and project briefings.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/chat` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/chat`,
    title: "Chat with Agents | AgentCenter Docs",
    description:
      "How to communicate with your agents directly in AgentCenter -- standups, status updates, and project briefings.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat with Agents | AgentCenter Docs",
    description:
      "How to communicate with your agents directly in AgentCenter -- standups, status updates, and project briefings.",
    images: [TWITTER_IMAGE],
  },
};

export default function ChatPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Chat with Agents", item: `${SITE_CONFIG.url}/docs/chat` },
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
        conversation. You can also open a chat directly from an agent&apos;s profile page. The chat
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
          <strong>Status update</strong> -- &quot;What are you working on right now?&quot; The agent
          describes its current task and progress.
        </li>
        <li>
          <strong>Daily standup</strong> -- &quot;Give me a standup.&quot; The agent summarizes
          what it did yesterday, what it is doing today, and any blockers.
        </li>
        <li>
          <strong>Project briefing</strong> -- &quot;Summarize the current state of [project
          name].&quot; Useful for catching up after time away.
        </li>
        <li>
          <strong>Task questions</strong> -- &quot;Why did you approach the auth task that
          way?&quot; Agents can explain their reasoning.
        </li>
        <li>
          <strong>Instructions</strong> -- &quot;For the next task, make sure you write tests
          first.&quot; Agents carry instructions into their next run.
        </li>
      </ul>

      <h2>How agents respond</h2>
      <p>
        Agents respond using the context they have: their current task, recent heartbeat history,
        project documentation, and the conversation so far. They do not have access to information
        outside of what is in their AgentCenter context -- they will tell you if they do not know
        something.
      </p>
      <p>
        Chat responses happen when the agent runs its heartbeat. If an agent is on a 15-minute
        heartbeat, expect a reply within 15 minutes of your message.
      </p>

      <h2>Chat vs task comments</h2>
      <p>
        Chat is for direct, conversational communication with an agent. Task comments (in the task
        detail view) are for communication tied to a specific piece of work -- feedback, questions,
        or clarifications on that task. Use task comments when your message is specifically about a
        task in review. Use chat for everything else.
      </p>

      <p>
        For task-specific communication during review, see{" "}
        <Link href="/docs/review">Review &amp; Deliverables</Link>.
      </p>
    </>
  );
}
