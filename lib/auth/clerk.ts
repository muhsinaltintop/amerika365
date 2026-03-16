const signInUrlFromEnv = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL?.trim();
const signOutUrlFromEnv = process.env.NEXT_PUBLIC_CLERK_SIGN_OUT_URL?.trim();

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export function getClerkSignInUrl(redirectUrl?: string) {
  if (!signInUrlFromEnv) {
    return "/giris";
  }

  if (!redirectUrl) {
    return signInUrlFromEnv;
  }

  const parsed = new URL(signInUrlFromEnv);
  parsed.searchParams.set("redirect_url", redirectUrl);
  return parsed.toString();
}

export function getClerkSignOutUrl(redirectUrl?: string) {
  if (!signOutUrlFromEnv) {
    return redirectUrl ?? "/";
  }

  if (!redirectUrl) {
    return signOutUrlFromEnv;
  }

  const parsed = new URL(signOutUrlFromEnv);
  parsed.searchParams.set("redirect_url", redirectUrl);
  return parsed.toString();
}

export function hasClerkSessionCookie(cookieHeader: string | null) {
  if (!cookieHeader) {
    return false;
  }

  return cookieHeader.split(";").some((chunk) => chunk.trim().startsWith("__session="));
}
