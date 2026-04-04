"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { CheckCircle, AlertTriangle, Mail, Clock, ArrowRight } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { trackPlanUpgrade } from "@/lib/analytics";

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

        if (!fired && data.paymentStatus === "paid") {
          fired = true;
          const value = data.amount ? data.amount / 100 : 0;
          const planName = data.plan ?? "monthly";

          if (window.dataLayer) {
            window.dataLayer.push({
              event: "purchase",
              ecommerce: {
                transaction_id: sessionId,
                value,
                currency: (data.currency || "usd").toUpperCase(),
              },
            });
          }

          await trackPlanUpgrade(planName, value, data.email);
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
            {/* Loading state */}
            {loading && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-800/50 border border-neutral-700">
                    <span className="w-10 h-10 border-4 border-neutral-700 border-t-primary-400 rounded-full animate-spin" />
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 mb-4">
                  Verifying Your Payment...
                </h1>
                <p className="text-lg text-neutral-400 max-w-lg mx-auto">
                  Please wait while we confirm your subscription.
                </p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="max-w-2xl mx-auto text-center">
                <ScrollReveal className="mb-8" staggerIndex={0}>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={40} className="text-red-400" aria-hidden="true" />
                  </div>
                </ScrollReveal>

                <ScrollReveal staggerIndex={1}>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 mb-4">
                    Something Went Wrong
                  </h1>
                </ScrollReveal>

                <ScrollReveal staggerIndex={2}>
                  <p className="text-lg text-neutral-400 max-w-lg mx-auto">
                    We couldn&apos;t verify your subscription. This can happen if the checkout
                    session expired or the payment didn&apos;t go through. Please try again or
                    contact us if you believe this is an error.
                  </p>
                </ScrollReveal>
              </div>
            )}

            {/* Success state */}
            {!loading && !error && (
              <div className="max-w-2xl mx-auto text-center">
                <ScrollReveal className="mb-8" staggerIndex={0}>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-500/10 border border-success-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                    <CheckCircle size={40} className="text-success-500" aria-hidden="true" />
                  </div>
                </ScrollReveal>

                <ScrollReveal staggerIndex={1}>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 mb-4">
                    Thank You for Your Payment!
                  </h1>
                </ScrollReveal>

                <ScrollReveal staggerIndex={2}>
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
                </ScrollReveal>

                <ScrollReveal
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
                  staggerIndex={3}
                >
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
                          We&apos;ll contact you at the email address you used during payment. Keep
                          an eye on your inbox (and spam folder).
                        </>
                      )}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 mb-12 text-left"
                  staggerIndex={4}
                >
                  <h3 className="text-lg font-semibold text-neutral-100 mb-5">
                    What happens next?
                  </h3>
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
              </div>
            )}

            {/* Shared CTA + support note (success & error) */}
            {!loading && (
              <div className="max-w-2xl mx-auto text-center mt-12">
                <ScrollReveal
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  staggerIndex={5}
                >
                  {error && <GetStartedButton size="lg" label="Try Again" />}
                  <Link href="/">
                    <Button variant="secondary" size="lg">
                      Back to Home
                    </Button>
                  </Link>
                  <a href={`mailto:${CONTACT_EMAIL}`}>
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
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-2"
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    or message me on{" "}
                    <a
                      href="https://x.com/AgentsCenter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-2"
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

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
