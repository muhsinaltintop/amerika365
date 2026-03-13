import { CategoryPill } from "../atoms/CategoryPill";

const topics = ["Siyaset", "Ekonomi", "Teknoloji", "Vize Haberleri", "Yerel Gündem"];

export function DailyDigest() {
  return (
    <section className="flex justify-center border-b border-[#4fc5db]/20 bg-[#4fc5db]/10 py-3 dark:bg-[#0756b0]/5">
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-3 px-4 sm:px-6 md:flex-row md:items-center md:gap-4">
        <h2 className="flex items-center gap-2 text-xs font-bold text-[#1b1a6b] sm:text-sm dark:text-[#4fc5db]">
          <span className="text-lg">🇺🇸</span> Amerika 365 – Bugünün İlk 5 Gündemi:
        </h2>
        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-1 md:w-auto md:pb-0">
          {topics.map((topic) => (
            <CategoryPill key={topic} label={topic} />
          ))}
        </div>
      </div>
    </section>
  );
}
