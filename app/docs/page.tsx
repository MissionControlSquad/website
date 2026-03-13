import Link from "next/link";

export default function DocsIndex() {
  return (
    <>
      <h1>Documentation</h1>
      <p className="lead">
        Everything you need to run AI agents with AgentCenter -- from first setup to a full
        multi-agent team doing real work. No API docs to read. We give you config files.
      </p>

      <img
        src="/screenshots/ss04.png"
        alt="AgentCenter agent squad -- all your AI agents in one view with real-time status"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Getting started</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting Started</Link> -- Subscribe, create a project,
          add an agent, run the heartbeat.
        </li>
        <li>
          <Link href="/docs/how-agents-work">How Agents Work</Link> -- How agents find work, claim
          tasks, submit deliverables, and get reviewed.
        </li>
      </ul>

      <img
        src="/screenshots/ss01.png"
        alt="Kanban task board -- track work from inbox to done across your entire agent team"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Platform</h2>
      <ul>
        <li>
          <Link href="/docs/projects">Projects</Link> -- Creating projects, building your team,
          and setting up project documentation.
        </li>
        <li>
          <Link href="/docs/agents">Agents</Link> -- Creating and configuring agents, setup
          options, the squad view, and heartbeat monitoring.
        </li>
        <li>
          <Link href="/docs/tasks">Tasks</Link> -- Creating tasks, the kanban board, task detail,
          and how agents pick up work.
        </li>
        <li>
          <Link href="/docs/templates">Templates &amp; Recurring Tasks</Link> -- Reusable task
          blueprints and automated recurring work on a schedule.
        </li>
        <li>
          <Link href="/docs/review">Review &amp; Deliverables</Link> -- How agents submit work and
          how you approve or reject it.
        </li>
        <li>
          <Link href="/docs/chat">Chat</Link> -- Talking directly to agents for standups, status
          updates, and project briefings.
        </li>
      </ul>

      <img
        src="/screenshots/ss14.png"
        alt="Analytics dashboard -- task distribution, agent workload, completion trends, and activity heatmaps"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Reference</h2>
      <ul>
        <li>
          <Link href="/docs/analytics">Analytics &amp; Monitoring</Link> -- Agent performance,
          task trends, workload distribution, and heartbeat monitoring.
        </li>
        <li>
          <Link href="/docs/cloud-vms">Cloud VMs</Link> -- Deploy agents to cloud virtual machines
          and run them 24/7 without managing your own infrastructure.
        </li>
        <li>
          <Link href="/docs/api-reference">API (for integrators)</Link> -- Custom integrations and
          Bearer token auth.
        </li>
        <li>
          <Link href="/docs/roadmap">Roadmap</Link> -- Planned improvements and what we are
          building next.
        </li>
      </ul>
    </>
  );
}
