import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://analytics.ahrefs.com https://assets.endorsely.com https://*.googleadservices.com https://*.doubleclick.net https://static.ads-twitter.com https://static.hotjar.com https://*.hotjar.com https://js.hs-scripts.com https://*.hsforms.net https://*.hubspot.com https://*.hsappstatic.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.google.com https://*.google.co.in https://*.google.co.uk https://*.google.co.jp https://*.google.de https://*.google.fr https://*.google.com.au https://*.google.ca https://*.google.com.br https://*.doubleclick.net https://*.googleadservices.com https://api.producthunt.com https://t.co https://analytics.twitter.com https://*.hotjar.com https://*.hubspot.com https://*.hsappstatic.net",
  "font-src 'self' data: https://*.hsappstatic.net",
  [
    "connect-src 'self'",
    "https://api.console.buildbase.app",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://ssl.google-analytics.com",
    "https://analytics.ahrefs.com",
    "https://app.endorsely.com",
    "https://*.googleadservices.com",
    "https://*.google.com",
    "https://*.google.co.in",
    "https://*.google.co.uk",
    "https://*.google.co.jp",
    "https://*.google.de",
    "https://*.google.fr",
    "https://*.google.com.au",
    "https://*.google.ca",
    "https://*.google.com.br",
    "https://*.doubleclick.net",
    "https://t.co",
    "https://analytics.twitter.com",
    "https://*.hotjar.com",
    "https://*.hotjar.io",
    "https://*.hubspot.com",
    "https://*.hsforms.net",
    "https://*.hsappstatic.net",
    "https://js.hs-scripts.com",
    ...(isDev ? ["ws://localhost:* http://localhost:*"] : []),
  ].join(" "),
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://*.hotjar.com https://*.hubspot.com https://*.hsforms.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/docs/agent-lifecycle-and-tasks",
        destination: "/docs/how-agents-work",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/legal/terms",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
