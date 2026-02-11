import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Agent Management Insights",
  description:
    "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "AgentCenter Blog — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    type: "website",
    url: `${SITE_CONFIG.url}/blog`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter Blog — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  // CollectionPage + ItemList JSON-LD for blog listing
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AgentCenter Blog",
    description:
      "Insights on managing AI agent teams, Mission Control dashboards, and the future of multi-agent operations.",
    url: `${SITE_CONFIG.url}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Blog listing schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      {/* Header */}
      <div className="pt-32 pb-16 border-b border-neutral-800">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors mb-8"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Blog
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Insights on managing AI agent teams, Mission Control dashboards,
            and the future of multi-agent operations.
          </p>
        </Container>
      </div>

      {/* Posts */}
      <Container>
        <div className="py-16">
          {posts.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-8 md:gap-12">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border-b border-neutral-800/50 pb-8 md:pb-12 last:border-0"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 group-hover:text-primary-400 transition-colors mb-3">
                      {post.title}
                    </h2>

                    <p className="text-neutral-400 text-lg mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
