import Image from "next/image";
import Link from "next/link";
import type { ArticleRecord } from "@/lib/articles";
import { SectionTitle } from "../atoms/SectionTitle";

interface RefinedTopNewsSectionProps {
  cards: ArticleRecord[];
}

export function RefinedTopNewsSection({ cards }: RefinedTopNewsSectionProps) {
  if (cards.length === 0) {
    return null;
  }

  const [featured, ...rest] = cards;

  return (
    <section id="top-stories" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-12">
      <div>
        <div className="mb-6 flex flex-col items-start gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <SectionTitle title="Gunluk Secki" />
          <a className="flex items-center gap-1 text-sm font-bold text-[color:var(--accent)] hover:underline" href="#">
            Tumunu Gor <span>›</span>
          </a>
        </div>
        <Link
          key={featured.slug}
          href={`/${featured.slug}`}
          className="grid gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[rgba(255,250,243,0.78)] p-4 transition-transform hover:-translate-y-1 sm:p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-center"
        >
          <div className="relative h-[280px] overflow-hidden rounded-[1.5rem] sm:h-[340px]">
            <Image alt={featured.title} className="object-cover" fill sizes="(min-width: 1024px) 40vw, 100vw" src={featured.heroImage} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span>{featured.category}</span>
              <span>&bull;</span>
              <span>{featured.publishLabel}</span>
            </div>
            <h4 className="text-2xl font-extrabold leading-tight text-[color:var(--navy)] sm:text-[2rem]">{featured.title}</h4>
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{featured.author}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-[color:var(--line)] bg-white/70 p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-extrabold tracking-[0.22em] text-[color:var(--navy-soft)] uppercase">Hizli Mansetler</p>
          <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-[color:var(--navy)] uppercase">
            {cards.length} Haber
          </span>
        </div>
        <div className="space-y-4">
          {rest.map((card, index) => (
            <Link
              key={card.slug}
              href={`/${card.slug}`}
              className="block border-t border-[color:var(--line)] pt-4 first:border-t-0 first:pt-0"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-[color:var(--accent)] uppercase">0{index + 1}</p>
              <h4 className="mt-2 text-lg font-bold leading-snug text-[color:var(--navy)] transition-colors hover:text-[color:var(--accent)]">
                {card.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.excerpt}</p>
              <p className="mt-3 text-xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                {card.category} · {card.publishLabel}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
