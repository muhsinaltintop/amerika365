import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";

export const metadata = { title: "Çerez Politikası | Amerika 365" };

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-[#1b1a6b] dark:text-white">Çerez Politikası</h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300">Zorunlu çerezler site güvenliği, temel işlevler ve çerez tercihinizin saklanması için kullanılır. Analiz, reklam ve kişiselleştirme çerezleri yalnızca açık izninizle etkinleştirilir.</p>
        <p className="mt-4 text-slate-700 dark:text-slate-300">Tercihleriniz birinci taraf <code>amerika365_consent</code> çerezinde bir yıl boyunca saklanır ve kişisel bilgi içermez.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
