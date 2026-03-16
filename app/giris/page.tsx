import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7fbfd] px-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-[#0756b0] uppercase">Clerk Giriş</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#1b1a6b]">Editör Paneline Giriş Yap</h1>
        <p className="mt-3 text-sm text-slate-600">Giriş yaptıktan sonra admin paneline devam edebilirsiniz.</p>

        <div className="mt-6 overflow-auto">
          <SignIn fallbackRedirectUrl="/admin" />
        </div>

        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#0756b0]">
          ← Ana sayfaya dön
        </Link>
      </section>
    </main>
  );
}
