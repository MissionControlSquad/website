import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import type { BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-neutral-800 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-neutral-100 mb-8">Related Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block p-5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="text-base font-semibold text-neutral-200 group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{post.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary-400 group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
