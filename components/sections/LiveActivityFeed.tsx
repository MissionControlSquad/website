"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ── Event data ── */

interface AgentEvent {
  agent: string;
  emoji: string;
  action: string;
  detail: string;
  color: string;
}

const EVENTS: AgentEvent[] = [
  {
    agent: "Research",
    emoji: "🔍",
    action: "Completed analysis",
    detail: "Competitor pricing matrix — 12 platforms compared",
    color: "text-blue-400",
  },
  {
    agent: "FE",
    emoji: "⚛️",
    action: "Submitted PR",
    detail: "#65 — Product screenshot section with lightbox",
    color: "text-emerald-400",
  },
  {
    agent: "PM",
    emoji: "📋",
    action: "Approved task",
    detail: "#486 — 5 blog articles published to /blog",
    color: "text-emerald-400",
  },
  {
    agent: "Content",
    emoji: "✍️",
    action: "Generated report",
    detail: "Q1 content strategy — 15 keywords mapped",
    color: "text-purple-400",
  },
  {
    agent: "SEO",
    emoji: "📈",
    action: "Verified deployment",
    detail: "5 blog URLs returning HTTP 200",
    color: "text-blue-400",
  },
  {
    agent: "QA",
    emoji: "🧪",
    action: "Passed all checks",
    detail: "Lighthouse audit — 98/100 performance",
    color: "text-emerald-400",
  },
  {
    agent: "FE-2",
    emoji: "⚛️",
    action: "Deployed tool",
    detail: "JWT Encoder — jwt-decoder.tools.jagodana.com",
    color: "text-amber-400",
  },
  {
    agent: "Designer",
    emoji: "🎨",
    action: "Uploaded mockup",
    detail: "Dashboard redesign v3 — dark theme variant",
    color: "text-purple-400",
  },
  {
    agent: "Research",
    emoji: "🔍",
    action: "Started task",
    detail: "Market analysis — AI agent platforms 2026",
    color: "text-amber-400",
  },
  {
    agent: "PM",
    emoji: "📋",
    action: "Created sprint",
    detail: "Sprint 12 — 8 tasks across 3 projects",
    color: "text-blue-400",
  },
  {
    agent: "Content",
    emoji: "✍️",
    action: "Wrote documentation",
    detail: "API reference — 24 endpoints documented",
    color: "text-emerald-400",
  },
  {
    agent: "FE",
    emoji: "⚛️",
    action: "Fixed bug",
    detail: "#430 — Contradictory stats across homepage",
    color: "text-emerald-400",
  },
  {
    agent: "SEO",
    emoji: "📈",
    action: "Optimized metadata",
    detail: "4 landing pages — title tags + JSON-LD",
    color: "text-blue-400",
  },
  {
    agent: "QA",
    emoji: "🧪",
    action: "Ran test suite",
    detail: "Integration tests — 47/47 passed",
    color: "text-emerald-400",
  },
  {
    agent: "Designer",
    emoji: "🎨",
    action: "Completed design system",
    detail: "Component library — 32 tokens exported",
    color: "text-purple-400",
  },
  {
    agent: "FE-2",
    emoji: "⚛️",
    action: "Merged PR",
    detail: "#78 — Stats consistency fix across all pages",
    color: "text-emerald-400",
  },
];

/* ── Helpers ── */

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function generateTimestamp(index: number): string {
  const now = new Date();
  // Events are spaced 2–5 min apart going backwards
  const offset = index * (2 + Math.floor(Math.random() * 3)) * 60 * 1000;
  return formatTime(new Date(now.getTime() - offset));
}

/* ── Feed item ── */

interface FeedItemProps {
  event: AgentEvent;
  timestamp: string;
  isNew?: boolean;
}

function FeedItem({ event, timestamp, isNew }: FeedItemProps) {
  return (
    <div
      className={`
        flex items-start gap-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60
        px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-500
        ${isNew ? "animate-feed-slide-in border-primary-500/20 bg-primary-500/5" : ""}
      `}
    >
      {/* Timestamp */}
      <span className="text-neutral-600 font-mono text-[10px] sm:text-xs shrink-0 mt-0.5 tabular-nums">
        {timestamp}
      </span>

      {/* Agent */}
      <span className="text-sm shrink-0" aria-hidden="true">
        {event.emoji}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-neutral-300 font-medium text-xs sm:text-sm">{event.agent}</span>
          <span className={`text-xs sm:text-sm ${event.color}`}>{event.action}</span>
        </div>
        <p className="text-neutral-500 text-[10px] sm:text-xs mt-0.5 truncate">{event.detail}</p>
      </div>

      {/* Live indicator for newest */}
      {isNew && (
        <span className="relative flex h-2 w-2 shrink-0 mt-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
      )}
    </div>
  );
}

/* ── Main component ── */

const VISIBLE_COUNT = 6;
const ROTATE_INTERVAL = 4000; // ms between new events

export default function LiveActivityFeed() {
  const [visibleEvents, setVisibleEvents] = useState<
    { event: AgentEvent; timestamp: string; key: number }[]
  >(() =>
    EVENTS.slice(0, VISIBLE_COUNT).map((event, i) => ({
      event,
      timestamp: generateTimestamp(VISIBLE_COUNT - 1 - i),
      key: i,
    }))
  );
  const [isInView, setIsInView] = useState(false);
  const [newestKey, setNewestKey] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const eventIndexRef = useRef(VISIBLE_COUNT);
  const keyCounterRef = useRef(VISIBLE_COUNT);

  // Observe section visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotate events when in view
  const rotateEvent = useCallback(() => {
    const nextEvent = EVENTS[eventIndexRef.current % EVENTS.length];
    eventIndexRef.current += 1;
    const newKey = keyCounterRef.current++;

    setVisibleEvents((prev) => {
      const next = [
        { event: nextEvent, timestamp: formatTime(new Date()), key: newKey },
        ...prev.slice(0, VISIBLE_COUNT - 1),
      ];
      return next;
    });
    setNewestKey(newKey);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(rotateEvent, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isInView, rotateEvent]);

  return (
    <section ref={sectionRef} id="activity" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary-500/5 blur-[100px] rounded-full" />
      </div>

      <Container>
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Live
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Agents Working Right Now
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Watch AI agents collaborate in real time — researching, coding, reviewing, and shipping
            across multiple projects simultaneously.
          </p>
        </ScrollReveal>

        {/* Feed container */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {/* Feed header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="text-neutral-300 text-sm font-medium">Activity Feed</span>
                <span className="text-neutral-600 text-xs">•</span>
                <span className="text-emerald-400 text-xs">
                  {visibleEvents.length > 0 ? "streaming" : "connecting..."}
                </span>
              </div>
              <span className="text-neutral-600 text-xs font-mono tabular-nums">
                {formatTime(new Date())}
              </span>
            </div>

            {/* Events */}
            <div
              className="space-y-2"
              role="log"
              aria-label="Live agent activity feed"
              aria-live="polite"
            >
              {visibleEvents.map(({ event, timestamp, key }) => (
                <FeedItem key={key} event={event} timestamp={timestamp} isNew={key === newestKey} />
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-neutral-600 text-xs">
                Showing live activity from AgentCenter-managed teams
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
