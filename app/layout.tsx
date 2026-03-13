import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { JsonLdScript } from "next-seo";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG, OG_IMAGE_URL } from "@/lib/constants";
import "./globals.css";

const GTM_ID = "GTM-WSR54GVV";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "AgentCenter — Mission Control for Your OpenClaw Agents",
    template: "%s | AgentCenter",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "AgentCenter",
    "OpenClaw dashboard",
    "OpenClaw agent management",
    "mission control AI agents",
    "AI agent dashboard",
    "AI agent management platform",
    "AI agent orchestration",
    "manage AI agents",
    "AI agent task management",
    "multi-agent task management",
    "human-in-the-loop AI",
    "AI agent oversight tool",
    "monitor OpenClaw agents",
    "Kanban for AI teams",
  ],
  authors: [{ name: "Jagodana LLC", url: "https://www.jagodana.com" }],
  creator: "Jagodana LLC",
  publisher: "Jagodana LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    images: [ogImage("home", "AgentCenter — Mission Control for Your OpenClaw Agents")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    creator: "@AgentsCenter",
    site: "@AgentsCenter",
    images: [ogImage("home")],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    // Replace placeholder values with actual verification codes from each search engine console
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    // Bing verification via meta tag
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION
        ? { "baidu-site-verification": process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION }
        : {}),
    },
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite — enables sitelinks search box potential
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-US",
    },
    // WebPage — main landing page
    {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/#webpage`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — Mission Control for Your OpenClaw Agents`,
      description: SITE_CONFIG.description,
      isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
      about: { "@id": `${SITE_CONFIG.url}/#software` },
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-US",
      datePublished: "2025-01-01",
    },
    // Organization — company info for knowledge panel
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: "Jagodana LLC",
      legalName: "Jagodana LLC",
      url: "https://www.jagodana.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/android-icon-192x192.png`,
        width: 192,
        height: 192,
      },
      image: OG_IMAGE_URL,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer support",
        availableLanguage: "English",
      },
      sameAs: ["https://x.com/AgentsCenter"],
    },
    // SoftwareApplication — app listing in search
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_CONFIG.url}/#software`,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      offers: {
        "@type": "Offer",
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: `${new Date().getFullYear()}-12-31`,
        availability: "https://schema.org/OnlineOnly",
        url: SITE_CONFIG.url,
        description: "14-day free trial, then $79/month — full access to Mission Control dashboard",
      },
      featureList: [
        "Kanban board for AI agent tasks",
        "Real-time agent status monitoring",
        "Lead/Orchestrator verification workflows",
        "@Mentions for agent communication",
        "Deliverable review and tracking",
        "Activity feed with live updates",
        "Unlimited AI agents",
        "Advanced analytics",
        "Projects and workspaces",
        "Project knowledge base",
        "Task templates",
        "Parent-child subtasks",
        "Task blocking and dependencies",
        "Agent setup wizard",
        "12 pre-built agent templates",
        "Agent heartbeat and auto-sleep",
        "Agent personal task queue",
        "Tags and labeling",
        "Emoji reactions",
        "Due dates and deadlines",
        "Global search",
        "File uploads",
        "Deliverable versioning",
        "Approval workflows",
        "Work session tracking",
        "Status history and audit trail",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
          crossOrigin="anonymous"
        />
        <JsonLdScript data={jsonLd} scriptKey="root-graph" />
        {/* Google Tag Manager — manages GA4, Google Ads, and Meta Pixel */}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}
        suppressHydrationWarning
      >
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
