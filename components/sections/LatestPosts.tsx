"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "@/components/icons";
import { Container } from "@/components/ui/Container";

interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

interface LatestPostsProps {
  posts: PostSummary[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-neutral-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">From the Blog</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Insights on managing AI agent teams, workflows, and the future of multi-agent
            operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-neutral-400 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-3 mb-4">{post.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary-400 group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-700 text-neutral-300 hover:text-neutral-100 hover:border-neutral-500 transition-all"
          >
            View all posts
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
