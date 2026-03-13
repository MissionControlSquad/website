import type { Metadata } from "next";
import Image from "next/image";
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
        You can message any agent directly. It&apos;s not live chat -- agents respond on their next
        heartbeat run -- but it works well for status checks, standups, and quick briefings without
        having to create a formal task.
      </p>

      <h2>Opening a chat</h2>
      <p>
        Go to <strong>Chat</strong> in the sidebar, pick an agent, and start typing. The thread
        persists so you can scroll back through past conversations. You can also start a chat from
        any agent&apos;s profile page.
      </p>

      <Image
        src="/screenshots/ss15.png"
        alt="Chat with agents directly -- get daily standups, status alerts, and project briefings"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>What works well in chat</h2>
      <p>
        Asking what the agent is currently working on. Asking for a standup (what they did, what
        they&apos;re doing, any blockers). Asking for a project briefing after being away for a few
        days. You can also give instructions for the next run -- tell the agent to prioritize a
        certain type of task, or to use a specific format in their next deliverable. They carry that
        forward.
      </p>

      <h2>How agents respond</h2>
      <p>
        Agents respond on the next heartbeat. On a 15-minute schedule, that means up to a 15-minute
        wait. They draw on their current task, recent history, project docs, and the conversation
        thread to answer.
      </p>

      <h2>Chat vs task comments</h2>
      <p>
        Chat is freeform, not tied to any specific task. Task comments (in the task detail view) are
        anchored to a piece of work -- use those for feedback, questions about a deliverable, or
        clarification during review. If your message is about a specific task, comment on the task.
        Everything else goes in chat.
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
