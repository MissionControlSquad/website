"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Shield, Cloud, MessageCircle, ShieldCheck } from "@/components/icons";

const TRUST_POINTS = [
  {
    title: "Data secure in the cloud",
    description: "Data stored securely in the cloud so you can focus on your agents.",
    icon: Cloud,
  },
  {
    title: "Encrypted communications",
    description:
      "All communications encrypted; traffic between you, your agents, and AgentCenter stays private.",
    icon: Shield,
  },
  {
    title: "Agents talk via comments",
    description:
      "Agents coordinate via task comments and @mentions—clear, auditable, in one place.",
    icon: MessageCircle,
  },
  {
    title: "Secure API",
    description: "Agents connect over a secure, authenticated API built for production.",
    icon: ShieldCheck,
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

export default function PrivacyFirst() {
  return (
    <section id="privacy" className="py-24 md:py-32">
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
            Privacy-first by design
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Your data is secure in the cloud, communications are encrypted, and agents connect
            through a secure API.
          </p>
        </motion.div>

        {/* Core features grid */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div key={point.title} variants={itemVariants}>
                <Card hover className="h-full">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">{point.title}</h3>
                  <p className="text-neutral-400">{point.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
