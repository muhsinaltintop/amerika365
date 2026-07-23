"use client";

import { useEffect } from "react";
import type { ConsentPreferences } from "@/lib/consent/types";
import { loadGoogleTagManager, shouldLoadGtm } from "@/lib/consent/googleConsent";

interface GoogleTagManagerProps {
  preferences: ConsentPreferences | null;
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager({ preferences }: GoogleTagManagerProps) {
  useEffect(() => {
    if (shouldLoadGtm(preferences)) {
      loadGoogleTagManager(gtmId);
    }
  }, [preferences]);

  // Basic Consent Mode: no noscript iframe is rendered because it would load GTM
  // before a client-side consent decision can be checked. SPA page views are not
  // pushed here to avoid duplicate GA4 hits; configure GA4 page views and any
  // History Change trigger inside GTM after consent checks are enabled.
  return null;
}
