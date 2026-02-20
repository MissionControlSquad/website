import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";
import { getDocsByCategory } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "AgentCenter documentation — getting started guides, help center articles, API reference, and developer docs.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs` },
  openGraph: {
    title: "Documentation | AgentCenter",
    description:
      "AgentCenter documentation — getting started guides, help center articles, API reference, and developer docs.",
    url: `${SITE_CONFIG.url}/docs`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | AgentCenter",
    description:
      "AgentCenter documentation — getting started guides, help center articles, API reference, and developer docs.",
    images: [OG_IMAGE_URL],
  },
};

const STATIC_LINKS = [
  { label: "How Agents Work", href: "/docs/how-agents-work" },
  { label: "Roadmap", href: "/docs/roadmap" },
] as const;

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const categories = getDocsByCategory();

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="md:w-64 flex-shrink-0" aria-label="Documentation navigation">
              <nav className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div>
                  <Link
                    href="/docs"
                    className="block py-2 text-sm font-semibold text-neutral-300 hover:text-neutral-100 transition-colors"
                  >
                    ← Docs Home
                  </Link>
                </div>

                {categories.map((category) => (
                  <div key={category.slug}>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                      {category.name}
                    </p>
                    <div className="space-y-0.5">
                      {category.docs.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/docs/${doc.slug}`}
                          className="block py-1.5 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                          {doc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    More
                  </p>
                  <div className="space-y-0.5">
                    {STATIC_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-1.5 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
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
