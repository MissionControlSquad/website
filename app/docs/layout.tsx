import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "AgentCenter docs: getting started, how agents work, and roadmap. No API docs needed—we give you config files when you add an agent.",
};

const DOC_LINKS = [
  { label: "Getting Started", href: "/docs/getting-started" },
  { label: "How agents work", href: "/docs/how-agents-work" },
  { label: "API (integrators)", href: "/docs/api-reference" },
  { label: "Roadmap", href: "/docs/roadmap" },
] as const;

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="md:w-56 flex-shrink-0" aria-label="Documentation navigation">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                  Documentation
                </p>
                {DOC_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
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
