import { getPublishedArticles } from "@/lib/articles";
// import { DailyDigest } from "../organisms/DailyDigest";
import { HeroSlider } from "../organisms/HeroSlider";
import { ImmigrationSection } from "../organisms/ImmigrationSection";
import { SiteFooter } from "../organisms/SiteFooter";
import { SiteHeader } from "../organisms/SiteHeader";
import { CategoryNewsSections } from "../organisms/CategoryNewsSections";
import { TopNewsSection } from "../organisms/TopNewsSection";
// import { TurkishLifeSection } from "../organisms/TurkishLifeSection";

export async function HomePage() {
  const articles = await getPublishedArticles();
  const sliderArticles = articles.slice(0, 3);
  const topNewsArticles = articles.slice(3, 9);

  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />
      {/* Amerika 365 – Bugünün İlk 5 Gündemi bölümü isteğe bağlı olarak kapatıldı. */}
      {/* <DailyDigest /> */}

      <main className="mx-auto max-w-[1200px] space-y-10 px-4 py-6 sm:space-y-12 sm:px-6 sm:py-8">
        <HeroSlider slides={sliderArticles} />
        <TopNewsSection cards={topNewsArticles} />
        <CategoryNewsSections articles={articles} excludedSlugs={[...sliderArticles, ...topNewsArticles].map((article) => article.slug)} />
        <ImmigrationSection />
        {/* ABD’de Türk Yaşamı bölümü içerikleri hazırlanacağı için geçici olarak kapalı. */}
        {/* <TurkishLifeSection /> */}
      </main>

      <SiteFooter />
    </div>
  );
}
