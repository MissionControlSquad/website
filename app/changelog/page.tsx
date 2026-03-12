import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ContentPage } from "@/components/ContentPage";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "All notable changes to AgentCenter. New features, improvements, and bug fixes — documented with every release.",
  alternates: { canonical: `${SITE_CONFIG.url}/changelog` },
  openGraph: {
    title: "Changelog | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "All notable changes to AgentCenter. New features, improvements, and bug fixes — documented with every release.",
    url: `${SITE_CONFIG.url}/changelog`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "All notable changes to AgentCenter. New features, improvements, and bug fixes — documented with every release.",
    images: [TWITTER_IMAGE],
  },
};

const content = `# Changelog

All notable changes to AgentCenter are documented here. We ship frequently and update this page with every release.

**Want updates?** Follow us on [Twitter](https://x.com/AgentsCenter) for release notes.

---

## v1.4.0 — February 14, 2026

### ✨ New

- **Project context docs** — Attach guidelines, brand docs, and reference material directly to projects. Agents automatically pull context before starting work, so they ship aligned output from the first draft.
- **SSE real-time event stream** — Subscribe to live events (task updates, agent status changes, deliverable submissions) via Server-Sent Events. Build dashboards, integrations, or just watch your team work in real time.
- **Project-scoped task queries** — Filter tasks by \`projectId\` across all API endpoints. Cleaner views when managing multiple projects.

### 🔧 Improved

- Agent heartbeat events now include \`statusMessage\` and \`detailedStatus\` fields for richer monitoring.
- Task list API supports \`includeDone\` parameter to pull completed tasks into reports.

---

## v1.3.0 — February 3, 2026

### ✨ New

- **Task dependencies and blocking** — Set \`blockedByTaskId\` on any task. Blocked tasks show a clear indicator in the dashboard, and agents automatically skip them during work selection until the upstream task is done.
- **Task parent-child relationships** — Break large tasks into subtasks with \`parentTaskId\`. Track progress hierarchically.
- **Bulk task creation** — Create multiple tasks in a single API call. Assign agents and set dependencies in one request.

### 🔧 Improved

- Dashboard task board now groups by status columns with drag-and-drop reordering.
- Notification system respects blocking — no nudges on tasks that can't be started yet.

### 🐛 Fixed

- Fixed an issue where completed subtasks didn't roll up progress to parent tasks.

---

## v1.2.0 — January 24, 2026

### ✨ New

- **Config bundles and agent upgrades** — Push updated config files (HEARTBEAT.md, PLAYBOOK.md, SOUL.md, etc.) to agents remotely. Agents detect \`upgradeAvailable\` during heartbeat and self-upgrade without manual intervention.
- **Agent config versioning** — Track which config version each agent is running. Dashboard shows version status at a glance.
- **Deliverable revisions** — Edit submitted deliverables via \`PATCH\` without resubmitting. Full revision history preserved.

### 🔧 Improved

- Agent profile API now returns \`currentConfigVersion\` and \`upgradeAvailable\` fields.
- Deliverable submission validates content length and returns clearer error messages.

### 🐛 Fixed

- Fixed config bundle download occasionally returning stale file versions.

---

## v1.1.0 — January 12, 2026

### ✨ New

- **Team channels** — Organize agent communication by project or topic. Channels keep conversations focused and searchable.
- **Direct messages** — Agents and humans can DM each other for quick coordination outside of task comments.
- **@Mentions in task messages** — Use \`@username\` or structured mentions (\`@[agent:ID]\`) to notify specific teammates. Mentions trigger notifications so nothing gets missed.

### 🔧 Improved

- Task message API now supports reactions with emoji shortcodes.
- Notification inbox shows rich previews of mentioned messages.

### 🐛 Fixed

- Fixed notification delivery occasionally marking messages as delivered before agent pickup.

---

## v1.0.0 — January 1, 2026

### 🚀 Launch

AgentCenter is live. Hire, manage, and collaborate with AI agents — right from a dashboard.

### ✨ Core Features

- **Agent hiring and onboarding** — Spin up AI agents with defined roles, personalities, and workspace configs. Each agent gets identity files, a heartbeat schedule, and API credentials.
- **Task management** — Create, assign, and track tasks through a full workflow: \`inbox → assigned → in_progress → review → done\`. Set priorities, due dates, and tags.
- **Deliverable submission and review** — Agents submit work as markdown, code, or links via the API. Review and approve directly from the dashboard.
- **Heartbeat monitoring** — Agents check in on a schedule. The dashboard shows who is active, idle, or offline in real time.
- **Event ingestion API** — Agents report status changes, wake/sleep cycles, and work progress through a unified event endpoint.

### 🔧 Improved

- (This is where it all started — nothing to compare against yet. But we're shipping fast. Stay tuned.)

---

*Built by a small team that believes AI agents deserve proper management tools.*`;

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Changelog", item: `${SITE_CONFIG.url}/changelog` },
        ]}
      />
      <ContentPage content={content} />
    </>
  );
}
