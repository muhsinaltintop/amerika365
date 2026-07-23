import { CONSENT_COOKIE_MAX_AGE, CONSENT_COOKIE_NAME, CONSENT_VERSION } from "./constants";
import type { ConsentPreferences } from "./types";

const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";

function isValidConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ConsentPreferences>;
  return (
    candidate.version === CONSENT_VERSION &&
    (candidate.choice === "accepted" || candidate.choice === "rejected" || candidate.choice === "custom") &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.advertising === "boolean" &&
    typeof candidate.personalization === "boolean" &&
    typeof candidate.updatedAt === "string"
  );
}

export function readConsentCookie(): ConsentPreferences | null {
  if (!isBrowser()) return null;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!cookie) return null;

  try {
    const rawValue = cookie.substring(CONSENT_COOKIE_NAME.length + 1);
    const parsed: unknown = JSON.parse(decodeURIComponent(rawValue));
    return isValidConsentPreferences(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsentCookie(preferences: ConsentPreferences): void {
  if (!isBrowser()) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(preferences))}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function domainCandidates(hostname: string): string[] {
  if (!hostname || hostname === "localhost" || /^[\d.]+$/.test(hostname)) return [""];
  const parts = hostname.split(".").filter(Boolean);
  const domains = [""];
  for (let index = 0; index <= Math.max(parts.length - 2, 0); index += 1) {
    domains.push(`.${parts.slice(index).join(".")}`);
  }
  return Array.from(new Set(domains));
}

export function clearAccessibleGoogleCookies(): void {
  if (!isBrowser()) return;
  const googleCookiePattern = /^(_ga(_.*)?|_gid|_gat|_gcl_.*|_gac_.*|__gads|__gpi)$/;
  const cookieNames = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter((name) => googleCookiePattern.test(name));

  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  for (const name of cookieNames) {
    for (const domain of domainCandidates(window.location.hostname)) {
      const domainPart = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Path=/; Expires=${expires}; Max-Age=0; SameSite=Lax${domainPart}`;
    }
  }
  // JavaScript can only delete first-party cookies visible to the current domain;
  // third-party Google cookies on other domains cannot be removed from site code.
}
