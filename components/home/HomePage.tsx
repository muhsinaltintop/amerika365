import { getPublishedArticles } from "@/lib/articles";
import { RefinedDailyDigest } from "../organisms/RefinedDailyDigest";
import { RefinedHeroSlider } from "../organisms/RefinedHeroSlider";
import { RefinedImmigrationSection } from "../organisms/RefinedImmigrationSection";
import { RefinedSiteFooter } from "../organisms/RefinedSiteFooter";
import { RefinedSiteHeader } from "../organisms/RefinedSiteHeader";
import { RefinedTopNewsSection } from "../organisms/RefinedTopNewsSection";
import { RefinedTurkishLifeSection } from "../organisms/RefinedTurkishLifeSection";

export async function HomePage() {
  const articles = await getPublishedArticles();
  const sliderArticles = articles.slice(0, 3);
  const topNewsArticles = articles.slice(3, 7);

  return (
    <div className="min-h-screen text-slate-900">
      <RefinedSiteHeader />
      <RefinedDailyDigest />

      <main className="space-y-14 pb-12 sm:space-y-16 sm:pb-16">
        <RefinedHeroSlider slides={sliderArticles} />
        <div className="mx-auto max-w-[1240px] space-y-14 px-4 sm:space-y-16 sm:px-6">
          <RefinedTopNewsSection cards={topNewsArticles} />
          <RefinedImmigrationSection />
          <RefinedTurkishLifeSection />
        </div>
      </main>

      <RefinedSiteFooter />
    </div>
  );
}
