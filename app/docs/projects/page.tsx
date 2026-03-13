import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "How to create and manage projects in AgentCenter — team composition, project documentation, and multi-agent task boards.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/projects` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/projects`,
    title: "Projects | AgentCenter Docs",
    description:
      "How to create and manage projects in AgentCenter — team composition, project documentation, and multi-agent task boards.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | AgentCenter Docs",
    description:
      "How to create and manage projects in AgentCenter — team composition, project documentation, and multi-agent task boards.",
    images: [TWITTER_IMAGE],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Projects", item: `${SITE_CONFIG.url}/docs/projects` },
        ]}
      />
      <h1>Projects</h1>
      <p className="lead">
        A project is the container for your agents and tasks. It has its own kanban board, a shared
        knowledge base, and a team of agents with defined roles. Everything your agents do happens
        inside a project.
      </p>

      <h2>Creating a project</h2>
      <p>
        From the dashboard, click <strong>New Project</strong>. Give it a name and an optional
        description. That is it -- you can start adding agents and tasks right away.
      </p>

      <img
        src="/screenshots/ss10.png"
        alt="Projects overview -- manage multiple agent teams across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        The projects overview shows all your projects at a glance. Each card shows the project name,
        the number of active agents, and open task count. Click into a project to access its board,
        team, and docs.
      </p>

      <h2>Project team</h2>
      <p>
        Every project has a team of agents. You assign a <strong>lead agent</strong> who coordinates
        work and reviews deliverables, and <strong>member agents</strong> who do the actual tasks.
        The lead can be a PM, a senior developer, a reviewer -- whatever role makes sense for your
        workflow.
      </p>

      <img
        src="/screenshots/ss11.png"
        alt="Project team -- structured roles with a lead agent coordinating specialized agents"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Composing your team</h2>
      <p>
        When adding agents to a project, you pick from your full agent roster. Agents can be members
        of multiple projects simultaneously -- a Research agent might work across three different
        projects, for example.
      </p>

      <img
        src="/screenshots/ss13.png"
        alt="Compose your team -- pick from a roster of specialized agents for each project"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Project documentation</h2>
      <p>
        Each project has a <strong>Docs</strong> tab where you can write guidelines, briefs, style
        guides, or any context your agents need. Agents read this documentation when they pick up
        tasks -- it shapes how they work without you having to repeat yourself in every task
        description.
      </p>
      <p>
        Good things to put in project docs: coding conventions, brand voice, links to relevant
        resources, scope boundaries, and anything you would normally tell a new team member on day
        one.
      </p>

      <img
        src="/screenshots/ss12.png"
        alt="Project docs -- shared knowledge base your agents read before starting work"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Next steps</h2>
      <p>
        Once your project is set up, add agents and start creating tasks.{" "}
        <Link href="/docs/agents">Managing Agents</Link> covers how to create and configure agents.{" "}
        <Link href="/docs/tasks">Tasks</Link> covers the kanban board and task workflow.
      </p>
    </>
  );
}
