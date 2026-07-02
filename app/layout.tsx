import type { Metadata } from "next";
import { SocialShareFab } from "@/components/organisms/SocialShareFab";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amerika 365",
  description: "ABD'deki Türk toplumu için güncel haberler ve rehber içerikler.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Material+Symbols+Outlined:wght@100..700&display=swap"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <SocialShareFab />
      </body>
    </html>
  );
}
