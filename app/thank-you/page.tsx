"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Mail, Clock, ArrowRight } from "@/components/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-success-500/15 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary-500/10 blur-[100px] rounded-full" />
          </div>

          <Container>
            <motion.div
              className="max-w-2xl mx-auto text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Success icon */}
              <motion.div variants={checkVariants} className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-500/10 border border-success-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                  <CheckCircle size={40} className="text-success-500" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 mb-4"
              >
                Thank You for Your Payment!
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-neutral-400 mb-12 max-w-lg mx-auto"
              >
                Your payment has been received successfully. We&apos;re excited to get you started
                with AgentCenter.
              </motion.p>

              {/* Info cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
              >
                {/* Response time card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left card-glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <Clock size={20} className="text-primary-400" aria-hidden="true" />
                    </div>
                    <h2 className="font-semibold text-neutral-100">Within 24 Hours</h2>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Our team will review your payment and reach out to you within 24 hours with
                    everything you need to get started.
                  </p>
                </div>

                {/* Email contact card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left card-glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <Mail size={20} className="text-primary-400" aria-hidden="true" />
                    </div>
                    <h2 className="font-semibold text-neutral-100">Check Your Email</h2>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    We&apos;ll contact you at the email address you used during payment. Keep an eye
                    on your inbox (and spam folder).
                  </p>
                </div>
              </motion.div>

              {/* What happens next */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 mb-12 text-left"
              >
                <h3 className="text-lg font-semibold text-neutral-100 mb-5">What happens next?</h3>
                <ol className="space-y-4">
                  {[
                    {
                      step: "1",
                      text: "We verify your payment and set up your account.",
                    },
                    {
                      step: "2",
                      text: "You'll receive an email with your login credentials and setup guide.",
                    },
                    {
                      step: "3",
                      text: "Connect your OpenClaw agents and start managing your AI team.",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold">
                        {item.step}
                      </span>
                      <span className="text-neutral-300 pt-0.5">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/">
                  <Button variant="secondary" size="lg">
                    Back to Home
                  </Button>
                </Link>
                <a href="mailto:hey@dharmikjagodana.com">
                  <Button variant="outline" size="lg">
                    <span className="flex items-center gap-2">
                      Questions? Contact Us
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Button>
                </a>
              </motion.div>

              {/* Support note */}
              <motion.p variants={itemVariants} className="mt-8 text-sm text-neutral-500">
                Need help? Reach us at{" "}
                <a
                  href="mailto:hey@dharmikjagodana.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-2"
                >
                  hey@dharmikjagodana.com
                </a>{" "}
                or message me on{" "}
                <a
                  href="https://x.com/dharmikjagodana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-2"
                >
                  X/Twitter
                </a>
              </motion.p>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
