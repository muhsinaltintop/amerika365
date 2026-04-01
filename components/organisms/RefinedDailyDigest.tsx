import { CategoryPill } from "../atoms/CategoryPill";

const topics = ["Washington", "Vize Hatti", "Ekonomi", "Teknoloji", "Toplum Rotasi"];

export function RefinedDailyDigest() {
  return (
    <section className="flex justify-center border-b border-[color:var(--line)] bg-[color:var(--navy)] py-3 text-white">
      <div className="flex w-full max-w-[1240px] flex-col items-start gap-3 px-4 sm:px-6 md:flex-row md:items-center md:gap-4">
        <h2 className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/90 sm:text-xs">
          <span className="text-sm text-[color:var(--accent-soft)]">Live Desk</span>
          Bugunun ilk bakisi
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
