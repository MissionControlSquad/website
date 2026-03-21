/**
 * Generates per-page OG images for AgentCenter.
 * Outputs all images to public/og/ as static PNG files.
 *
 * Run: node scripts/generate-all-og-images.mjs
 */

import fs from "fs";
import path from "path";
import { generateOgImage } from "./og-image-generator.mjs";

const OUT_DIR = path.join(process.cwd(), "public/og");
const BLOG_DIR = path.join(process.cwd(), "content/blog");

// ─── Accent colours ──────────────────────────────────────────────────────────
const BLUE   = "#0ea5e9"; // brand default
const PURPLE = "#a855f7"; // comparisons
const AMBER  = "#f59e0b"; // blog
const TEAL   = "#14b8a6"; // docs

// ─── Static page definitions ─────────────────────────────────────────────────
const PAGES = [
  // Core marketing
  {
    slug: "home",
    category: null,
    title: "Mission Control for Your AI Agents",
    subtitle: "Assign tasks, monitor progress, review deliverables, and coordinate your AI team — all from one place.",
    accentColor: BLUE,
  },
  {
    slug: "pricing",
    category: null,
    title: "Simple, Transparent Pricing",
    subtitle: "14-day free trial, then $79/month. One plan, everything included. Unlimited agents, unlimited tasks.",
    accentColor: BLUE,
  },
  {
    slug: "about",
    category: null,
    title: "About AgentCenter",
    subtitle: "Mission Control for your OpenClaw agent teams. One dashboard for tasks, monitoring, and deliverables.",
    accentColor: BLUE,
  },
  {
    slug: "faq",
    category: null,
    title: "FAQ — AgentCenter Questions Answered",
    subtitle: "Pricing, setup, technical details, use cases, and troubleshooting.",
    accentColor: BLUE,
  },
  {
    slug: "testimonials",
    category: null,
    title: "What Teams Say About AgentCenter",
    subtitle: "How developers, founders, and agencies coordinate their AI agent teams.",
    accentColor: BLUE,
  },
  {
    slug: "changelog",
    category: null,
    title: "AgentCenter Changelog",
    subtitle: "New features, improvements, and bug fixes — documented with every release.",
    accentColor: BLUE,
  },
  {
    slug: "self-hosting",
    category: null,
    title: "Self-Hosted AI Agent Dashboard",
    subtitle: "Run AgentCenter on your own server. Full Docker image, your data stays on your machine.",
    accentColor: BLUE,
  },
  {
    slug: "affiliate",
    category: null,
    title: "Affiliate Program — Earn 30% Commission",
    subtitle: "Join AgentCenter's affiliate program. Earn recurring commission on every referral.",
    accentColor: BLUE,
  },
  {
    slug: "lifetime-deal",
    category: null,
    title: "Lifetime Deal — Own AgentCenter Forever",
    subtitle: "Limited to 100 seats. Starting at $259, price increases every 25 seats.",
    accentColor: BLUE,
  },
  {
    slug: "pricing-drop",
    category: null,
    title: "People Said AgentCenter Is Too Expensive.",
    subtitle: "A live pricing experiment. The more people join, the lower the price drops. Join before the timer ends.",
    accentColor: BLUE,
  },

  // Blog listing
  {
    slug: "blog",
    category: "BLOG",
    title: "AI Agent Management Insights",
    subtitle: "Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    accentColor: AMBER,
  },

  // Docs
  {
    slug: "docs",
    category: "DOCS",
    title: "AgentCenter Documentation",
    subtitle: "Get started, set up AI agents, manage projects and tasks, review deliverables.",
    accentColor: TEAL,
  },

  // Features
  {
    slug: "features",
    category: "FEATURE",
    title: "AI Agent Management Dashboard",
    subtitle: "Kanban task management, real-time agent status, deliverable review, and audit trails.",
    accentColor: BLUE,
  },
  {
    slug: "features-agent-dashboard",
    category: "FEATURE",
    title: "AI Agent Dashboard",
    subtitle: "Real-time visibility into every agent's status, tasks, and deliverables. One unified view.",
    accentColor: BLUE,
  },
  {
    slug: "features-task-orchestration",
    category: "FEATURE",
    title: "AI Agent Task Orchestration",
    subtitle: "Assign, track, and complete work automatically. Let your agents self-coordinate.",
    accentColor: BLUE,
  },
  {
    slug: "features-agent-monitoring",
    category: "FEATURE",
    title: "AI Agent Monitoring",
    subtitle: "Track heartbeats, detect stalled agents, review activity logs. 24/7 visibility.",
    accentColor: BLUE,
  },
  {
    slug: "features-multi-agent-workflows",
    category: "FEATURE",
    title: "Multi-Agent Workflows",
    subtitle: "Coordinate specialized AI agents, manage dependencies, and ship work faster.",
    accentColor: BLUE,
  },

  // SEO landing pages
  {
    slug: "ai-agent-dashboard",
    category: null,
    title: "AI Agent Dashboard",
    subtitle: "Monitor, manage, and coordinate your AI team. Real-time status, Kanban tasks, deliverable review.",
    accentColor: BLUE,
  },
  {
    slug: "ai-agent-management-platform",
    category: null,
    title: "AI Agent Management Platform",
    subtitle: "Assign tasks, enforce quality with lead review, and manage your AI workforce from one platform.",
    accentColor: BLUE,
  },
  {
    slug: "ai-agent-orchestration",
    category: null,
    title: "AI Agent Orchestration",
    subtitle: "Coordinate multi-agent workflows with a built-in lead agent. No custom code required.",
    accentColor: BLUE,
  },
  {
    slug: "multi-agent-system-dashboard",
    category: null,
    title: "Multi-Agent System Dashboard",
    subtitle: "Monitor every agent in one view. See who's working, who's blocked, and what shipped.",
    accentColor: BLUE,
  },

  // Docs sub-pages
  {
    slug: "docs-getting-started",
    category: "DOCS",
    title: "Getting Started with AgentCenter",
    subtitle: "Connect your first AI agent in minutes. No API docs required — we give you config files.",
    accentColor: TEAL,
  },
  {
    slug: "docs-how-agents-work",
    category: "DOCS",
    title: "How AI Agents Work in AgentCenter",
    subtitle: "Heartbeat, tasks, and review explained. The complete agent lifecycle.",
    accentColor: TEAL,
  },
  {
    slug: "docs-projects",
    category: "DOCS",
    title: "Projects in AgentCenter",
    subtitle: "Create and manage AI agent workspaces. Build your team, assign a lead agent, add docs.",
    accentColor: TEAL,
  },
  {
    slug: "docs-agents",
    category: "DOCS",
    title: "Managing AI Agents in AgentCenter",
    subtitle: "Setup, configuration, and squad monitoring. Track heartbeat health for every agent.",
    accentColor: TEAL,
  },
  {
    slug: "docs-tasks",
    category: "DOCS",
    title: "Task Management for AI Agents",
    subtitle: "Kanban board, task detail, and workflow. The full task lifecycle from inbox to done.",
    accentColor: TEAL,
  },
  {
    slug: "docs-review",
    category: "DOCS",
    title: "Review & Deliverables in AgentCenter",
    subtitle: "Approve, reject, and manage agent output. Lead agent review and approval workflow.",
    accentColor: TEAL,
  },
  {
    slug: "docs-templates",
    category: "DOCS",
    title: "Task Templates & Recurring Tasks",
    subtitle: "Create reusable task blueprints. Automate daily, weekly, or monthly agent work.",
    accentColor: TEAL,
  },
  {
    slug: "docs-analytics",
    category: "DOCS",
    title: "Analytics & Agent Monitoring",
    subtitle: "Track AI agent performance, task trends, workload distribution, and heartbeat health.",
    accentColor: TEAL,
  },
  {
    slug: "docs-chat",
    category: "DOCS",
    title: "Chat with AI Agents in AgentCenter",
    subtitle: "Ask for standups, status updates, and project briefings. Agents respond on heartbeat.",
    accentColor: TEAL,
  },
  {
    slug: "docs-cloud-vms",
    category: "DOCS",
    title: "Cloud VMs for AI Agents",
    subtitle: "Deploy and run agents 24/7 without managing servers, cron jobs, or infrastructure.",
    accentColor: TEAL,
  },
  {
    slug: "docs-api-reference",
    category: "DOCS",
    title: "API Reference for AgentCenter",
    subtitle: "Custom integrations with Bearer token auth. HEARTBEAT.md and PLAYBOOK.md config files.",
    accentColor: TEAL,
  },
  {
    slug: "docs-roadmap",
    category: "DOCS",
    title: "AgentCenter Roadmap",
    subtitle: "Upcoming features and planned improvements. Submit feature requests.",
    accentColor: TEAL,
  },

  // Legal
  {
    slug: "legal-privacy-policy",
    category: null,
    title: "Privacy Policy",
    subtitle: "How AgentCenter collects, uses, and protects your data.",
    accentColor: BLUE,
  },
  {
    slug: "legal-terms",
    category: null,
    title: "Terms of Service",
    subtitle: "The terms that govern your use of AgentCenter.",
    accentColor: BLUE,
  },

  // Not found
  {
    slug: "not-found",
    category: null,
    title: "Page Not Found",
    subtitle: "The page you're looking for doesn't exist. Head back to AgentCenter.",
    accentColor: BLUE,
  },

  // Thank-you (noindex but still has OG for direct links)
  {
    slug: "thank-you",
    category: null,
    title: "You're In — Welcome to AgentCenter",
    subtitle: "Your account is ready. Start managing your AI agents.",
    accentColor: BLUE,
  },

  // Compare index
  {
    slug: "compare",
    category: "COMPARISON",
    title: "AgentCenter vs Competitors",
    subtitle: "Side-by-side breakdowns of features, pricing, and use cases for every alternative.",
    accentColor: PURPLE,
  },

  // Comparisons
  {
    slug: "compare-vs-crewai",
    category: "COMPARISON",
    title: "AgentCenter vs CrewAI Cloud",
    subtitle: "Management dashboard vs. framework runtime. Features, pricing, and use cases side by side.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-agentops",
    category: "COMPARISON",
    title: "AgentCenter vs AgentOps",
    subtitle: "Agent management vs. agent observability. Understand the difference.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-langsmith",
    category: "COMPARISON",
    title: "AgentCenter vs LangSmith",
    subtitle: "Agent management vs. LLM observability. Features and use cases compared.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-diy-agent-management",
    category: "COMPARISON",
    title: "AgentCenter vs Building Your Own Dashboard",
    subtitle: "Build vs. buy for AI agent management. Costs, timelines, and trade-offs.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-lindy-ai",
    category: "COMPARISON",
    title: "AgentCenter vs Lindy AI",
    subtitle: "AI agent team management vs. personal AI assistants. Pricing and features.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-lyzr",
    category: "COMPARISON",
    title: "AgentCenter vs Lyzr Agent Studio",
    subtitle: "OpenClaw agent management vs. enterprise AI agent builder. Features and pricing.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-mindstudio",
    category: "COMPARISON",
    title: "AgentCenter vs MindStudio",
    subtitle: "AI agent management vs. no-code AI builder. Architecture, pricing, use cases.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-mission-control-hq",
    category: "COMPARISON",
    title: "AgentCenter vs Mission Control HQ",
    subtitle: "Side-by-side: pricing, features, and architecture for AI agent management.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-relevance-ai",
    category: "COMPARISON",
    title: "AgentCenter vs Relevance AI",
    subtitle: "Agent management and orchestration. Feature breakdown, pricing, and team collaboration.",
    accentColor: PURPLE,
  },
  {
    slug: "compare-vs-superagi",
    category: "COMPARISON",
    title: "AgentCenter vs SuperAGI",
    subtitle: "Team management dashboard vs. autonomous agent execution platform.",
    accentColor: PURPLE,
  },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────
function readBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");

    // Extract title from frontmatter
    const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    const descMatch = content.match(/^description:\s*["']?(.+?)["']?\s*$/m);

    if (titleMatch) {
      posts.push({
        slug: `blog-${slug}`,
        category: "BLOG",
        title: titleMatch[1].trim(),
        subtitle: descMatch ? descMatch[1].trim() : "AgentCenter Blog",
        accentColor: AMBER,
      });
    }
  }

  return posts;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const allPages = [...PAGES, ...readBlogPosts()];

  console.log(`Generating ${allPages.length} OG images → public/og/\n`);

  let ok = 0;
  let fail = 0;

  for (const page of allPages) {
    const outputPath = path.join(OUT_DIR, `${page.slug}.png`);
    try {
      const info = await generateOgImage({
        category: page.category,
        title: page.title,
        subtitle: page.subtitle,
        outputPath,
        accentColor: page.accentColor,
      });
      console.log(`  ✓  ${page.slug}.png  (${info.width}×${info.height}, ${Math.round(info.size / 1024)}KB)`);
      ok++;
    } catch (err) {
      console.error(`  ✗  ${page.slug}.png  — ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} generated, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
