import Link from "next/link";
import type { ArticleRecord } from "@/lib/articles";
import { SectionTitle } from "../atoms/SectionTitle";
import { NewsMeta } from "../molecules/NewsMeta";

interface TopNewsSectionProps {
  cards: ArticleRecord[];
}

export function TopNewsSection({ cards }: TopNewsSectionProps) {
  return (
    <section>
      <div className="mb-6 flex flex-col items-start gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle title="Top Amerika Haberleri" />
        <Link className="flex items-center gap-1 text-sm font-bold text-[#0756b0] hover:underline" href="/haberler">
          Tümünü Gör <span>›</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.slug} href={`/${card.slug}`} className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900">
            <img alt={card.title} className="h-44 w-full object-cover sm:h-48" src={card.heroImage} />
            <div className="space-y-3 p-5 sm:p-6">
              <NewsMeta category={card.category} time={card.publishLabel} />
              <h4 className="text-base font-bold leading-snug text-[#1b1a6b] transition-colors hover:text-[#0756b0] sm:text-lg dark:text-white">
                {card.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
