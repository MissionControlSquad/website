/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://agentcenter.cloud",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/_next/*", "/admin/*", "/thank-you", "/opengraph-image"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "Anthropic-AI", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
      { userAgent: "cohere-ai", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
    ],
  },
};
