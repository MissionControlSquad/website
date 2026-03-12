"use client";

import { useState, useCallback, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { X, ZoomIn } from "@/components/icons";

/* ── Screenshot data ── */
interface Screenshot {
  id: string;
  title: string;
  caption: string;
  alt: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    id: "dashboard",
    title: "Agent Dashboard",
    caption: "Manage multiple agents from a single control panel.",
    alt: "AgentCenter agent dashboard overview showing agent status, activity, and management controls",
  },
  {
    id: "tasks",
    title: "Task Orchestration",
    caption: "Monitor agent task execution in real time.",
    alt: "AgentCenter task orchestration panel showing task assignment, status tracking, and workflow management",
  },
  {
    id: "logs",
    title: "Execution Logs",
    caption: "Track results and deliverables from your AI workflows.",
    alt: "AgentCenter execution logs showing agent activity feed, deliverables, and task completion history",
  },
  {
    id: "workflows",
    title: "Multi-Agent Workflows",
    caption: "Coordinate complex workflows across your entire agent team.",
    alt: "AgentCenter multi-agent workflow view showing project coordination and team collaboration",
  },
];

/* ── Mockup Dashboard Component ── */
function DashboardMockup() {
  const agents = [
    {
      name: "FE",
      emoji: "⚛️",
      status: "working",
      task: "Building landing page",
      statusColor: "bg-amber-400",
    },
    {
      name: "Research",
      emoji: "🔍",
      status: "online",
      task: "Competitive analysis",
      statusColor: "bg-emerald-400",
    },
    {
      name: "PM",
      emoji: "📋",
      status: "online",
      task: "Sprint planning",
      statusColor: "bg-emerald-400",
    },
    {
      name: "SEO",
      emoji: "📈",
      status: "idle",
      task: "Waiting for content",
      statusColor: "bg-neutral-500",
    },
    {
      name: "Designer",
      emoji: "🎨",
      status: "working",
      task: "UI mockups",
      statusColor: "bg-amber-400",
    },
  ];

  return (
    <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden text-[10px] sm:text-xs">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-neutral-500 text-[9px] sm:text-[10px] ml-2 font-mono">
          agentcenter.cloud/dashboard
        </span>
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-neutral-200 font-semibold text-xs sm:text-sm">Agents</span>
          <span className="text-emerald-400 text-[9px] sm:text-[10px]">5 connected</span>
        </div>
        <div className="space-y-2">
          {agents.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-2 rounded-md bg-neutral-900/80 border border-neutral-800/60 px-2.5 py-1.5"
            >
              <span className="text-sm sm:text-base">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-200 font-medium">{a.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${a.statusColor}`} />
                </div>
                <span className="text-neutral-500 text-[9px] sm:text-[10px] truncate block">
                  {a.task}
                </span>
              </div>
              <span className="text-neutral-600 text-[9px]">{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup Task Orchestration ── */
function TasksMockup() {
  const tasks = [
    {
      num: "#467",
      title: "Product Screenshot Section",
      assignee: "FE",
      status: "In Progress",
      statusColor: "text-amber-400 bg-amber-400/10",
      priority: "high",
    },
    {
      num: "#486",
      title: "Publish 5 Blog Articles",
      assignee: "FE",
      status: "Review",
      statusColor: "text-blue-400 bg-blue-400/10",
      priority: "medium",
    },
    {
      num: "#480",
      title: "SEO Landing Page Content",
      assignee: "Content",
      status: "Done",
      statusColor: "text-emerald-400 bg-emerald-400/10",
      priority: "medium",
    },
    {
      num: "#472",
      title: "CTA Strategy Implementation",
      assignee: "Research",
      status: "Assigned",
      statusColor: "text-neutral-400 bg-neutral-400/10",
      priority: "high",
    },
    {
      num: "#488",
      title: "JWT Decoder Tool",
      assignee: "FE-2",
      status: "Done",
      statusColor: "text-emerald-400 bg-emerald-400/10",
      priority: "low",
    },
  ];

  return (
    <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden text-[10px] sm:text-xs">
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-neutral-500 text-[9px] sm:text-[10px] ml-2 font-mono">
          agentcenter.cloud/tasks
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-neutral-200 font-semibold text-xs sm:text-sm">Task Board</span>
          <span className="text-neutral-500 text-[9px] sm:text-[10px]">12 active tasks</span>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 text-neutral-500 text-[9px] mb-1.5 px-2">
          <span>Task</span>
          <span>Title</span>
          <span>Agent</span>
          <span>Status</span>
        </div>
        <div className="space-y-1.5">
          {tasks.map((t) => (
            <div
              key={t.num}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 rounded-md bg-neutral-900/80 border border-neutral-800/60 px-2.5 py-1.5"
            >
              <span className="text-primary-400 font-mono">{t.num}</span>
              <span className="text-neutral-300 truncate">{t.title}</span>
              <span className="text-neutral-500">{t.assignee}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${t.statusColor}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup Execution Logs ── */
function LogsMockup() {
  const logs = [
    {
      time: "12:45",
      agent: "⚛️ FE",
      action: "Submitted deliverable",
      detail: "PR #61 — 4 feature pages",
      color: "text-emerald-400",
    },
    {
      time: "12:42",
      agent: "🔍 Research",
      action: "Completed analysis",
      detail: "Competitor pricing matrix",
      color: "text-blue-400",
    },
    {
      time: "12:38",
      agent: "📋 PM",
      action: "Approved task",
      detail: "#486 — Blog articles published",
      color: "text-emerald-400",
    },
    {
      time: "12:35",
      agent: "⚛️ FE",
      action: "Started task",
      detail: "#467 — Screenshot section",
      color: "text-amber-400",
    },
    {
      time: "12:30",
      agent: "📈 SEO",
      action: "Verified URLs",
      detail: "5 blog pages returning HTTP 200",
      color: "text-blue-400",
    },
    {
      time: "12:22",
      agent: "🎨 Designer",
      action: "Uploaded mockup",
      detail: "Homepage hero redesign v2",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden text-[10px] sm:text-xs">
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-neutral-500 text-[9px] sm:text-[10px] ml-2 font-mono">
          agentcenter.cloud/activity
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-neutral-200 font-semibold text-xs sm:text-sm">Activity Feed</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        </div>
        <div className="space-y-2">
          {logs.map((l, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-md bg-neutral-900/80 border border-neutral-800/60 px-2.5 py-1.5"
            >
              <span className="text-neutral-600 font-mono shrink-0 mt-0.5">{l.time}</span>
              <span className="shrink-0">{l.agent}</span>
              <div className="flex-1 min-w-0">
                <span className={`${l.color}`}>{l.action}</span>
                <span className="text-neutral-500 block truncate">{l.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup Multi-Agent Workflow ── */
function WorkflowsMockup() {
  const projects = [
    {
      name: "agentcenter.cloud",
      agents: ["PM", "FE", "FE-2", "SEO", "Research", "Content"],
      tasks: { total: 24, done: 16, inProgress: 5, review: 3 },
    },
    {
      name: "jagodana.com",
      agents: ["PM", "FE", "QA", "Designer", "Content"],
      tasks: { total: 18, done: 12, inProgress: 4, review: 2 },
    },
  ];

  return (
    <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden text-[10px] sm:text-xs">
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-neutral-500 text-[9px] sm:text-[10px] ml-2 font-mono">
          agentcenter.cloud/projects
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-neutral-200 font-semibold text-xs sm:text-sm">Projects</span>
          <span className="text-neutral-500 text-[9px] sm:text-[10px]">2 active</span>
        </div>
        <div className="space-y-3">
          {projects.map((p) => {
            const pct = Math.round((p.tasks.done / p.tasks.total) * 100);
            return (
              <div
                key={p.name}
                className="rounded-md bg-neutral-900/80 border border-neutral-800/60 p-2.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-200 font-medium">{p.name}</span>
                  <span className="text-primary-400 text-[9px]">{pct}% complete</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-neutral-800 mb-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {/* Agent avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {p.agents.slice(0, 5).map((a) => (
                      <div
                        key={a}
                        className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[8px] text-neutral-400 font-medium"
                      >
                        {a[0]}
                      </div>
                    ))}
                    {p.agents.length > 5 && (
                      <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[8px] text-neutral-500">
                        +{p.agents.length - 5}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 text-[9px]">
                    <span className="text-emerald-400">{p.tasks.done} done</span>
                    <span className="text-amber-400">{p.tasks.inProgress} active</span>
                    <span className="text-blue-400">{p.tasks.review} review</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ screenshot, onClose }: { screenshot: Screenshot; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const MockupComponent = MOCKUP_MAP[screenshot.id];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${screenshot.title} preview`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-4xl animate-lightbox-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-neutral-400 hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          aria-label="Close preview"
        >
          <X size={24} />
        </button>

        {/* Mockup at full size */}
        <div className="rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl shadow-primary-500/10">
          <div className="aspect-[16/10]">{MockupComponent && <MockupComponent />}</div>
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-neutral-100">{screenshot.title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{screenshot.caption}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup map ── */
const MOCKUP_MAP: Record<string, React.FC> = {
  dashboard: DashboardMockup,
  tasks: TasksMockup,
  logs: LogsMockup,
  workflows: WorkflowsMockup,
};

/* ── Main Section ── */
export default function InsideAgentCenter() {
  const [activeScreenshot, setActiveScreenshot] = useState<Screenshot | null>(null);

  const openLightbox = useCallback((s: Screenshot) => setActiveScreenshot(s), []);
  const closeLightbox = useCallback(() => setActiveScreenshot(null), []);

  return (
    <section id="inside" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-500/5 blur-[120px] rounded-full" />
      </div>

      <Container>
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Inside AgentCenter
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            See how teams manage their AI agents, track tasks, and ship faster — all from one
            dashboard.
          </p>
        </ScrollReveal>

        {/* Screenshot grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCREENSHOTS.map((s, i) => {
            const MockupComponent = MOCKUP_MAP[s.id];
            return (
              <ScrollReveal key={s.id} staggerIndex={i}>
                <button
                  onClick={() => openLightbox(s)}
                  className="group relative w-full text-left rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label={`View ${s.title} — ${s.caption}`}
                >
                  {/* Mockup preview */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {MockupComponent && <MockupComponent />}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center backdrop-blur-sm">
                          <ZoomIn size={20} className="text-primary-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-4 border-t border-neutral-800/50">
                    <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-primary-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">{s.caption}</p>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>

      {/* Lightbox */}
      {activeScreenshot && <Lightbox screenshot={activeScreenshot} onClose={closeLightbox} />}
    </section>
  );
}
