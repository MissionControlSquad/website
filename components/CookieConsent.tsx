"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateConsentGranted, type ConsentCategories } from "@/lib/analytics";

const STORAGE_KEY = "ac_cookie_consent";
const CONSENT_VERSION = 1;

interface StoredConsent {
  categories: ConsentCategories;
  timestamp: string;
  version: number;
}

function buildConsent(categories: ConsentCategories): StoredConsent {
  return { categories, timestamp: new Date().toISOString(), version: CONSENT_VERSION };
}

const DEFAULT_CATEGORIES: ConsentCategories = {
  analytics: true,
  marketing: false,
  behaviour: true,
  crm: true,
  affiliate: true,
};

export function CookieConsent() {
  // Lazy initializer: show banner immediately if no valid consent stored (avoids setState in effect)
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    try {
      JSON.parse(stored);
      return false;
    } catch {
      return true;
    }
  });
  const [customizing, setCustomizing] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT_CATEGORIES);

  useEffect(() => {
    function handleOpen() {
      setCustomizing(false);
      // Restore previously saved categories so the Customize panel reflects real state
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.categories) setCategories(parsed.categories as ConsentCategories);
        } catch {
          setCategories(DEFAULT_CATEGORIES);
        }
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
      setVisible(true);
    }
    window.addEventListener("openCookieConsent", handleOpen);
    return () => window.removeEventListener("openCookieConsent", handleOpen);
  }, []);

  function saveConsent(cats: ConsentCategories) {
    const consent = buildConsent(cats);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    try {
      updateConsentGranted(cats);
    } catch {
      // never block the UI if analytics throws
    }
    window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: consent }));
    setVisible(false);
    setCustomizing(false);
  }

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true, behaviour: true, crm: true, affiliate: true });
  }

  function rejectAll() {
    saveConsent({
      analytics: false,
      marketing: false,
      behaviour: false,
      crm: false,
      affiliate: false,
    });
  }

  function saveCustom() {
    saveConsent(categories);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        {!customizing ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-neutral-100 font-semibold text-sm mb-1">We use cookies</p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We use analytics, session recording, and affiliate cookies to improve your
                experience and understand site usage. Non-essential cookies are only set after you
                accept.{" "}
                <Link
                  href="/legal/cookies"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <button
                onClick={() => setCustomizing(true)}
                className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm font-semibold hover:bg-neutral-700 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm font-semibold hover:bg-neutral-700 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-neutral-100 font-semibold text-sm mb-1">
                Customize Cookie Preferences
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Choose which cookies you allow.{" "}
                <Link
                  href="/legal/cookies"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {/* Essential — always on */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-800">
                <div>
                  <p className="text-neutral-100 text-sm font-semibold">Essential</p>
                  <p className="text-neutral-500 text-xs mt-0.5">
                    Authentication, session management, and Cloudflare security. Required.
                  </p>
                </div>
                <div
                  className="w-10 h-5 bg-primary-500 rounded-full opacity-50 cursor-not-allowed flex-shrink-0"
                  aria-label="Always on"
                />
              </div>

              {/* Analytics */}
              <Toggle
                label="Analytics"
                description="Google Analytics & Plausible — helps us understand traffic and improve the site."
                checked={categories.analytics}
                onChange={(v) => setCategories((c) => ({ ...c, analytics: v }))}
              />

              {/* Behaviour / UX */}
              <Toggle
                label="Behaviour / UX"
                description="Hotjar session replays and heatmaps — anonymised; payment fields never recorded."
                checked={categories.behaviour}
                onChange={(v) => setCategories((c) => ({ ...c, behaviour: v }))}
              />

              {/* CRM / Chat */}
              <Toggle
                label="CRM / Chat"
                description="HubSpot live chat widget and contact management for support."
                checked={categories.crm}
                onChange={(v) => setCategories((c) => ({ ...c, crm: v }))}
              />

              {/* Marketing */}
              <Toggle
                label="Marketing"
                description="Google Ads conversion tracking and remarketing."
                checked={categories.marketing}
                onChange={(v) => setCategories((c) => ({ ...c, marketing: v }))}
              />

              {/* Affiliate */}
              <Toggle
                label="Affiliate"
                description="Endorsely referral tracking — only active if you arrive via an affiliate link."
                checked={categories.affiliate}
                onChange={(v) => setCategories((c) => ({ ...c, affiliate: v }))}
                last
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setCustomizing(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm font-semibold hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm font-semibold hover:bg-neutral-700 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={saveCustom}
                className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
  last = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${last ? "" : "border-b border-neutral-800"}`}
    >
      <div>
        <p className="text-neutral-100 text-sm font-semibold">{label}</p>
        <p className="text-neutral-500 text-xs mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ml-4 ${
          checked ? "bg-primary-500" : "bg-neutral-700"
        }`}
        aria-label={`Toggle ${label} cookies`}
      />
    </div>
  );
}
