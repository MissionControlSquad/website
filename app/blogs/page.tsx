import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Agent Management Insights",
  description:
    "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blogs`,
  },
  openGraph: {
    title: "Blog | AgentCenter — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    type: "website",
    url: `${SITE_CONFIG.url}/blogs`,
    siteName: SITE_CONFIG.name,
    images: [{ ...OG_IMAGE, alt: "AgentCenter Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | AgentCenter — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    images: [OG_IMAGE_URL],
  },
};

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogsPage({ searchParams }: Props) {
  const { tag: activeTag } = await searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const posts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // CollectionPage + ItemList JSON-LD for blog listing
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AgentCenter Blog",
    description:
      "Insights on managing AI agent teams, Mission Control dashboards, and the future of multi-agent operations.",
    url: `${SITE_CONFIG.url}/blogs`,
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
        url: `${SITE_CONFIG.url}/blogs/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Blog", item: `${SITE_CONFIG.url}/blogs` },
        ]}
      />
      <JsonLdScript data={blogListJsonLd} scriptKey="blogs-collection-page" />

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
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">Blog</h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Insights on managing AI agent teams, Mission Control dashboards, and the future of
            multi-agent operations.
          </p>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-sm text-neutral-500 mr-1">Filter:</span>
              <Link
                href="/blogs"
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  !activeTag
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                    : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-neutral-600"
                }`}
              >
                All
              </Link>
              {allTags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/blogs?tag=${encodeURIComponent(tag)}`}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeTag === tag
                      ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                      : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-neutral-600"
                  }`}
                >
                  <Tag size={10} />
                  {tag}
                  <span className="text-neutral-500">({count})</span>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">
              {activeTag
                ? `No posts found with tag "${activeTag}".`
                : "No posts yet. Check back soon."}
            </p>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && (
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="group block mb-12 p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                >
                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium mb-4">
                    Latest
                  </span>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 group-hover:text-primary-400 transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-400 text-lg mb-4 line-clamp-2">
                    {featuredPost.description}
                  </p>
                  {featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
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
              )}

              {/* Remaining posts grid */}
              {remainingPosts.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {remainingPosts.map((post) => (
                    <article key={post.slug}>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="group block p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all h-full"
                      >
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

                        <h2 className="text-xl font-bold text-neutral-100 group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-neutral-400 mb-4 line-clamp-2">{post.description}</p>

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
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
