"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertTriangle, Mail, Clock, ArrowRight, Key } from "@/components/icons";
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

function SelfHostingThankYouContent() {
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
              items: [
                {
                  item_name: "AgentCenter Self-Hosting License",
                  item_category: "self-hosting",
                  item_variant: data.plan ?? "monthly",
                },
              ],
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
  const displayAmount = session?.amount != null ? `$${(session.amount / 100).toFixed(2)}` : null;
  const billingLabel = session?.plan === "yearly" ? "year" : "month";

  const nextSteps = [
    {
      step: "1",
      text: "We verify your purchase and generate your unique activation key.",
    },
    {
      step: "2",
      text: "You'll receive an email with your activation key and the Docker image tag.",
    },
    {
      step: "3",
      text: "Pull the image on your server using the docker-compose.yml we include in the email.",
    },
    {
      step: "4",
      text: "Run docker-compose up, open the app in your browser, and enter your activation key on the activation page when prompted. You're live.",
    },
  ];

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
            {/* Loading */}
            {loading && (
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-8">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/50">
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-primary-400" />
                  </div>
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                  Verifying Your Purchase…
                </h1>
                <p className="mx-auto max-w-lg text-lg text-neutral-400">
                  Please wait while we confirm your self-hosting license.
                </p>
              </div>
            )}

            {/* Error */}
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

            {/* Success */}
            {!loading && !error && (
              <div className="mx-auto max-w-2xl text-center">
                <ScrollReveal className="mb-6" staggerIndex={0}>
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-success-500/30 bg-success-500/10 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
                    <CheckCircle size={40} className="text-success-400" aria-hidden="true" />
                  </div>
                </ScrollReveal>

                <ScrollReveal staggerIndex={1}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-success-500/20 bg-success-500/10 px-3 py-1 text-xs font-medium text-success-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                    License confirmed
                  </div>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                    Your Self-Hosting License Is Ready
                  </h1>
                </ScrollReveal>

                <ScrollReveal staggerIndex={2}>
                  <p className="mx-auto mb-10 max-w-lg text-lg text-neutral-400">
                    {displayAmount ? (
                      <>
                        Payment of{" "}
                        <span className="font-semibold text-neutral-100">
                          {displayAmount}/{billingLabel}
                        </span>{" "}
                        confirmed.{" "}
                      </>
                    ) : (
                      <>Payment confirmed. </>
                    )}
                    Your activation key and Docker image details are on their way.
                  </p>
                </ScrollReveal>

                {/* Info cards */}
                <ScrollReveal
                  className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
                  staggerIndex={3}
                >
                  {[
                    {
                      icon: Clock,
                      title: "Within 24 Hours",
                      body: "We'll generate your unique activation key and send everything you need to get started.",
                    },
                    {
                      icon: Key,
                      title: "Activation Key",
                      body: "Enter it once on the app's activation page after first launch — no config files, no env vars.",
                    },
                    {
                      icon: Mail,
                      title: "Check Your Email",
                      body: displayEmail
                        ? `We'll send everything to ${displayEmail}. Check your spam folder too.`
                        : "We'll send to the email you used at checkout. Check your spam folder too.",
                      highlight: displayEmail ?? undefined,
                    },
                  ].map(({ icon: Icon, title, body, highlight }) => (
                    <div
                      key={title}
                      className="flex flex-col gap-4 rounded-xl border border-neutral-700/60 bg-neutral-800/40 p-5 text-left"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-primary-500/30 bg-primary-500/10">
                        <Icon size={20} className="text-primary-400" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="mb-1.5 font-semibold text-neutral-100">{title}</h2>
                        <p className="text-sm leading-relaxed text-neutral-400 break-words">
                          {highlight
                            ? body.split(highlight).map((part, i, arr) =>
                                i < arr.length - 1 ? (
                                  <span key={i}>
                                    {part}
                                    <span className="break-all font-medium text-neutral-200">
                                      {highlight}
                                    </span>
                                  </span>
                                ) : (
                                  part
                                )
                              )
                            : body}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollReveal>

                {/* Next steps */}
                <ScrollReveal
                  className="mb-12 rounded-xl border border-neutral-700/60 bg-neutral-800/30 p-8 text-left"
                  staggerIndex={4}
                >
                  <h3 className="mb-6 text-base font-semibold uppercase tracking-wider text-neutral-500">
                    What happens next
                  </h3>
                  <ol className="space-y-5">
                    {nextSteps.map((item, idx) => (
                      <li key={item.step} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm font-bold text-primary-400 ring-1 ring-primary-500/30">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <span className="text-sm leading-relaxed text-neutral-300">
                            {item.text}
                          </span>
                          {idx < nextSteps.length - 1 && (
                            <div className="mt-5 h-px w-full bg-neutral-700/50" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>
              </div>
            )}

            {/* Shared CTA + support — always visible after load */}
            {!loading && (
              <div className="mx-auto mt-12 max-w-2xl text-center">
                <ScrollReveal
                  className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                  staggerIndex={5}
                >
                  {error && (
                    <Link href="/self-hosting">
                      <Button size="lg">Try Again</Button>
                    </Link>
                  )}
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

                <ScrollReveal className="mt-8 text-sm text-neutral-500" staggerIndex={6}>
                  <p>
                    Need setup help? Reach us at{" "}
                    <a
                      href="mailto:hey@dharmikjagodana.com"
                      className="text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                    >
                      hey@dharmikjagodana.com
                    </a>{" "}
                    or message me on{" "}
                    <a
                      href="https://x.com/dharmikjagodana"
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

export default function SelfHostingThankYouPage() {
  return (
    <Suspense>
      <SelfHostingThankYouContent />
    </Suspense>
  );
}
