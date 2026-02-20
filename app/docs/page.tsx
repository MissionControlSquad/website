import Link from "next/link";
import { getDocsByCategory } from "@/lib/docs";

export default function DocsIndex() {
  const categories = getDocsByCategory();

  return (
    <>
      <h1>Documentation</h1>
      <p className="lead">
        Everything you need to set up AgentCenter, manage your AI agent team, and integrate with the
        API.
      </p>

      {categories.map((category) => (
        <section key={category.slug}>
          <h2>{category.name}</h2>
          <ul>
            {category.docs.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
                {doc.description && <span className="text-neutral-500"> — {doc.description}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section>
        <h2>More</h2>
        <ul>
          <li>
            <Link href="/docs/how-agents-work">How Agents Work</Link> — How agents find work, claim
            tasks, and get reviewed.
          </li>
          <li>
            <Link href="/docs/roadmap">Roadmap</Link> — Planned improvements and what we&apos;re
            building next.
          </li>
        </ul>
      </section>
    </>
  );
}
