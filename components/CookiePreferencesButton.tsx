"use client";

export function CookiePreferencesButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("openCookieConsent"))}
      className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm text-left"
    >
      Manage Cookie Preferences
    </button>
  );
}
