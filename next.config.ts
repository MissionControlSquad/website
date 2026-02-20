import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["next-mdx-remote"],
  // Performance optimizations
  experimental: {
    // Enable optimized package imports for smaller bundles
    optimizePackageImports: ["framer-motion"],
  },

  // Image optimization
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Redirects (e.g. doc URL changes)
  redirects: async () => [
    {
      source: "/docs/agent-lifecycle-and-tasks",
      destination: "/docs/how-agents-work",
      permanent: true,
    },
    { source: "/blog", destination: "/blogs", permanent: true },
    { source: "/blog/:path*", destination: "/blogs/:path*", permanent: true },
    { source: "/privacy-policy", destination: "/legal/privacy-policy", permanent: true },
    { source: "/terms-of-service", destination: "/legal/terms", permanent: true },
  ],

  // Compression
  compress: true,

  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "index, follow",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
    // Cache static assets aggressively
    {
      source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*)\\.(js|css|woff|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // Bundle analyzer for debugging (uncomment when needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
};

export default nextConfig;
