"use client";

import { motion } from "framer-motion";
import { PlusCircle, Bot, CheckCircle, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  PlusCircle,
  Bot,
  CheckCircle,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-neutral-900/50">
      <Container>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Get started in minutes. Create tasks, let agents work, review the
            results.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Connector line (mobile) */}
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="md:hidden absolute top-24 left-1/2 w-px h-16 bg-gradient-to-b from-neutral-700 to-transparent -translate-x-1/2" />
                  )}

                  {/* Number badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-500" aria-hidden="true" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-glow-sm">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
