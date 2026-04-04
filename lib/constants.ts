// Site-wide constants

export const CONTACT_EMAIL = "dharmendra@agentcenter.cloud";

export const CAL_LINK = "https://cal.com/dharmikjagodana/agentcenter";

export const SITE_CONFIG = {
  name: "AgentCenter",
  tagline: "Mission Control for Your OpenClaw Agents",
  description:
    "Mission Control dashboard for your OpenClaw agents. Assign tasks, monitor progress, review deliverables, and coordinate your AI team — all from one place.",
  url: "https://agentcenter.cloud",
} as const;

/** Absolute URL for the default Open Graph / Twitter share image (1200×630). */
export const OG_IMAGE_URL = `${SITE_CONFIG.url}/opengraph-image.png`;

/** Default OG image object for metadata. Override `alt` per page when needed. */
export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "AgentCenter",
} as const;

/** Twitter image object with type/width/height so twitter:image:* meta tags render. */
export const TWITTER_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

/**
 * Per-page OG image. Pass the slug used in generate-all-og-images.mjs
 * (e.g. "pricing", "compare-vs-crewai", "blog-some-slug").
 * Compatible with both openGraph.images and twitter.images.
 */
export function ogImage(slug: string, alt = "AgentCenter") {
  return {
    url: `${SITE_CONFIG.url}/og/${slug}.png`,
    width: 1200,
    height: 630,
    alt,
    type: "image/png" as const,
  };
}

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blogs" },
  { label: "Affiliate", href: "/affiliate" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Pricing", href: "/pricing" },
    { label: "Self-Hosting", href: "/self-hosting" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blogs" },
    { label: "FAQ", href: "/faq" },
    { label: "Changelog", href: "/changelog" },
    { label: "Affiliate", href: "/affiliate" },
  ],
  features: [
    { label: "Features", href: "/features" },
    { label: "Agent Dashboard", href: "/features/agent-dashboard" },
    { label: "Task Orchestration", href: "/features/task-orchestration" },
    { label: "Agent Monitoring", href: "/features/agent-monitoring" },
    { label: "Multi-Agent Workflows", href: "/features/multi-agent-workflows" },
  ],
  comparisons: [
    { label: "All Comparisons", href: "/compare" },
    { label: "vs Mission Control HQ", href: "/compare/vs-mission-control-hq" },
    { label: "vs CrewAI", href: "/compare/vs-crewai" },
    { label: "vs LangSmith", href: "/compare/vs-langsmith" },
    { label: "vs AgentOps", href: "/compare/vs-agentops" },
    { label: "vs Relevance AI", href: "/compare/vs-relevance-ai" },
    { label: "vs SuperAGI", href: "/compare/vs-superagi" },
    { label: "vs Lindy AI", href: "/compare/vs-lindy-ai" },
    { label: "vs MindStudio", href: "/compare/vs-mindstudio" },
    { label: "vs Lyzr", href: "/compare/vs-lyzr" },
    { label: "vs DIY Management", href: "/compare/vs-diy-agent-management" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://x.com/AgentsCenter", icon: "Twitter" },
  { label: "Discord", href: "https://discord.gg/rXpjytYr", icon: "MessageCircle" },
  { label: "GitHub", href: "https://github.com/MissionControlSquad", icon: "Github" },
] as const;

/** Billing period type */
export type BillingPlan = (typeof BILLING_PLANS)[number];
export const BILLING_PLANS = ["monthly", "yearly"] as const;
export const DEFAULT_PLAN: BillingPlan = "monthly";

/** Plan tier type */
export const PLAN_KEYS = ["starter", "pro", "scale"] as const;
export type PlanKey = (typeof PLAN_KEYS)[number];
export const DEFAULT_TIER: PlanKey = PLAN_KEYS[0];

/** Plan definitions */
export const PLANS = {
  starter: {
    name: "Starter",
    description: "For solo developers and early testing",
    monthly: 14,
    yearly: 140,
    agents: 5,
    projects: 3,
    recommended: false,
  },
  pro: {
    name: "Pro",
    description: "The smart choice for growing teams",
    monthly: 29,
    yearly: 290,
    agents: 15,
    projects: 15,
    recommended: true,
  },
  scale: {
    name: "Scale",
    description: "Serious AI operations without limits",
    monthly: 79,
    yearly: 790,
    agents: 50,
    projects: 50,
    recommended: false,
  },
} as const satisfies Record<
  PlanKey,
  {
    name: string;
    description: string;
    monthly: number;
    yearly: number;
    agents: number;
    projects: number;
    recommended: boolean;
  }
>;

/** Lifetime deal pricing configuration */
export const LIFETIME_DEAL = {
  startingPrice: 259,
  totalSeats: 100,
  seatsPerTier: 25,
} as const;

/** Self-hosting pricing configuration */
export const SELFHOSTING_PRICING = {
  monthly: 99,
  yearly: 999, // $99 × 12 = $1,188 − ~15.9% ≈ $999 (displayed as ~16% off)
  yearlyDiscount: 16,
  currency: "USD",
} as const;

/** Affiliate program configuration */
export const AFFILIATE = {
  commissionRate: 0.3, // 30%
  commissions: {
    starter: +(PLANS.starter.monthly * 0.3).toFixed(2), // $4.20
    pro: +(PLANS.pro.monthly * 0.3).toFixed(2), // $8.70
    scale: +(PLANS.scale.monthly * 0.3).toFixed(2), // $23.70
  },
  url: "https://agentcenter-cloud.endorsely.com",
} as const;

export const TRUST_INDICATORS = ["Cancel anytime", "No lock-in", "Powered by Stripe"] as const;

export const FEATURES = [
  {
    title: "Kanban Board",
    description:
      "Visual task management for AI agents. Drag, drop, and organize work across columns.",
    icon: "LayoutGrid",
  },
  {
    title: "Real-time Agent Status",
    description:
      "See what each agent is doing live. Online, working, idle, or blocked — at a glance.",
    icon: "Activity",
  },
  {
    title: "@Mentions & Chat",
    description: "Communicate with agents in task threads. Tag them, ask questions, give feedback.",
    icon: "AtSign",
  },
  {
    title: "Deliverable Review",
    description:
      "The lead agent verifies deliverables — code, docs, files. Everything tracked and checked in one place.",
    icon: "FileCheck",
  },
  {
    title: "Activity Feed",
    description:
      "Live stream of all agent actions. Know what's happening across your team in real-time.",
    icon: "History",
  },
  {
    title: "Lead Orchestrator",
    description:
      "A lead agent handles task verification and checks deliverables before they move forward.",
    icon: "ShieldCheck",
  },
] as const;

export const FEATURE_CATEGORIES = [
  {
    id: "project-management",
    label: "Project Management",
    icon: "FolderKanban",
    features: [
      {
        title: "Projects & Workspaces",
        description:
          "Organize agents and tasks into separate project workspaces with their own boards and settings.",
        icon: "FolderKanban",
      },
      {
        title: "Project Knowledge Base",
        description:
          "Attach docs, notes, and context to each project so agents always have the info they need.",
        icon: "BookOpen",
      },
      {
        title: "Task Templates",
        description:
          "Create reusable task templates to standardize workflows and save time on recurring work.",
        icon: "Copy",
      },
      {
        title: "Parent-Child Tasks",
        description:
          "Break complex tasks into subtasks with parent-child relationships for better tracking.",
        icon: "GitBranch",
      },
      {
        title: "Task Blocking",
        description:
          "Set task dependencies so blocked work is clearly visible and agents know the correct order.",
        icon: "Ban",
      },
    ],
  },
  {
    id: "agent-management",
    label: "Agent Management",
    icon: "Bot",
    features: [
      {
        title: "Agent Setup Wizard",
        description:
          "Step-by-step wizard to configure new agents — name, role, capabilities, and API keys.",
        icon: "Wand",
      },
      {
        title: "120+ Agent Templates",
        description:
          "Pre-built agent templates for common roles: developer, researcher, writer, reviewer, and more.",
        icon: "Users",
      },
      {
        title: "Agent Heartbeat & Auto-Sleep",
        description:
          "Automatic health monitoring. Agents that go silent are flagged and put to sleep to save resources.",
        icon: "HeartPulse",
      },
      {
        title: "Agent Personal Queue",
        description:
          "Each agent has a dedicated task queue showing their assigned work in priority order.",
        icon: "ListTodo",
      },
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: "MessageCircle",
    features: [
      {
        title: "Tags",
        description:
          "Label tasks with custom tags for easy filtering and organization across projects.",
        icon: "Tag",
      },
      {
        title: "Emoji Reactions",
        description:
          "React to agent messages and deliverables with emoji for quick feedback without typing.",
        icon: "Smile",
      },
      {
        title: "Due Dates",
        description:
          "Set deadlines on tasks to keep agents on schedule and surface overdue work automatically.",
        icon: "Calendar",
      },
      {
        title: "Global Search",
        description:
          "Search across all tasks, messages, deliverables, and agents from one unified search bar.",
        icon: "Search",
      },
    ],
  },
  {
    id: "deliverables-quality",
    label: "Deliverables & Quality",
    icon: "FileCheck",
    features: [
      {
        title: "File Uploads",
        description:
          "Attach files, images, and documents directly to tasks for agents to reference or deliver.",
        icon: "Upload",
      },
      {
        title: "Deliverable Versioning",
        description:
          "Track every version of a deliverable with full history so you can compare and roll back.",
        icon: "GitCommit",
      },
      {
        title: "Approval Workflows",
        description:
          "The lead agent verifies deliverables before they move forward — approve, reject, or request changes automatically.",
        icon: "CheckSquare",
      },
    ],
  },
  {
    id: "monitoring-audit",
    label: "Monitoring & Audit",
    icon: "Activity",
    features: [
      {
        title: "Work Session Tracking",
        description:
          "See exactly when agents start and stop working, with duration tracking for each session.",
        icon: "Clock",
      },
      {
        title: "Status History & Audit Trail",
        description:
          "Full audit log of every status change, assignment, and action taken on every task.",
        icon: "History",
      },
    ],
  },
] as const;

export const USE_CASES = [
  {
    title: "AI Research Teams",
    description:
      "Agents collect, analyze, and synthesize information across sources automatically.",
    icon: "Search",
    href: "/blogs/complete-guide-ai-agent-management-2026",
  },
  {
    title: "Autonomous Product Builders",
    description: "Agents generate ideas, write code, run tests, and deploy — end to end.",
    icon: "Bot",
    href: "/blogs/ai-agent-deployment-prototype-to-production",
  },
  {
    title: "Automated Business Operations",
    description: "Agents handle repetitive workflows so your team focuses on what matters.",
    icon: "Zap",
    href: "/blogs/ai-agent-lifecycle-framework",
  },
  {
    title: "Data Monitoring Systems",
    description: "Agents track metrics, detect anomalies, and generate alerts in real time.",
    icon: "Activity",
    href: "/blogs/ai-agent-monitoring-best-practices-2026",
  },
] as const;

export const SOCIAL_PROOF = {
  metrics: [
    { value: "500+", label: "Agents managed" },
    { value: "12k+", label: "Tasks completed" },
    { value: "40+", label: "Teams onboarded" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
  testimonials: [
    {
      name: "Marcus R.",
      handle: "@marcus_builds",
      initials: "MR",
      role: "Indie AI Builder",
      quote:
        "AgentCenter is the missing layer between my agents and my goals. I went from manually babysitting 3 agents to orchestrating 15 — autonomously. The kanban view alone saved me hours a week.",
    },
    {
      name: "Priya S.",
      handle: "@priyashipscode",
      initials: "PS",
      role: "Founder, AI-first Startup",
      quote:
        "We replaced Notion + Slack + custom scripts with AgentCenter. Our research agent, dev agent, and QA agent now handoff work automatically. It feels like running a real team.",
    },
    {
      name: "Tom L.",
      handle: "@tomlangchain",
      initials: "TL",
      role: "ML Engineer",
      quote:
        "The activity feed is a game changer. I can see exactly what each agent is doing, what it delivered, and where it got stuck. No more digging through logs to figure out what happened.",
    },
  ],
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Connect Your Agents",
    description:
      "Integrate via API or framework connectors. Bring your own agents — any stack, any language.",
    icon: "Zap",
  },
  {
    number: 2,
    title: "Assign Tasks",
    description:
      "Create workflows and assign tasks to your AI agents. Set priorities, deadlines, and dependencies.",
    icon: "ListTodo",
  },
  {
    number: 3,
    title: "Monitor Execution",
    description:
      "Track progress, logs, and outputs in real time. Review deliverables and ship with confidence.",
    icon: "Activity",
  },
] as const;
