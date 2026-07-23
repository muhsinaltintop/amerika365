"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { CONSENT_VERSION } from "@/lib/consent/constants";
import { applyDefaultConsent, ensureGoogleConsentRuntime, updateGoogleConsent } from "@/lib/consent/googleConsent";
import { clearAccessibleGoogleCookies, readConsentCookie, writeConsentCookie } from "@/lib/consent/storage";
import type { ConsentPreferences } from "@/lib/consent/types";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

type PreferenceBooleans = Pick<ConsentPreferences, "analytics" | "advertising" | "personalization">;

interface CookieConsentContextValue {
  preferences: ConsentPreferences | null;
  hasDecision: boolean;
  isBannerOpen: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: PreferenceBooleans) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  optOutSaleOrShare: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function buildPreferences(choice: ConsentPreferences["choice"], values: PreferenceBooleans): ConsentPreferences {
  return { version: CONSENT_VERSION, choice, ...values, updatedAt: new Date().toISOString() };
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureGoogleConsentRuntime();
    const stored = readConsentCookie();
    applyDefaultConsent(stored);
    window.setTimeout(() => {
      setPreferences(stored);
      setIsInitialized(true);
    }, 0);
  }, []);

  const persist = useCallback((nextPreferences: ConsentPreferences) => {
    const previouslyAllowed = preferences?.analytics === true || preferences?.advertising === true;
    writeConsentCookie(nextPreferences);
    updateGoogleConsent(nextPreferences);
    setPreferences(nextPreferences);
    if (!nextPreferences.analytics && !nextPreferences.advertising && previouslyAllowed) {
      clearAccessibleGoogleCookies();
    }
  }, [preferences]);

  const acceptAll = useCallback(() => {
    const nextPreferences = buildPreferences("accepted", { analytics: true, advertising: true, personalization: true });
    persist(nextPreferences);
    window.dataLayer.push({ event: "consent_granted", consent_choice: "accepted" });
    setIsPreferencesOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist(buildPreferences("rejected", { analytics: false, advertising: false, personalization: false }));
    clearAccessibleGoogleCookies();
    setIsPreferencesOpen(false);
  }, [persist]);

  const savePreferences = useCallback((values: PreferenceBooleans) => {
    persist(buildPreferences("custom", values));
    if (!values.analytics && !values.advertising) clearAccessibleGoogleCookies();
    setIsPreferencesOpen(false);
  }, [persist]);

  const openPreferences = useCallback(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
    openerRef.current?.focus();
  }, []);

  const optOutSaleOrShare = useCallback(() => {
    const base = preferences ?? buildPreferences("custom", { analytics: false, advertising: false, personalization: false });
    persist({ ...base, version: CONSENT_VERSION, choice: "custom", advertising: false, updatedAt: new Date().toISOString() });
    clearAccessibleGoogleCookies();
    setIsPreferencesOpen(true);
  }, [preferences, persist]);

  const value = useMemo<CookieConsentContextValue>(() => ({
    preferences,
    hasDecision: Boolean(preferences),
    isBannerOpen: isInitialized && !preferences,
    isPreferencesOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
    optOutSaleOrShare,
  }), [acceptAll, closePreferences, isInitialized, isPreferencesOpen, openPreferences, optOutSaleOrShare, preferences, rejectAll, savePreferences]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {isInitialized ? <GoogleTagManager preferences={preferences} /> : null}
      <CookieBanner />
      <CookiePreferencesModal />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}
