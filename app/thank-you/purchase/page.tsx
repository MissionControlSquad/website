"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Mail, Clock, ArrowRight } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface SessionData {
  email: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  paymentStatus: string | null;
  plan: string | null;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!!sessionId);

  // Fetch session details and fire conversion events
  useEffect(() => {
    if (!sessionId) return;

    let fired = false;

    async function fetchSession() {
      try {
        const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data: SessionData = await res.json();
        setSession(data);

        // Fire GTM dataLayer event once
        if (!fired && data.paymentStatus === "paid" && window.dataLayer) {
          fired = true;
          window.dataLayer.push({
            event: "purchase",
            ecommerce: {
              transaction_id: sessionId,
              value: data.amount ? data.amount / 100 : 0,
              currency: (data.currency || "usd").toUpperCase(),
            },
          });
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  const displayEmail = session?.email;
  const displayAmount = session?.amount != null ? `$${(session.amount / 100).toFixed(2)}` : null;
  const billingLabel = session?.plan === "yearly" ? "year" : "month";

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
                  Thank You for Your Payment!
                </h1>
              </ScrollReveal>

              {/* Subtext with real data */}
              <ScrollReveal staggerIndex={2}>
                {loading ? (
                  <div className="h-6 w-64 mx-auto mb-12 rounded bg-neutral-800 animate-pulse" />
                ) : error ? (
                  <p className="text-lg text-neutral-400 mb-12 max-w-lg mx-auto">
                    Your payment has been received successfully. We&apos;re excited to get you
                    started with AgentCenter.
                  </p>
                ) : (
                  <p className="text-lg text-neutral-400 mb-12 max-w-lg mx-auto">
                    {displayAmount && (
                      <>
                        Your payment of{" "}
                        <span className="text-neutral-100 font-medium">
                          {displayAmount}/{billingLabel}
                        </span>{" "}
                        has been received.{" "}
                      </>
                    )}
                    {!displayAmount && <>Your payment has been received successfully. </>}
                    We&apos;re excited to get you started with AgentCenter.
                  </p>
                )}
              </ScrollReveal>

              {/* Info cards */}
              <ScrollReveal
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
                staggerIndex={3}
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
                    {displayEmail ? (
                      <>
                        We&apos;ll contact you at{" "}
                        <span className="text-neutral-200 font-medium">{displayEmail}</span>. Keep
                        an eye on your inbox (and spam folder).
                      </>
                    ) : (
                      <>
                        We&apos;ll contact you at the email address you used during payment. Keep an
                        eye on your inbox (and spam folder).
                      </>
                    )}
                  </p>
                </div>
              </ScrollReveal>

              {/* What happens next */}
              <ScrollReveal
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 mb-12 text-left"
                staggerIndex={4}
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
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                staggerIndex={5}
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

              {/* Support note */}
              <ScrollReveal className="mt-8 text-sm text-neutral-500" staggerIndex={6}>
                <p>
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
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
