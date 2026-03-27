"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "@/components/icons";
import type { BlogPost } from "@/lib/blog";

interface TagInfo {
  tag: string;
  count: number;
}

interface Props {
  allPosts: BlogPost[];
  allTags: TagInfo[];
}

const POSTS_PER_PAGE = 8;
const TAGS_VISIBLE = 10;

export function BlogList({ allPosts, allTags }: Props) {
  const [showAllTags, setShowAllTags] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTag = searchParams.get("tag") ?? undefined;
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const filteredPosts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const pageStart = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const featuredPost = safePage === 1 ? pagePosts[0] : null;
  const gridPosts = safePage === 1 ? pagePosts.slice(1) : pagePosts;

  function pageHref(page: number) {
    const p = new URLSearchParams();
    if (activeTag) p.set("tag", activeTag);
    if (page > 1) p.set("page", String(page));
    const qs = p.toString();
    return `/blogs${qs ? `?${qs}` : ""}`;
  }

  function tagHref(tag?: string) {
    if (!tag) return "/blogs";
    return `/blogs?tag=${encodeURIComponent(tag)}`;
  }

  return (
    <div className="py-10">
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">Filter:</span>

            {/* "All" pill — always visible */}
            <Link
              href={tagHref()}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                !activeTag
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              All
              <span className="ml-1.5 text-neutral-500 text-[10px]">{allPosts.length}</span>
            </Link>

            {/* Visible tags */}
            {allTags.slice(0, TAGS_VISIBLE).map(({ tag, count }) => (
              <Link
                key={tag}
                href={tagHref(tag)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTag === tag
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                    : "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 hover:border-neutral-600 hover:text-neutral-300"
                }`}
              >
                <Tag size={9} />
                {tag}
                <span className="text-neutral-500 text-[10px]">{count}</span>
              </Link>
            ))}

            {/* Hidden tags — in DOM for SEO, visually hidden until expanded */}
            {allTags.length > TAGS_VISIBLE && (
              <>
                <span aria-hidden={!showAllTags} className={showAllTags ? "contents" : "hidden"}>
                  {allTags.slice(TAGS_VISIBLE).map(({ tag, count }) => (
                    <Link
                      key={tag}
                      href={tagHref(tag)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                        activeTag === tag
                          ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                          : "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 hover:border-neutral-600 hover:text-neutral-300"
                      }`}
                    >
                      <Tag size={9} />
                      {tag}
                      <span className="text-neutral-500 text-[10px]">{count}</span>
                    </Link>
                  ))}
                </span>

                <button
                  onClick={() => setShowAllTags((v) => !v)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                    showAllTags
                      ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  }`}
                >
                  {showAllTags ? "Show less" : `+${allTags.length - TAGS_VISIBLE} more`}
                </button>
              </>
            )}
          </div>

          {/* SEO-only: all tags hidden from view but present in HTML */}
          <div className="sr-only" aria-hidden="true">
            {allTags.slice(TAGS_VISIBLE).map(({ tag }) => (
              <Link key={tag} href={tagHref(tag)} tabIndex={-1}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {pagePosts.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">
          {activeTag ? `No posts found with tag "${activeTag}".` : "No posts yet. Check back soon."}
        </p>
      ) : (
        <>
          {/* Featured post — only on page 1 */}
          {featuredPost && (
            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="group block mb-8 p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
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

          {/* Posts grid */}
          {gridPosts.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {gridPosts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col h-full p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-2.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-neutral-100 group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2 flex-1">
                      {post.description}
                    </p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-500 text-[10px]"
                          >
                            <Tag size={8} />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-500 text-[10px]">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-12">
              <Link
                href={pageHref(safePage - 1)}
                aria-disabled={safePage === 1}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  safePage === 1
                    ? "pointer-events-none border-neutral-800 text-neutral-600"
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                }`}
              >
                <ArrowRight size={14} className="rotate-180" />
                Prev
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === safePage;
                const isNear = page === 1 || page === totalPages || Math.abs(page - safePage) <= 1;

                if (!isNear) {
                  if (page === 2 && safePage > 4) {
                    return (
                      <span key="ellipsis-start" className="text-neutral-600 px-1 text-sm">
                        …
                      </span>
                    );
                  }
                  if (page === totalPages - 1 && safePage < totalPages - 3) {
                    return (
                      <span key="ellipsis-end" className="text-neutral-600 px-1 text-sm">
                        …
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Link
                    key={page}
                    href={pageHref(page)}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${
                      isActive
                        ? "bg-primary-500/20 border-primary-500/40 text-primary-400"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}

              <Link
                href={pageHref(safePage + 1)}
                aria-disabled={safePage === totalPages}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  safePage === totalPages
                    ? "pointer-events-none border-neutral-800 text-neutral-600"
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                }`}
              >
                Next
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Post count summary */}
          <p className="text-center text-xs text-neutral-600 mt-4">
            {filteredPosts.length === 0
              ? "No posts"
              : `Showing ${pageStart + 1}–${Math.min(pageStart + POSTS_PER_PAGE, filteredPosts.length)} of ${filteredPosts.length} post${filteredPosts.length !== 1 ? "s" : ""}`}
          </p>
        </>
      )}
    </div>
  );
}
