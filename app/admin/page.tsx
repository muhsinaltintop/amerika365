import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NewsComposerPanel } from "@/components/admin/NewsComposerPanel";

export default async function AdminPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: "/admin" });
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
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <NewsComposerPanel />
      </div>
    </main>
  );
}
