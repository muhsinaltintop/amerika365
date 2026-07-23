import { DEFAULT_CONSENT_STATE, GTM_SCRIPT_ID } from "./constants";
import type { ConsentPreferences, GoogleConsentState } from "./types";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    __amerika365GtmLoaded?: boolean;
  }
}

export function ensureGoogleConsentRuntime(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args as unknown as Record<string, unknown>);
  };
}

export function consentStateFromPreferences(preferences: ConsentPreferences | null): GoogleConsentState {
  if (!preferences) return DEFAULT_CONSENT_STATE;
  return {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.advertising ? "granted" : "denied",
    ad_user_data: preferences.advertising ? "granted" : "denied",
    ad_personalization: preferences.advertising && preferences.personalization ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: preferences.personalization ? "granted" : "denied",
    security_storage: "granted",
  };
}

export function applyDefaultConsent(preferences: ConsentPreferences | null): void {
  ensureGoogleConsentRuntime();
  window.gtag("consent", "default", consentStateFromPreferences(preferences));
}

export function updateGoogleConsent(preferences: ConsentPreferences): void {
  ensureGoogleConsentRuntime();
  window.gtag("consent", "update", consentStateFromPreferences(preferences));
}

export function shouldLoadGtm(preferences: ConsentPreferences | null): boolean {
  return preferences?.analytics === true || preferences?.advertising === true;
}

export function loadGoogleTagManager(gtmId: string | undefined): void {
  if (!gtmId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("NEXT_PUBLIC_GTM_ID tanımlı olmadığı için Google Tag Manager yüklenmedi.");
    }
    return;
  }

  ensureGoogleConsentRuntime();
  if (window.__amerika365GtmLoaded || document.getElementById(GTM_SCRIPT_ID)) return;

  window.__amerika365GtmLoaded = true;
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}
