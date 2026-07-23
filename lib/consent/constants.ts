import type { GoogleConsentState } from "./types";

export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE_NAME = "amerika365_consent";
export const CONSENT_COOKIE_MAX_AGE = 31_536_000;
export const GTM_SCRIPT_ID = "amerika365-gtm-script";

export const DEFAULT_CONSENT_STATE: GoogleConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
};
