"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Mail, ArrowRight } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { trackSignupConversion } from "@/lib/tracking";

export default function ThankYouSignupPage() {
  useEffect(() => {
    trackSignupConversion();
  }, []);

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
            <div className="max-w-2xl mx-auto text-center">
              {/* Success icon */}
              <ScrollReveal className="mb-8" staggerIndex={0}>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-500/10 border border-success-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                  <CheckCircle size={40} className="text-success-500" aria-hidden="true" />
                </div>
              </ScrollReveal>

              {/* Heading */}
              <ScrollReveal staggerIndex={1}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 mb-4">
                  Welcome to AgentCenter!
                </h1>
              </ScrollReveal>

              {/* Subtext */}
              <ScrollReveal staggerIndex={2}>
                <p className="text-lg text-neutral-400 mb-12 max-w-lg mx-auto">
                  Your account has been created successfully. You&apos;re all set to start managing
                  your AI agents.
                </p>
              </ScrollReveal>

              {/* Info card */}
              <ScrollReveal className="mb-12" staggerIndex={3}>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left card-glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <Mail size={20} className="text-primary-400" aria-hidden="true" />
                    </div>
                    <h2 className="font-semibold text-neutral-100">Check Your Email</h2>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    We&apos;ve sent a confirmation email with your login details and a quick-start
                    guide. Check your inbox (and spam folder) to get started.
                  </p>
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                staggerIndex={4}
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
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
