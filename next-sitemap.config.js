/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://agentcenter.cloud",
  outDir: "out",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/_next/*",
    "/admin/*",
    "/thank-you",
    "/thank-you/*",
    "/lifetime-deal",
    "/opengraph-image.png",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/thank-you/", "/lifetime-deal"],
      },
    ],
    additionalSitemaps: ["https://agentcenter.cloud/llms.txt"],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq per page type
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage — highest priority
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }
    // Compare index
    else if (path === "/compare") {
      priority = 0.85;
      changefreq = "monthly";
    }
    // Comparison pages
    else if (path.startsWith("/compare/")) {
      priority = 0.8;
      changefreq = "monthly";
    }
    // FAQ
    else if (path === "/faq") {
      priority = 0.8;
      changefreq = "monthly";
    }
    // Changelog
    else if (path === "/changelog") {
      priority = 0.7;
      changefreq = "weekly";
    }
    // Core product pages
    else if (["/features", "/pricing", "/about", "/self-hosting"].includes(path)) {
      priority = 0.9;
      changefreq = "weekly";
    }
    // Documentation
    else if (path.startsWith("/docs")) {
      priority = 0.8;
      changefreq = "weekly";
    }
    // Blog listing
    else if (path === "/blogs") {
      priority = 0.8;
      changefreq = "daily";
    }
    // Blog posts
    else if (path.startsWith("/blogs/")) {
      priority = 0.7;
      changefreq = "monthly";
    }
    // Legal pages
    else if (path.startsWith("/legal/")) {
      priority = 0.3;
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  autoLastmod: true,
};
