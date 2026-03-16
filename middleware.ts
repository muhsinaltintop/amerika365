import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClerkSignInUrl, hasClerkSessionCookie } from "@/lib/auth/clerk";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const hasSession = hasClerkSessionCookie(request.headers.get("cookie"));

  if (hasSession) {
    return NextResponse.next();
  }

  const signInUrl = getClerkSignInUrl(request.url);
  const target = signInUrl.startsWith("http") ? signInUrl : new URL(signInUrl, request.url);
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/admin/:path*"],
};
