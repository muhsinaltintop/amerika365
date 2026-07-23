"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "./CookieConsentProvider";

function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <input id={id} className="h-5 w-5 accent-[#0756b0]" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />;
}

export function CookiePreferencesModal() {
  const { isPreferencesOpen, preferences, acceptAll, rejectAll, savePreferences, closePreferences, hasDecision } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [personalization, setPersonalization] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPreferencesOpen) return;
    window.setTimeout(() => {
      setAnalytics(preferences?.analytics ?? false);
      setAdvertising(preferences?.advertising ?? false);
      setPersonalization(preferences?.personalization ?? false);
      dialogRef.current?.focus();
    }, 0);
  }, [isPreferencesOpen, preferences]);

  useEffect(() => {
    if (!isPreferencesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && hasDecision) closePreferences();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePreferences, hasDecision, isPreferencesOpen]);

  if (!isPreferencesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-4 sm:items-center" role="presentation">
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl outline-none sm:p-7 dark:bg-slate-900">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-preferences-title" className="text-xl font-extrabold text-[#1b1a6b] dark:text-white">Çerez Tercihleri</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Zorunlu olmayan çerez kategorilerini istediğiniz zaman değiştirebilirsiniz.</p>
          </div>
          {hasDecision ? <button className="rounded-full px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" onClick={closePreferences} type="button">Kapat</button> : null}
        </div>

        <div className="space-y-3">
          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex justify-between gap-3"><div><h3 className="font-bold">Zorunlu Çerezler</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bu çerezler sitenin güvenli ve düzgün çalışması, temel tercihlerin kaydedilmesi ve oturum işlevleri için gereklidir.</p></div><span className="text-sm font-bold text-[#0756b0]">Her zaman etkin</span></div></section>
          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex justify-between gap-3"><label htmlFor="analytics-cookies"><h3 className="font-bold">Analiz Çerezleri</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bu çerezler hangi sayfaların ziyaret edildiğini, trafik kaynaklarını ve site kullanımını anlamamıza yardımcı olur.</p></label><Toggle id="analytics-cookies" checked={analytics} onChange={setAnalytics} /></div></section>
          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex justify-between gap-3"><label htmlFor="advertising-cookies"><h3 className="font-bold">Reklam Çerezleri</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bu çerezler reklam performansını ölçmek ve izin verdiğinizde daha ilgili reklamlar göstermek için kullanılabilir.</p></label><Toggle id="advertising-cookies" checked={advertising} onChange={setAdvertising} /></div></section>
          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex justify-between gap-3"><label htmlFor="personalization-cookies"><h3 className="font-bold">Kişiselleştirme Çerezleri</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bu çerezler içerik ve site tercihlerinizi hatırlamamıza yardımcı olur.</p></label><Toggle id="personalization-cookies" checked={personalization} onChange={setPersonalization} /></div></section>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button className="rounded-full border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100" type="button" onClick={() => savePreferences({ analytics, advertising, personalization })}>Seçimlerimi Kaydet</button>
          <button className="rounded-full border border-[#0756b0] px-4 py-3 text-sm font-bold text-[#0756b0] hover:bg-blue-50 dark:text-white" type="button" onClick={rejectAll}>Tümünü Reddet</button>
          <button className="rounded-full bg-[#0756b0] px-4 py-3 text-sm font-bold text-white hover:bg-[#1b1a6b]" type="button" onClick={acceptAll}>Tümünü Kabul Et</button>
        </div>
      </div>
    </div>
  );
}
