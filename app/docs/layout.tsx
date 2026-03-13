import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "AgentCenter docs: getting started, how agents work, and roadmap. No API docs needed—we give you config files when you add an agent.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs` },
  openGraph: {
    title: "Documentation | AgentCenter",
    description:
      "AgentCenter docs: getting started, how agents work, and roadmap. No API docs needed—we give you config files when you add an agent.",
    url: `${SITE_CONFIG.url}/docs`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | AgentCenter",
    description:
      "AgentCenter docs: getting started, how agents work, and roadmap. No API docs needed—we give you config files when you add an agent.",
    images: [TWITTER_IMAGE],
  },
};

const DOC_SECTIONS = [
  {
    title: "Getting Started",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "How Agents Work", href: "/docs/how-agents-work" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Projects", href: "/docs/projects" },
      { label: "Agents", href: "/docs/agents" },
      { label: "Tasks", href: "/docs/tasks" },
      { label: "Templates & Recurring", href: "/docs/templates" },
      { label: "Review & Deliverables", href: "/docs/review" },
      { label: "Chat", href: "/docs/chat" },
    ],
  },
  {
    title: "Reference",
    links: [
      { label: "Analytics & Monitoring", href: "/docs/analytics" },
      { label: "Cloud VMs", href: "/docs/cloud-vms" },
      { label: "API (integrators)", href: "/docs/api-reference" },
      { label: "Roadmap", href: "/docs/roadmap" },
    ],
  },
] as const;

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="md:w-56 flex-shrink-0" aria-label="Documentation navigation">
              <nav className="sticky top-24">
                {DOC_SECTIONS.map((section) => (
                  <div key={section.title} className="mb-6">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                      {section.title}
                    </p>
                    <div className="space-y-1">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-1.5 text-neutral-400 hover:text-neutral-100 transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </aside>
            <article className="flex-1 min-w-0 max-w-3xl prose prose-invert prose-neutral prose-headings:font-semibold prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
              {children}
            </article>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
