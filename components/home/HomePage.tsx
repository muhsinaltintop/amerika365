import { DailyDigest } from "../organisms/DailyDigest";
import { HeroSlider } from "../organisms/HeroSlider";
import { ImmigrationSection } from "../organisms/ImmigrationSection";
import { SiteFooter } from "../organisms/SiteFooter";
import { SiteHeader } from "../organisms/SiteHeader";
import { TopNewsSection } from "../organisms/TopNewsSection";
import { TurkishLifeSection } from "../organisms/TurkishLifeSection";

export function HomePage() {
  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />
      <DailyDigest />

      <main className="mx-auto max-w-[1200px] space-y-12 px-6 py-8">
        <HeroSlider />
        <TopNewsSection />
        <ImmigrationSection />
        <TurkishLifeSection />
      </main>

      <SiteFooter />
    </div>
  );
}
