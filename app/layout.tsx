import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SocialShareFab } from "@/components/organisms/SocialShareFab";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amerika 365",
  description: "ABD'deki Türk toplumu için güncel haberler ve rehber içerikler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700"
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ClerkProvider>
          <header className="border-b border-slate-200 bg-white/90">
            <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
              <Link href="/" className="text-sm font-extrabold text-[#1b1a6b]">
                Amerika365
              </Link>
              <div className="flex items-center gap-2">
                <Show when="signed-out">
                  <SignInButton>
                    <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">Giriş Yap</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="rounded-lg bg-[#0756b0] px-3 py-1.5 text-xs font-semibold text-white">Kayıt Ol</button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton afterSignOutUrl="/" />
                </Show>
              </div>
            </div>
          </header>

          {children}
          <SocialShareFab />
        </ClerkProvider>
      </body>
    </html>
  );
}
