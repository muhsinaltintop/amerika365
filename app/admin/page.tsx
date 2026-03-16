import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NewsComposerPanel } from "@/components/admin/NewsComposerPanel";
import { getClerkSignInUrl, getClerkSignOutUrl, getSiteUrl, hasClerkSessionCookie } from "@/lib/auth/clerk";

export default async function AdminPage() {
  const headerStore = await headers();
  const siteUrl = getSiteUrl();
  const hasSession = hasClerkSessionCookie(headerStore.get("cookie"));

  if (!hasSession) {
    redirect(getClerkSignInUrl(`${siteUrl}/admin`));
  }

  return (
    <main className="min-h-screen bg-[#f7fbfd] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#0756b0] uppercase">Yönetim</p>
            <h1 className="text-3xl font-extrabold text-[#1b1a6b]">Haber Üretim Paneli</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
              Siteye Dön
            </Link>
            <a
              href={getClerkSignOutUrl(siteUrl)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Çıkış Yap
            </a>
          </div>
        </header>

        <NewsComposerPanel />
      </div>
    </main>
  );
}
