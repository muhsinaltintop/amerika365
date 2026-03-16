"use client";

import { useMemo, useState } from "react";

type ContentBlock = {
  type: "paragraph" | "heading" | "quote";
  text: string;
};

interface DraftArticle {
  title: string;
  excerpt: string;
  category: string;
  sourceLanguage: string;
  slug: string;
  content: ContentBlock[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const initialDraft: DraftArticle = {
  title: "",
  excerpt: "",
  category: "ABD",
  sourceLanguage: "en",
  slug: "",
  content: [{ type: "paragraph", text: "" }],
  seo: {
    title: "",
    description: "",
    keywords: "",
  },
};

export function NewsComposerPanel() {
  const [sourceText, setSourceText] = useState("");
  const [draft, setDraft] = useState<DraftArticle>(initialDraft);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState<string>("");

  async function generateDraft() {
    setIsLoading(true);
    setStatusText("AI içerik hazırlanıyor...");

    try {
      const response = await fetch("/api/admin/news/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceText,
          sourceLanguage: "en",
          category: draft.category,
        }),
      });

      const data = (await response.json()) as { draft?: DraftArticle; error?: string };

      if (!response.ok || !data.draft) {
        throw new Error(data.error ?? "Taslak üretilemedi.");
      }

      setDraft(data.draft);
      setStatusText("Taslak üretildi. Başlık, spot ve SEO alanlarını düzenleyebilirsiniz.");
    } catch (error) {
      setStatusText(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  const seoChecks = useMemo(() => {
    return {
      titleOk: draft.seo.title.length >= 30 && draft.seo.title.length <= 60,
      descriptionOk: draft.seo.description.length >= 110 && draft.seo.description.length <= 160,
      keywordOk: draft.seo.keywords.split(",").filter((word) => word.trim().length > 0).length >= 2,
    };
  }, [draft.seo]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-3 text-2xl font-bold text-[#1b1a6b]">AI Haber Paneli</h1>
        <p className="mb-4 text-sm text-slate-600">
          İngilizce kaynağı aşağıya yapıştırın. Sistem Türkçe taslak, başlık, spot ve SEO alanlarını otomatik doldurur.
        </p>
        <textarea
          value={sourceText}
          onChange={(event) => setSourceText(event.target.value)}
          placeholder="Kaynak haberi buraya yapıştırın..."
          className="h-48 w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:border-[#0756b0]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generateDraft}
            disabled={isLoading || sourceText.trim().length < 40}
            className="rounded-xl bg-[#0756b0] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Üretiliyor..." : "AI ile Üret"}
          </button>
          <button
            type="button"
            onClick={generateDraft}
            disabled={isLoading || sourceText.trim().length < 40}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Yeniden Yazdır
          </button>
          <button type="button" className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">
            Yayınla
          </button>
        </div>
        {statusText ? <p className="mt-3 text-sm text-slate-600">{statusText}</p> : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold">Haber Alanları</h2>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Başlık
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Spot
              <textarea
                value={draft.excerpt}
                onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
                className="mt-1 h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Slug
              <input
                value={draft.slug}
                onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold">SEO/GEO Kontrolü</h2>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              SEO Başlığı
              <input
                value={draft.seo.title}
                onChange={(event) => setDraft({ ...draft, seo: { ...draft.seo, title: event.target.value } })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Meta Description
              <textarea
                value={draft.seo.description}
                onChange={(event) => setDraft({ ...draft, seo: { ...draft.seo, description: event.target.value } })}
                className="mt-1 h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Anahtar Kelimeler
              <input
                value={draft.seo.keywords}
                onChange={(event) => setDraft({ ...draft, seo: { ...draft.seo, keywords: event.target.value } })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <li className={seoChecks.titleOk ? "text-emerald-600" : "text-amber-600"}>• SEO başlık uzunluğu uygun (30-60)</li>
            <li className={seoChecks.descriptionOk ? "text-emerald-600" : "text-amber-600"}>• Description uzunluğu uygun (110-160)</li>
            <li className={seoChecks.keywordOk ? "text-emerald-600" : "text-amber-600"}>• En az 2 anahtar kelime var</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
