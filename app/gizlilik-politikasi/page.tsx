import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";

export const metadata = { title: "Gizlilik Politikası | Amerika 365" };

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-[#1b1a6b] dark:text-white">Gizlilik Politikası</h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300">Amerika365, site deneyimini sağlamak, temel tercihleri kaydetmek ve kullanıcının açık izni olduğunda analiz ve reklam ölçümü yapmak için sınırlı çerezler ve benzer teknolojiler kullanır.</p>
        <p className="mt-4 text-slate-700 dark:text-slate-300">Çerez tercihlerinizi sayfanın altındaki “Çerez Tercihleri” bağlantısından dilediğiniz zaman güncelleyebilirsiniz. Bu sayfa kapsamlı politika metni yayımlanana kadar temel bilgilendirme amacıyla hazırlanmıştır.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
