import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPostBySlug, getRelatedPosts, getAdjacentPosts } from "@/lib/blog";
import { OG_IMAGE, OG_IMAGE_URL, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { PostNavigation } from "@/components/blog/PostNavigation";
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
      canonical: `${SITE_CONFIG.url}/blogs/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_CONFIG.url}/blogs/${slug}`,
      siteName: SITE_CONFIG.name,
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.tags,
      images: [{ ...OG_IMAGE, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [TWITTER_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = `${SITE_CONFIG.url}/blogs/${slug}`;
  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-screen bg-neutral-950">
      {post.schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Blog", item: `${SITE_CONFIG.url}/blogs` },
          { name: post.title, item: postUrl },
        ]}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={postUrl}
        headline={post.title}
        description={post.description}
        author={{ name: post.author }}
        datePublished={post.date}
        dateModified={post.dateModified}
        publisher={{
          name: "Jagodana LLC",
          logo: { url: `${SITE_CONFIG.url}/android-icon-192x192.png` },
        }}
        image={OG_IMAGE_URL}
        mainEntityOfPage={{ "@id": postUrl }}
      />

      {/* Header */}
      <div className="pt-32 pb-12 border-b border-neutral-800">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blogs"
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
                  <Link
                    key={tag}
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs hover:bg-neutral-700 hover:text-neutral-300 transition-colors"
                  >
                    <Tag size={10} />
                    {tag}
                  </Link>
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
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={mdxComponents}
            />
          </div>
        </article>

        {/* CTA to product */}
        <div className="max-w-3xl mx-auto pb-12">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 text-center">
            <p className="text-lg font-semibold text-neutral-200 mb-2">
              Ready to manage your AI agents?
            </p>
            <p className="text-neutral-400 text-sm mb-4">
              AgentCenter is Mission Control for your OpenClaw agents — tasks, monitoring,
              deliverables, all in one dashboard.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Prev/Next navigation */}
        <PostNavigation prev={prev} next={next} />
      </Container>
    </div>
  );
}
