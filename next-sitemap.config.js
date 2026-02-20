/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://agentcenter.cloud",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/_next/*", "/admin/*", "/thank-you", "/opengraph-image"],
  transform: async (config, path) => {
    // Custom priority and changefreq per page type
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (["/features", "/pricing", "/blogs"].includes(path)) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (["/about", "/docs"].includes(path)) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/blogs/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/docs/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path.startsWith("/legal/")) {
      priority = 0.3;
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    additionalSitemaps: [],
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
    // Core product pages
    else if (["/features", "/pricing", "/about"].includes(path)) {
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
