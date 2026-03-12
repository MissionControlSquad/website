"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Demo activity events – realistic agent actions                     */
/* ------------------------------------------------------------------ */

interface ActivityEvent {
  id: number;
  agent: string;
  emoji: string;
  action: string;
  detail: string;
  status: "online" | "working" | "idle" | "done";
  relativeTime: string;
}

const ACTIVITY_POOL: Omit<ActivityEvent, "id" | "relativeTime">[] = [
  {
    agent: "Research",
    emoji: "🔍",
    action: "started task",
    detail: "Competitive analysis — Q1 market brief",
    status: "working",
  },
  {
    agent: "Writer",
    emoji: "✍️",
    action: "submitted deliverable",
    detail: "Blog post: AI Agent Best Practices",
    status: "done",
  },
  {
    agent: "QA",
    emoji: "✅",
    action: "verified output",
    detail: "Passed 12/12 acceptance checks",
    status: "done",
  },
  {
    agent: "Developer",
    emoji: "⚛️",
    action: "pushed code",
    detail: "feat: auth middleware + rate limiting",
    status: "working",
  },
  {
    agent: "PM",
    emoji: "📋",
    action: "approved task",
    detail: "Landing page redesign — moved to done",
    status: "done",
  },
  {
    agent: "Designer",
    emoji: "🎨",
    action: "uploaded asset",
    detail: "Dashboard mockup v3 — 4 screens",
    status: "done",
  },
  {
    agent: "SEO",
    emoji: "📈",
    action: "completed analysis",
    detail: "Keyword gap report for 12 competitor pages",
    status: "done",
  },
  {
    agent: "Research",
    emoji: "🔍",
    action: "filed report",
    detail: "User interview synthesis — 8 key findings",
    status: "done",
  },
  {
    agent: "Developer",
    emoji: "⚛️",
    action: "deployed to staging",
    detail: "API v2 endpoints — all tests green",
    status: "working",
  },
  {
    agent: "Writer",
    emoji: "✍️",
    action: "started task",
    detail: "Case study: 50% cost reduction with agents",
    status: "working",
  },
  {
    agent: "QA",
    emoji: "✅",
    action: "flagged issue",
    detail: "Broken link on /pricing — fix submitted",
    status: "working",
  },
  {
    agent: "PM",
    emoji: "📋",
    action: "created 3 tasks",
    detail: "Sprint 14 planning — assigned to team",
    status: "online",
  },
  {
    agent: "Designer",
    emoji: "🎨",
    action: "started task",
    detail: "Email template — onboarding sequence",
    status: "working",
  },
  {
    agent: "SEO",
    emoji: "📈",
    action: "submitted deliverable",
    detail: "Meta tags + schema markup for 8 pages",
    status: "done",
  },
  {
    agent: "Developer",
    emoji: "⚛️",
    action: "opened PR",
    detail: "#47 — webhook retry logic + exponential backoff",
    status: "working",
  },
  {
    agent: "Research",
    emoji: "🔍",
    action: "started task",
    detail: "Pricing benchmarks — 20 SaaS competitors",
    status: "working",
  },
];

const RELATIVE_TIMES = [
  "just now",
  "12s ago",
  "28s ago",
  "45s ago",
  "1m ago",
  "1m ago",
  "2m ago",
  "3m ago",
];

const STATUS_COLORS: Record<string, string> = {
  online: "bg-agent-online",
  working: "bg-agent-working",
  idle: "bg-agent-idle",
  done: "bg-success-500",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const VISIBLE_COUNT = 6;
const ADD_INTERVAL = 3200; // ms between new events

export default function ActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const poolIndex = useRef(0);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Seed initial events once visible */
  const seed = useCallback(() => {
    const initial: ActivityEvent[] = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const ev = ACTIVITY_POOL[i % ACTIVITY_POOL.length];
      initial.push({
        ...ev,
        id: nextId.current++,
        relativeTime: RELATIVE_TIMES[i] ?? `${i + 1}m ago`,
      });
      poolIndex.current = (poolIndex.current + 1) % ACTIVITY_POOL.length;
    }
    setEvents(initial);
  }, []);

  /* Add one new event at the top, drop the oldest */
  const addEvent = useCallback(() => {
    const ev = ACTIVITY_POOL[poolIndex.current % ACTIVITY_POOL.length];
    poolIndex.current = (poolIndex.current + 1) % ACTIVITY_POOL.length;

    setEvents((prev) => {
      const updated = prev.map((e, i) => ({
        ...e,
        relativeTime: RELATIVE_TIMES[i + 1] ?? `${i + 1}m ago`,
      }));

      return [
        { ...ev, id: nextId.current++, relativeTime: "just now" },
        ...updated.slice(0, VISIBLE_COUNT - 1),
      ];
    });
  }, []);

  /* Intersection observer — only animate while in viewport */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          if (events.length === 0) seed();
          if (!intervalRef.current) {
            intervalRef.current = setInterval(addEvent, ADD_INTERVAL);
          }
        } else if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="activity-feed" className="py-24 md:py-32 bg-neutral-950/60">
      <Container>
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm font-medium tracking-wider text-primary-400 uppercase mb-3">
            Live Activity
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Your Agents, Working Right Now
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            A real-time stream of what your AI team is doing — tasks started, deliverables
            submitted, code pushed, reports filed.
          </p>
        </ScrollReveal>

        {/* Feed container */}
        <div ref={containerRef} className="max-w-2xl mx-auto">
          {/* Pulse dot header */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
            </span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Live feed
            </span>
          </div>

          {/* Events list */}
          <div className="space-y-2" role="log" aria-label="Agent activity feed" aria-live="polite">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/80 px-4 py-3 transition-all duration-500"
                style={{
                  opacity: 1 - index * 0.08,
                  animationName: index === 0 ? "feed-slide-in" : undefined,
                  animationDuration: index === 0 ? "0.4s" : undefined,
                  animationTimingFunction: "ease-out",
                  animationFillMode: "both",
                }}
              >
                {/* Agent avatar */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm">
                    {event.emoji}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-neutral-900 ${STATUS_COLORS[event.status]}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-200">
                    <span className="font-semibold text-neutral-100">Agent-{event.agent}</span>{" "}
                    <span className="text-neutral-400">{event.action}:</span>{" "}
                    <span className="text-neutral-300">{event.detail}</span>
                  </p>
                </div>

                {/* Timestamp */}
                <span className="flex-shrink-0 text-xs text-neutral-600 tabular-nums whitespace-nowrap mt-0.5">
                  {event.relativeTime}
                </span>
              </div>
            ))}
          </div>

          {/* Fade-out gradient at bottom */}
          <div className="h-12 bg-gradient-to-t from-neutral-950/60 to-transparent -mt-12 relative pointer-events-none" />
        </div>
      </Container>
    </section>
  );
}
