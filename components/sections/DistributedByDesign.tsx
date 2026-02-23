"use client";

import { Container } from "@/components/ui/Container";
import { Monitor, Wand, Activity, Zap, GitBranch } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const cardBase =
  "rounded-xl bg-neutral-800/60 border border-neutral-700/50 p-6 transition-all duration-300 hover:border-primary-500/30 card-glow-hover overflow-hidden";

/* ── Card 1: Network Topology (hero card) ── */
function NetworkTopologyCard() {
  const hub = { cx: 200, cy: 130 };
  const nodes = [
    { agent: "Agent 1", label: "AWS EC2", cx: 65, cy: 45 },
    { agent: "Agent 2", label: "Local Mac", cx: 335, cy: 40 },
    { agent: "Agent 3", label: "GCP VM", cx: 360, cy: 195 },
    { agent: "Agent 4", label: "Raspberry Pi", cx: 55, cy: 200 },
    { agent: "Agent 5", label: "On-Prem", cx: 200, cy: 245 },
  ];
  const logoSize = 28;
  const orbitR = logoSize + 8;

  return (
    <ScrollReveal
      className={`${cardBase} md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-2 flex flex-col`}
      staggerIndex={0}
    >
      <h3 className="text-xl font-semibold text-neutral-100 mb-1">
        One dashboard. Agents everywhere.
      </h3>
      <p className="text-sm text-neutral-400 mb-4">
        A single control plane connecting agents across any infrastructure.
      </p>

      <div className="relative w-full aspect-[4/3] max-w-[400px] lg:max-w-none mx-auto flex-1">
        <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="rgba(14,165,233,0.3)" />
              <stop offset="60%" stopColor="rgba(14,165,233,0.08)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0)" />
            </radialGradient>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="rgba(74,222,128,0.2)" />
              <stop offset="100%" stopColor="rgba(74,222,128,0)" />
            </radialGradient>
            <clipPath id="logoClip">
              <circle cx={hub.cx} cy={hub.cy} r={logoSize - 2} />
            </clipPath>
          </defs>

          {/* Outer glow */}
          <circle cx={hub.cx} cy={hub.cy} r="90" fill="url(#hubGlow)" />

          {/* Connection lines — stroke-dasharray line draw */}
          {nodes.map((n, i) => {
            const dx = n.cx - hub.cx;
            const dy = n.cy - hub.cy;
            const len = Math.sqrt(dx * dx + dy * dy);
            return (
              <line
                key={`line-${i}`}
                x1={hub.cx}
                y1={hub.cy}
                x2={n.cx}
                y2={n.cy}
                stroke="#0ea5e9"
                strokeWidth={1.5}
                strokeOpacity={0.3}
                strokeDasharray={`${len}`}
                strokeDashoffset={`${len}`}
                className="svg-line-anim"
                style={{ "--delay": `${300 + i * 100}ms` } as React.CSSProperties}
              />
            );
          })}

          {/* Data pulse dots traveling along lines via offset-path */}
          {nodes.map((n, i) => (
            <circle
              key={`pulse-dot-${i}`}
              r="2.5"
              fill="#38bdf8"
              className="svg-data-dot"
              style={
                {
                  offsetPath: `path('M ${hub.cx} ${hub.cy} L ${n.cx} ${n.cy}')`,
                  "--delay": `${1500 + i * 400}ms`,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Hub — spinning dashed orbit ring */}
          <circle
            cx={hub.cx}
            cy={hub.cy}
            r={orbitR}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={0.8}
            strokeOpacity={0.25}
            strokeDasharray="3 5"
            className="svg-orbit"
            style={{ transformOrigin: `${hub.cx}px ${hub.cy}px` }}
          />

          {/* Hub — main circle */}
          <circle
            cx={hub.cx}
            cy={hub.cy}
            r={logoSize}
            fill="#18181b"
            stroke="#0ea5e9"
            strokeWidth={2}
            className="svg-node-scale"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          />

          {/* Hub — logo image */}
          <image
            href="/favicon-96x96.png"
            x={hub.cx - logoSize + 5}
            y={hub.cy - logoSize + 5}
            width={(logoSize - 5) * 2}
            height={(logoSize - 5) * 2}
            clipPath="url(#logoClip)"
            className="svg-fade-in"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          />

          {/* Hub label */}
          <text
            x={hub.cx}
            y={hub.cy + logoSize + 18}
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="600"
            className="svg-fade-in"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            AgentCenter
          </text>

          {/* Hub pulse rings */}
          {[0, 1].map((ring) => (
            <circle
              key={`hub-pulse-${ring}`}
              cx={hub.cx}
              cy={hub.cy}
              r={logoSize}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth={1}
              className="svg-pulse-hub"
              style={
                {
                  "--delay": `${ring * 1500}ms`,
                  transformOrigin: `${hub.cx}px ${hub.cy}px`,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Agent nodes */}
          {nodes.map((n, i) => (
            <g key={`node-${i}`}>
              {/* Subtle glow behind node */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r="24"
                fill="url(#nodeGlow)"
                className="svg-fade-in"
                style={{ "--delay": `${600 + i * 100}ms` } as React.CSSProperties}
              />

              {/* Node circle */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r="16"
                fill="#27272a"
                stroke="#3f3f46"
                strokeWidth={1.5}
                className="svg-node-scale"
                style={{ "--delay": `${400 + i * 100}ms` } as React.CSSProperties}
              />

              {/* Agent pulse ring */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r="16"
                fill="none"
                stroke="#4ade80"
                strokeWidth={0.8}
                className="svg-pulse-agent"
                style={
                  {
                    "--delay": `${1200 + i * 300}ms`,
                    transformOrigin: `${n.cx}px ${n.cy}px`,
                  } as React.CSSProperties
                }
              />

              {/* Online status dot (top-right) */}
              <circle
                cx={n.cx + 11}
                cy={n.cy - 11}
                r="3.5"
                fill="#4ade80"
                stroke="#27272a"
                strokeWidth={1}
                className="svg-node-scale"
                style={{ "--delay": `${800 + i * 100}ms` } as React.CSSProperties}
              />

              {/* Agent name inside circle */}
              <text
                x={n.cx}
                y={n.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e5e5e5"
                fontSize="7"
                fontWeight="500"
                className="svg-fade-in"
                style={{ "--delay": `${500 + i * 100}ms` } as React.CSSProperties}
              >
                {n.agent}
              </text>

              {/* Device label below */}
              <text
                x={n.cx}
                y={n.cy + 28}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                className="svg-label-up"
                style={{ "--delay": `${600 + i * 100}ms` } as React.CSSProperties}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </ScrollReveal>
  );
}

/* ── Card 2: Any Machine ── */
function AnyMachineCard() {
  const machines = [
    { os: "Linux", color: "#f59e0b", prompt: "user@ubuntu:~$" },
    { os: "macOS", color: "#a1a1aa", prompt: "~ %" },
    { os: "Windows", color: "#3b82f6", prompt: "C:\\>" },
  ];

  return (
    <ScrollReveal className={`${cardBase} md:col-span-2 lg:col-span-2`} staggerIndex={1}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Monitor className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">Any machine, any location</h3>
      </div>
      <p className="text-sm text-neutral-400 mb-4">
        Agents connect from laptops, cloud VMs, on-prem servers, or edge devices.
      </p>
      <div className="space-y-2">
        {machines.map((m, i) => (
          <div
            key={m.os}
            className="scroll-reveal-left flex items-center gap-2 rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2"
            style={{ "--stagger-index": i } as React.CSSProperties}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
            <code className="text-xs text-neutral-500 font-mono">{m.prompt}</code>
            <span className="text-xs text-neutral-300 ml-auto">{m.os}</span>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

/* ── Card 3: Specialized Agents ── */
function SpecializedAgentsCard() {
  const agents = [
    { name: "Code Agent", skills: ["Python", "Git", "Tests"] },
    { name: "Research Agent", skills: ["Search", "Summarize", "Citations"] },
    { name: "DevOps Agent", skills: ["Docker", "K8s", "Monitoring"] },
  ];

  return (
    <ScrollReveal className={`${cardBase} md:col-span-2 lg:col-span-2`} staggerIndex={2}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Wand className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">Specialized agents</h3>
      </div>
      <p className="text-sm text-neutral-400 mb-4">
        Each agent brings its own tools, skills, and environment.
      </p>
      <div className="space-y-3">
        {agents.map((a, ai) => (
          <div key={a.name} className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-neutral-300 w-full sm:w-28 shrink-0">{a.name}</span>
            <span className="text-neutral-600 text-xs hidden sm:inline">&rarr;</span>
            <div className="flex gap-1.5 flex-wrap">
              {a.skills.map((s, si) => (
                <span
                  key={s}
                  className="scroll-reveal-scale text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 transition-colors cursor-default"
                  style={{ "--stagger-index": ai * 3 + si } as React.CSSProperties}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

/* ── Card 4: Live Heartbeats ── */
function LiveHeartbeatsCard() {
  const agents = [
    { name: "code-agent-1", status: "online", color: "bg-agent-online" },
    { name: "research-bot", status: "working", color: "bg-agent-working" },
    { name: "deploy-agent", status: "idle", color: "bg-agent-idle" },
    { name: "monitor-agent", status: "online", color: "bg-agent-online" },
  ];

  return (
    <ScrollReveal className={cardBase} staggerIndex={3}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">Live heartbeats</h3>
      </div>
      <div className="space-y-2.5 mt-4">
        {agents.map((a, i) => (
          <div
            key={a.name}
            className="scroll-reveal-left flex items-center gap-2"
            style={{ "--stagger-index": i } as React.CSSProperties}
          >
            <span className="relative flex h-2.5 w-2.5">
              {(a.status === "online" || a.status === "working") && (
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${a.color} opacity-75 animate-ping`}
                />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${a.color}`} />
            </span>
            <span className="text-xs text-neutral-400 font-mono truncate">{a.name}</span>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

/* ── Card 5: One-Time Setup ── */
function OneTimeSetupCard() {
  const steps = [
    { num: "1", text: "Install OpenClaw", color: "text-primary-400" },
    { num: "2", text: "Create agent in dashboard", color: "text-primary-400" },
    { num: "3", text: "Run onboarding config", color: "text-primary-400" },
    { num: "✓", text: "Connected forever", color: "text-green-400" },
  ];

  return (
    <ScrollReveal className={cardBase} staggerIndex={4}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">One-time setup</h3>
      </div>
      <div className="relative mt-4">
        {/* Vertical connector line */}
        <div className="scroll-reveal-scale-y absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-green-500/40" />

        <div className="space-y-3">
          {steps.map((s, i) => {
            const isLast = s.num === "✓";
            return (
              <div
                key={i}
                className="scroll-reveal-left relative flex items-center gap-3"
                style={{ "--stagger-index": i + 2 } as React.CSSProperties}
              >
                {/* Step circle */}
                <span
                  className={`scroll-reveal-scale relative z-10 w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isLast
                      ? "border-green-500/50 bg-green-500/15 text-green-400"
                      : "border-primary-500/50 bg-primary-500/15 text-primary-400"
                  }`}
                  style={{ "--stagger-index": i + 3 } as React.CSSProperties}
                >
                  {s.num}
                </span>

                {/* Text with progress bar */}
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-medium ${s.color}`}>{s.text}</span>
                  <div
                    className={`scroll-reveal-width h-0.5 mt-1 rounded-full ${isLast ? "bg-green-500/30" : "bg-primary-500/20"}`}
                    style={{ "--stagger-index": i } as React.CSSProperties}
                  />
                </div>

                {/* Completion glow for last step */}
                {isLast && (
                  <div
                    className="scroll-reveal-scale absolute -inset-1 rounded-lg bg-green-500/5 border border-green-500/10"
                    style={{ "--stagger-index": 8 } as React.CSSProperties}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Card 6: Scale ── */
function ScaleCard() {
  const nodeCount = 8;

  return (
    <ScrollReveal className={`${cardBase} md:col-span-2 lg:col-span-2`} staggerIndex={5}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">Scale to hundreds of agents</h3>
      </div>
      <p className="text-sm text-neutral-400 mb-4">
        Add agents as you grow. No config changes, no bottlenecks.
      </p>

      <div className="relative flex items-center justify-between w-full">
        <div className="scroll-reveal-scale-x absolute top-1/2 left-0 right-0 h-px bg-primary-500/30" />
        {Array.from({ length: nodeCount }).map((_, i) => (
          <div
            key={i}
            className="scroll-reveal-scale relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-600 flex items-center justify-center"
            style={{ "--stagger-index": i + 2 } as React.CSSProperties}
          >
            {i >= nodeCount - 2 ? (
              <span className="text-xs text-primary-400 font-bold">+</span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-agent-online" />
            )}
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

/* ── Main Section ── */
export default function DistributedByDesign() {
  return (
    <section id="distributed" className="py-24 md:py-32">
      <Container>
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Distributed by design
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Your agents live on different machines with different skills. AgentCenter brings them
            all into one place.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NetworkTopologyCard />
          <AnyMachineCard />
          <SpecializedAgentsCard />
          <LiveHeartbeatsCard />
          <OneTimeSetupCard />
          <ScaleCard />
        </div>
      </Container>
    </section>
  );
}
