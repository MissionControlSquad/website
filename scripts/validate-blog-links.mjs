/**
 * Validates that published blog posts don't link to future-dated or non-existent posts.
 * Runs as part of the build process to catch broken cross-references early.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const now = new Date();
let errors = 0;

// Load all posts with their dates
const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
const posts = new Map();

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const date = new Date(data.date);
  posts.set(slug, { date, content, file });
}

// Check each published post for links to future or non-existent posts
for (const [slug, post] of posts) {
  if (post.date > now) continue; // Skip future posts

  // Find all internal blog links: /blogs/slug or /blog/slug
  const linkPattern = /\[([^\]]*)\]\(\/blogs?\/([a-z0-9-]+)\)/g;
  let match;

  while ((match = linkPattern.exec(post.content)) !== null) {
    const linkText = match[1];
    const linkedSlug = match[2];
    const fullMatch = match[0];

    // Check wrong prefix
    if (fullMatch.includes("/blog/") && !fullMatch.includes("/blogs/")) {
      console.error(
        `ERROR: ${post.file} uses /blog/ (singular) instead of /blogs/: ${fullMatch}`
      );
      errors++;
    }

    // Check if target exists
    if (!posts.has(linkedSlug)) {
      console.error(
        `ERROR: ${post.file} links to non-existent post: ${linkedSlug}`
      );
      errors++;
      continue;
    }

    // Check if target is future-dated
    const target = posts.get(linkedSlug);
    if (target.date > now) {
      console.error(
        `ERROR: ${post.file} (${post.date.toISOString().split("T")[0]}) links to future post: ${linkedSlug} (${target.date.toISOString().split("T")[0]})`
      );
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} broken blog cross-reference(s) found. Fix before deploying.`);
  process.exit(1);
} else {
  console.log("All blog cross-references valid.");
}
