import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  readingTime: string;
}

function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Mission Control Team",
      tags: data.tags ?? [],
      content,
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Mission Control Team",
    tags: data.tags ?? [],
    content,
    readingTime: calculateReadingTime(content),
  };
}

/** Get all unique tags across all posts, with counts */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Get related posts based on shared tags (excluding the current post) */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  const scored = posts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((t) => currentTags.has(t)).length;
      return { post, score: sharedTags };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    );

  return scored.slice(0, limit).map((item) => item.post);
}

/** Get previous and next posts by date */
export function getAdjacentPosts(currentSlug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts(); // sorted newest first
  const index = posts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return { prev: null, next: null };

  return {
    // "next" = newer post (lower index)
    next: index > 0 ? posts[index - 1] : null,
    // "prev" = older post (higher index)
    prev: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

/** Get the latest N posts */
export function getLatestPosts(limit = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
