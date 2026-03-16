import Link from "next/link";
import { getClerkSignInUrl, getSiteUrl } from "@/lib/auth/clerk";

export default function SignInPage() {
  const signInUrl = getClerkSignInUrl(`${getSiteUrl()}/admin`);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7fbfd] px-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-[#0756b0] uppercase">Clerk Giriş</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#1b1a6b]">Editör Paneline Giriş Yap</h1>
        <p className="mt-3 text-sm text-slate-600">
          Yönetim paneli Clerk oturumu ile korunur. Giriş yaptıktan sonra otomatik olarak admin paneline yönlendirilirsiniz.
        </p>

        <a href={signInUrl} className="mt-6 inline-flex rounded-xl bg-[#0756b0] px-5 py-3 text-sm font-bold text-white">
          Clerk ile Giriş Yap
        </a>

        <p className="mt-4 text-xs text-slate-500">
          Not: Bu projede Clerk hosted sign-in URL’si <code>NEXT_PUBLIC_CLERK_SIGN_IN_URL</code> ile yapılandırılır.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#0756b0]">
          ← Ana sayfaya dön
        </Link>
      </section>
    </main>
  );
}
