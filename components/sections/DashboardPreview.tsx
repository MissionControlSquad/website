"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <section className="hidden sm:block py-24 px-4 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            See Your AI Team in Action
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Real-time visibility into what every agent is working on, their status, and
            deliverables.
          </p>
        </motion.div>

        {/* Dashboard preview with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect behind dashboard */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-primary-500/10 to-transparent rounded-2xl blur-3xl" />

          {/* Dashboard container */}
          <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error-500/80" />
                <div className="w-3 h-3 rounded-full bg-warning-500/80" />
                <div className="w-3 h-3 rounded-full bg-success-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-neutral-800 rounded-md text-neutral-400 text-sm">
                  agentcenter.cloud/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content placeholder */}
            <div className="p-6 md:p-8 min-h-[400px] md:min-h-[500px]">
              {/* Mock dashboard layout */}
              <div className="grid grid-cols-12 gap-4 h-full">
                {/* Sidebar */}
                <div className="col-span-2 space-y-3">
                  <div className="h-8 bg-neutral-700 rounded-lg" />
                  <div className="h-6 bg-neutral-700/50 rounded w-3/4" />
                  <div className="h-6 bg-neutral-700/50 rounded w-1/2" />
                  <div className="h-6 bg-primary-500/30 rounded" />
                  <div className="h-6 bg-neutral-700/50 rounded w-2/3" />
                </div>

                {/* Main content */}
                <div className="col-span-10 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-neutral-700 rounded-lg w-48" />
                    <div className="h-8 bg-primary-500/30 rounded-lg w-32" />
                  </div>

                  {/* Kanban columns */}
                  <div className="grid grid-cols-4 gap-4 h-[350px]">
                    {["To Do", "In Progress", "Review", "Done"].map((column, idx) => (
                      <div key={column} className="bg-neutral-700/30 rounded-xl p-3 space-y-3">
                        <div className="h-6 bg-neutral-600 rounded w-2/3" />
                        {[...Array(idx === 1 ? 3 : idx === 2 ? 2 : 2)].map((_, cardIdx) => (
                          <div
                            key={cardIdx}
                            className={`p-3 rounded-lg ${
                              idx === 1 && cardIdx === 0
                                ? "bg-primary-500/20 border border-primary-500/30"
                                : "bg-neutral-700"
                            }`}
                          >
                            <div className="h-4 bg-neutral-500/50 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-neutral-600/50 rounded w-1/2 mb-2" />
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full inline-block ${
                                  idx === 1
                                    ? "bg-agent-working"
                                    : idx === 3
                                      ? "bg-agent-online"
                                      : "bg-agent-idle"
                                }`}
                              />
                              <div className="h-3 bg-neutral-600/50 rounded w-16" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
