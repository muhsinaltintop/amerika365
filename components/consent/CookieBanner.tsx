"use client";

import Link from "next/link";
import { useCookieConsent } from "./CookieConsentProvider";

export function CookieBanner() {
  const { isBannerOpen, acceptAll, rejectAll, openPreferences } = useCookieConsent();
  if (!isBannerOpen) return null;
  return (
    <section className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95" aria-label="Çerez onayı">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
          Amerika365; siteyi çalıştırmak, ziyaretleri analiz etmek ve size daha ilgili reklamlar sunmak için çerezler ve benzer teknolojiler kullanır. Zorunlu olmayan çerezleri kabul edebilir, reddedebilir veya tercihlerinizi özelleştirebilirsiniz. Ayrıntılar için <Link className="font-semibold text-[#0756b0] underline" href="/gizlilik-politikasi">Gizlilik Politikamızı</Link> ve <Link className="font-semibold text-[#0756b0] underline" href="/cerez-politikasi">Çerez Politikamızı</Link> inceleyin.
        </p>
        <div className="grid gap-2 sm:grid-cols-3 md:min-w-[520px]">
          <button className="rounded-full border border-[#0756b0] px-4 py-3 text-sm font-bold text-[#0756b0] transition hover:bg-blue-50 dark:text-white" onClick={rejectAll} type="button">Tümünü Reddet</button>
          <button className="rounded-full border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100" onClick={openPreferences} type="button">Ayarları Yönet</button>
          <button className="rounded-full bg-[#0756b0] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1b1a6b]" onClick={acceptAll} type="button">Tümünü Kabul Et</button>
        </div>
      </div>
    </section>
  );
}
