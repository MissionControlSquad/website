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
  const nodes = [
    { label: "AWS EC2", cx: 70, cy: 40 },
    { label: "Local Mac", cx: 230, cy: 35 },
    { label: "GCP VM", cx: 260, cy: 150 },
    { label: "Raspberry Pi", cx: 50, cy: 155 },
    { label: "On-Prem", cx: 160, cy: 185 },
  ];
  const hub = { cx: 155, cy: 105 };

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

      <div className="relative w-full aspect-[3/2] max-w-[340px] lg:max-w-none mx-auto flex-1">
        <svg viewBox="0 0 310 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Radial glow behind hub */}
          <defs>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="rgba(14,165,233,0.25)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0)" />
            </radialGradient>
          </defs>
          <circle cx={hub.cx} cy={hub.cy} r="60" fill="url(#hubGlow)" />

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
              strokeOpacity={0.4}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" }}
            />
          ))}

          {/* Hub node */}
          <motion.circle
            cx={hub.cx}
            cy={hub.cy}
            r="18"
            fill="#18181b"
            stroke="#0ea5e9"
            strokeWidth={2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          />
          <motion.text
            x={hub.cx}
            y={hub.cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#38bdf8"
            fontSize="8"
            fontWeight="600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            HUB
          </motion.text>

          {/* Agent nodes */}
          {nodes.map((n, i) => (
            <g key={`node-${i}`}>
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="12"
                fill="#27272a"
                stroke="#3f3f46"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12, ease: "easeOut" }}
              />
              <motion.text
                x={n.cx}
                y={n.cy + 22}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="9"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.12 }}
              >
                {n.label}
              </motion.text>
              {/* Tiny pulse dot */}
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="3"
                fill="#4ade80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0.5, 1] }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8 + i * 0.12,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </g>
          ))}

          {/* Hub pulse ring */}
          <motion.circle
            cx={hub.cx}
            cy={hub.cy}
            r="18"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{
              opacity: [0.6, 0],
              scale: [1, 1.8],
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
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
      <div className="space-y-2 mt-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
          >
            <span
              className={`w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                s.num === "✓"
                  ? "border-green-500/40 bg-green-500/10 text-green-400"
                  : "border-primary-500/40 bg-primary-500/10 text-primary-400"
              }`}
            >
              {s.num}
            </span>
            <span className={`text-xs ${s.color}`}>{s.text}</span>
          </motion.div>
        ))}
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
