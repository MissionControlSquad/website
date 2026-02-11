import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Article JSON-LD for Google rich results
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Jagodana LLC",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/android-icon-192x192.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },
    image: `${SITE_CONFIG.url}/opengraph-image`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Article schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <div className="pt-32 pb-12 border-b border-neutral-800">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors mb-8"
            >
              <ArrowRight size={14} className="rotate-180" />
              All posts
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-4">
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
              <span className="text-neutral-600">by {post.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-neutral-400">{post.description}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
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
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <article className="max-w-3xl mx-auto py-12 md:py-16">
          <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-neutral-100 prose-p:text-neutral-300 prose-strong:text-neutral-200 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-code:text-primary-300 prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-li:text-neutral-300 prose-blockquote:border-primary-500 prose-blockquote:text-neutral-400 prose-table:text-neutral-300 prose-th:text-neutral-200 prose-td:border-neutral-800 prose-th:border-neutral-800">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </Container>

      {/* Back link */}
      <div className="border-t border-neutral-800">
        <Container>
          <div className="max-w-3xl mx-auto py-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to all posts
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
