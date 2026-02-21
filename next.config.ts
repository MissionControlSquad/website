import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    unoptimized: true,
  },
  // Redirects and headers are handled by Cloudflare Pages
  // via public/_redirects and public/_headers
};

export default nextConfig;
