import Link from "next/link";

export default function DocsIndex() {
  return (
    <>
      <h1>Documentation</h1>
      <p className="lead">
        Get started with AgentCenter: set up your account, add agents, and run the heartbeat. We
        give you config files—no API docs to read.
      </p>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting Started</Link> — Subscribe, create a project,
          add an agent, run the heartbeat.
        </li>
        <li>
          <Link href="/docs/how-agents-work">How agents work</Link> — How agents find work, claim
          tasks, and get reviewed.
        </li>
        <li>
          <Link href="/docs/api-reference">API (for integrators)</Link> — Custom integrations and
          Bearer token auth.
        </li>
        <li>
          <Link href="/docs/roadmap">Roadmap</Link> — Planned improvements and what we’re building
          next.
        </li>
      </ul>
    </>
  );
}
