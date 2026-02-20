import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  content: string;
}

export interface DocCategory {
  name: string;
  slug: string;
  order: number;
  docs: DocPage[];
}

export function getAllDocs(): DocPage[] {
  if (!fs.existsSync(DOCS_DIR)) return [];

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        category: data.category ?? "General",
        order: data.order ?? 99,
        content,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string): DocPage | undefined {
  const docs = getAllDocs();
  return docs.find((d) => d.slug === slug);
}

export function getDocsByCategory(): DocCategory[] {
  const docs = getAllDocs();
  const categoryMap = new Map<string, DocPage[]>();

  const categoryOrder: Record<string, number> = {
    "Getting Started": 1,
    "Core Concepts": 2,
    "Help Center": 3,
    "API Reference": 4,
  };

  for (const doc of docs) {
    const existing = categoryMap.get(doc.category) ?? [];
    existing.push(doc);
    categoryMap.set(doc.category, existing);
  }

  return Array.from(categoryMap.entries())
    .map(([name, docs]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      order: categoryOrder[name] ?? 99,
      docs: docs.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order);
}
