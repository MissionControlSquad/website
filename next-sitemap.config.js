/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const nodePath = require("path");
const matter = require("gray-matter");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agentcenter.cloud";

function getBlogLastmod(slug) {
  const filePath = nodePath.join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  const d = data.dateModified || data.date;
  return d ? new Date(d).toISOString() : null;
}

const disallow = ["/api/", "/admin/", "/thank-you"];

const exclude = [...disallow, "/**/opengraph-image", "/**/twitter-image"];

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  exclude,

  transform: async (config, url) => {
    const path = url.replace(siteUrl, "");

    // Per-URL priority + changefreq (mirrors existing priorities)
    const rules = [
      { match: /^\/$/, priority: 1.0, changefreq: "daily" },
      { match: /^\/features$/, priority: 0.9, changefreq: "weekly" },
      { match: /^\/pricing$/, priority: 0.9, changefreq: "weekly" },
      { match: /^\/about$/, priority: 0.9, changefreq: "weekly" },
      { match: /^\/self-hosting$/, priority: 0.9, changefreq: "weekly" },
      { match: /^\/compare$/, priority: 0.85, changefreq: "monthly" },
      { match: /^\/compare\/[^/]+$/, priority: 0.8, changefreq: "monthly" },
      { match: /^\/faq$/, priority: 0.8, changefreq: "monthly" },
      { match: /^\/docs$/, priority: 0.8, changefreq: "weekly" },
      { match: /^\/docs\/[^/]+$/, priority: 0.8, changefreq: "weekly" },
      { match: /^\/blogs$/, priority: 0.8, changefreq: "daily" },
      { match: /^\/testimonials$/, priority: 0.7, changefreq: "weekly" },
      { match: /^\/affiliate$/, priority: 0.7, changefreq: "monthly" },
      { match: /^\/changelog$/, priority: 0.7, changefreq: "weekly" },
      { match: /^\/blogs\/[^/]+$/, priority: 0.7, changefreq: "monthly" },
      { match: /^\/legal\//, priority: 0.3, changefreq: "yearly" },
    ];

    const rule = rules.find((r) => r.match.test(path));

    const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
    const lastmod = blogMatch
      ? (getBlogLastmod(blogMatch[1]) ?? new Date().toISOString())
      : new Date().toISOString();

    return {
      loc: url,
      changefreq: rule?.changefreq ?? config.changefreq,
      priority: rule?.priority ?? config.priority,
      lastmod,
    };
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
    ],

    transformRobotsTxt: async (_, robotsTxt) => {
      const llmLines = [
        "",
        "# LLM Context Files",
        "# See https://llmstxt.org for the specification",
        `Sitemap: ${siteUrl}/llms.txt`,
      ];
      return robotsTxt + llmLines.join("\n");
    },
  },
};
