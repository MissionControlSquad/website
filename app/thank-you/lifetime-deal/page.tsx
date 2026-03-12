"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertTriangle, Mail, Clock, ArrowRight } from "@/components/icons";
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

function LifetimeDealThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!!sessionId);

  // Redirect to home if no session; otherwise fetch and fire conversion events
  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }

    let fired = false;

    async function fetchSession() {
      try {
        const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data: SessionData = await res.json();
        setSession(data);

        if (!fired && data.paymentStatus === "paid" && window.dataLayer) {
          fired = true;
          window.dataLayer.push({
            event: "purchase",
            ecommerce: {
              transaction_id: sessionId,
              value: data.amount ? data.amount / 100 : 0,
              currency: (data.currency || "usd").toUpperCase(),
              items: [{ item_name: "Lifetime Deal", item_category: "one-time" }],
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
  }, [sessionId, router]);

  const displayEmail = session?.email;
  const displayAmount = session?.amount != null ? `$${(session.amount / 100).toFixed(0)}` : null;

  return (
    <>
      <Navbar />

      <main id="main-content">
        <section className="relative flex min-h-screen items-center justify-center pt-24 pb-20">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-success-500/15 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary-500/10 blur-[100px]" />
          </div>

          <Container>
            {/* Loading state */}
            {loading && (
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-8">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/50">
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-primary-400" />
                  </div>
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                  Verifying Your Payment...
                </h1>
                <p className="mx-auto max-w-lg text-lg text-neutral-400">
                  Please wait while we confirm your lifetime deal purchase.
                </p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="mx-auto max-w-2xl text-center">
                <ScrollReveal className="mb-8" staggerIndex={0}>
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={40} className="text-red-400" aria-hidden="true" />
                  </div>
                </ScrollReveal>

                <ScrollReveal staggerIndex={1}>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                    Something Went Wrong
                  </h1>
                </ScrollReveal>

                <ScrollReveal staggerIndex={2}>
                  <p className="mx-auto max-w-lg text-lg text-neutral-400">
                    We couldn&apos;t verify your purchase. This can happen if the checkout session
                    expired or the payment didn&apos;t go through. Please try again or contact us if
                    you believe this is an error.
                  </p>
                </ScrollReveal>
              </div>
            )}

            {/* Success state */}
            {!loading && !error && (
              <div className="mx-auto max-w-2xl text-center">
                <ScrollReveal className="mb-8" staggerIndex={0}>
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-success-500/20 bg-success-500/10 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                    <CheckCircle size={40} className="text-success-500" aria-hidden="true" />
                  </div>
                </ScrollReveal>

                <ScrollReveal staggerIndex={1}>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                    Welcome, Founding Member!
                  </h1>
                </ScrollReveal>

                <ScrollReveal staggerIndex={2}>
                  <p className="mx-auto mb-12 max-w-lg text-lg text-neutral-400">
                    {displayAmount && (
                      <>
                        Your one-time payment of{" "}
                        <span className="font-medium text-neutral-100">{displayAmount}</span> has
                        been received.{" "}
                      </>
                    )}
                    {!displayAmount && <>Your payment has been received successfully. </>}
                    You now have lifetime access to AgentCenter.
                  </p>
                </ScrollReveal>

                <ScrollReveal
                  className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
                  staggerIndex={3}
                >
                  <div className="card-glow rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-500/20 bg-primary-500/10">
                        <Clock size={20} className="text-primary-400" aria-hidden="true" />
                      </div>
                      <h2 className="font-semibold text-neutral-100">Within 24 Hours</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400">
                      Our team will verify your purchase and set up your lifetime account.
                      You&apos;ll hear from us within a day.
                    </p>
                  </div>

                  <div className="card-glow rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-500/20 bg-primary-500/10">
                        <Mail size={20} className="text-primary-400" aria-hidden="true" />
                      </div>
                      <h2 className="font-semibold text-neutral-100">Check Your Email</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {displayEmail ? (
                        <>
                          We&apos;ll contact you at{" "}
                          <span className="font-medium text-neutral-200">{displayEmail}</span>. Keep
                          an eye on your inbox (and spam folder).
                        </>
                      ) : (
                        <>
                          We&apos;ll contact you at the email address you used during payment. Keep
                          an eye on your inbox (and spam folder).
                        </>
                      )}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  className="mb-12 rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-left"
                  staggerIndex={4}
                >
                  <h3 className="mb-5 text-lg font-semibold text-neutral-100">
                    What happens next?
                  </h3>
                  <ol className="space-y-4">
                    {[
                      {
                        step: "1",
                        text: "We verify your payment and provision your lifetime account.",
                      },
                      {
                        step: "2",
                        text: "You'll receive an email with your login credentials, setup guide, and Founding Member badge.",
                      },
                      {
                        step: "3",
                        text: "Connect your agents and start building — no monthly bills, ever.",
                      },
                    ].map((item) => (
                      <li key={item.step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-primary-500/20 bg-primary-500/10 text-sm font-semibold text-primary-400">
                          {item.step}
                        </span>
                        <span className="pt-0.5 text-neutral-300">{item.text}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>
              </div>
            )}

            {/* Shared CTA + support note */}
            {!loading && (
              <div className="mx-auto mt-12 max-w-2xl text-center">
                <ScrollReveal
                  className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                  staggerIndex={5}
                >
                  {error && (
                    <Link href="/lifetime-deal">
                      <Button size="lg">Try Again</Button>
                    </Link>
                  )}
                  <Link href="/">
                    <Button variant="secondary" size="lg">
                      Back to Home
                    </Button>
                  </Link>
                  <a href="mailto:founder@agentcenter.cloud">
                    <Button variant="outline" size="lg">
                      <span className="flex items-center gap-2">
                        Questions? Contact Us
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </Button>
                  </a>
                </ScrollReveal>

                <ScrollReveal className="mt-8 text-sm text-neutral-500" staggerIndex={6}>
                  <p>
                    Need help? Reach us at{" "}
                    <a
                      href="mailto:founder@agentcenter.cloud"
                      className="text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                    >
                      founder@agentcenter.cloud
                    </a>{" "}
                    or message me on{" "}
                    <a
                      href="https://x.com/AgentsCenter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                    >
                      X/Twitter
                    </a>
                  </p>
                </ScrollReveal>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function LifetimeDealThankYouPage() {
  return (
    <Suspense>
      <LifetimeDealThankYouContent />
    </Suspense>
  );
}
