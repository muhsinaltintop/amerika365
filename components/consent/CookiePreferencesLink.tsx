"use client";

import { useCookieConsent } from "./CookieConsentProvider";

export function CookiePreferencesLink({ saleOptOut = false, children }: { saleOptOut?: boolean; children: React.ReactNode }) {
  const { openPreferences, optOutSaleOrShare } = useCookieConsent();
  return (
    <button
      className="text-left transition-colors hover:text-[#0756b0]"
      type="button"
      onClick={saleOptOut ? optOutSaleOrShare : openPreferences}
    >
      {children}
    </button>
  );
}
