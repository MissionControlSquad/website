"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Monitor, Wand, Activity, Zap, GitBranch } from "@/components/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
    <motion.div
      variants={itemVariants}
      className={`${cardBase} md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-2 flex flex-col`}
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

          {/* Connection lines */}
          {nodes.map((n, i) => (
            <motion.line
              key={`line-${i}`}
              x1={hub.cx}
              y1={hub.cy}
              x2={n.cx}
              y2={n.cy}
              stroke="#0ea5e9"
              strokeWidth={1.5}
              strokeOpacity={0.3}
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            />
          ))}

          {/* Data pulse dots traveling along lines */}
          {nodes.map((n, i) => {
            const dx = n.cx - hub.cx;
            const dy = n.cy - hub.cy;
            return (
              <motion.circle
                key={`pulse-dot-${i}`}
                r="2.5"
                fill="#38bdf8"
                initial={{ opacity: 0 }}
                whileInView={{
                  cx: [hub.cx, hub.cx + dx * 0.5, n.cx],
                  cy: [hub.cy, hub.cy + dy * 0.5, n.cy],
                  opacity: [0, 0.9, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  delay: 1.5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Hub — spinning dashed orbit ring */}
          <motion.circle
            cx={hub.cx}
            cy={hub.cy}
            r={orbitR}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={0.8}
            strokeOpacity={0.25}
            strokeDasharray="3 5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${hub.cx}px ${hub.cy}px` }}
          />

          {/* Hub — main circle */}
          <motion.circle
            cx={hub.cx}
            cy={hub.cy}
            r={logoSize}
            fill="#18181b"
            stroke="#0ea5e9"
            strokeWidth={2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Hub — logo image */}
          <motion.image
            href="/favicon-96x96.png"
            x={hub.cx - logoSize + 5}
            y={hub.cy - logoSize + 5}
            width={(logoSize - 5) * 2}
            height={(logoSize - 5) * 2}
            clipPath="url(#logoClip)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />

          {/* Hub label */}
          <motion.text
            x={hub.cx}
            y={hub.cy + logoSize + 18}
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            AgentCenter
          </motion.text>

          {/* Hub pulse rings */}
          {[0, 1].map((ring) => (
            <motion.circle
              key={`hub-pulse-${ring}`}
              cx={hub.cx}
              cy={hub.cy}
              r={logoSize}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth={1}
              initial={{ opacity: 0, scale: 1 }}
              whileInView={{
                opacity: [0.4, 0],
                scale: [1, 2.2],
              }}
              viewport={{ once: true }}
              transition={{
                duration: 3,
                delay: ring * 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Agent nodes */}
          {nodes.map((n, i) => (
            <g key={`node-${i}`}>
              {/* Subtle glow behind node */}
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="24"
                fill="url(#nodeGlow)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
              />

              {/* Node circle */}
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="16"
                fill="#27272a"
                stroke="#3f3f46"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "backOut" }}
              />

              {/* Agent pulse ring */}
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="16"
                fill="none"
                stroke="#4ade80"
                strokeWidth={0.8}
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{
                  opacity: [0.4, 0],
                  scale: [1, 1.6],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 2.5,
                  delay: 1.2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* Online status dot (top-right) */}
              <motion.circle
                cx={n.cx + 11}
                cy={n.cy - 11}
                r="3.5"
                fill="#4ade80"
                stroke="#27272a"
                strokeWidth={1}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}
              />

              {/* Agent name inside circle */}
              <motion.text
                x={n.cx}
                y={n.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e5e5e5"
                fontSize="7"
                fontWeight="500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {n.agent}
              </motion.text>

              {/* Device label below */}
              <motion.text
                x={n.cx}
                y={n.cy + 28}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                initial={{ opacity: 0, y: n.cy + 34 }}
                whileInView={{ opacity: 1, y: n.cy + 28 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                {n.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
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
    <motion.div variants={itemVariants} className={`${cardBase} md:col-span-2 lg:col-span-2`}>
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
          <motion.div
            key={m.os}
            className="flex items-center gap-2 rounded-lg bg-neutral-900/60 border border-neutral-700/40 px-3 py-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
            <code className="text-xs text-neutral-500 font-mono">{m.prompt}</code>
            <span className="text-xs text-neutral-300 ml-auto">{m.os}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    <motion.div variants={itemVariants} className={`${cardBase} md:col-span-2 lg:col-span-2`}>
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
                <motion.span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + ai * 0.12 + si * 0.06,
                    duration: 0.3,
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
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
    <motion.div variants={itemVariants} className={cardBase}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">Live heartbeats</h3>
      </div>
      <div className="space-y-2.5 mt-4">
        {agents.map((a, i) => (
          <motion.div
            key={a.name}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
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
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    <motion.div variants={itemVariants} className={cardBase}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100">One-time setup</h3>
      </div>
      <div className="relative mt-4">
        {/* Vertical connector line */}
        <motion.div
          className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-green-500/40"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-3">
          {steps.map((s, i) => {
            const isLast = s.num === "✓";
            return (
              <motion.div
                key={i}
                className="relative flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.4, ease: "easeOut" }}
              >
                {/* Step circle */}
                <motion.span
                  className={`relative z-10 w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isLast
                      ? "border-green-500/50 bg-green-500/15 text-green-400"
                      : "border-primary-500/50 bg-primary-500/15 text-primary-400"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  {s.num}
                </motion.span>

                {/* Text with progress bar */}
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-medium ${s.color}`}>{s.text}</span>
                  <motion.div
                    className={`h-0.5 mt-1 rounded-full ${isLast ? "bg-green-500/30" : "bg-primary-500/20"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Completion glow for last step */}
                {isLast && (
                  <motion.div
                    className="absolute -inset-1 rounded-lg bg-green-500/5 border border-green-500/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Card 6: Scale ── */
function ScaleCard() {
  const nodeCount = 8;

  return (
    <motion.div variants={itemVariants} className={`${cardBase} md:col-span-2 lg:col-span-2`}>
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
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px bg-primary-500/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
        {Array.from({ length: nodeCount }).map((_, i) => (
          <motion.div
            key={i}
            className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-600 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {i >= nodeCount - 2 ? (
              <span className="text-xs text-primary-400 font-bold">+</span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-agent-online" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function DistributedByDesign() {
  return (
    <section id="distributed" className="py-24 md:py-32">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Distributed by design
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Your agents live on different machines with different skills. AgentCenter brings them
            all into one place.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <NetworkTopologyCard />
          <AnyMachineCard />
          <SpecializedAgentsCard />
          <LiveHeartbeatsCard />
          <OneTimeSetupCard />
          <ScaleCard />
        </motion.div>
      </Container>
    </section>
  );
}
