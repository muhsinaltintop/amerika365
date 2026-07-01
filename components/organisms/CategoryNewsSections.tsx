import Link from "next/link";
import type { ArticleRecord } from "@/lib/articles";
import { SectionTitle } from "../atoms/SectionTitle";
import { NewsMeta } from "../molecules/NewsMeta";

interface CategoryNewsSectionsProps {
  articles: ArticleRecord[];
  excludedSlugs?: string[];
}

interface CategoryGroup {
  category: string;
  categorySlug: string;
  articles: ArticleRecord[];
}

const CATEGORY_SECTION_LIMIT = 4;
const ARTICLES_PER_CATEGORY = 4;

function groupArticlesByCategory(articles: ArticleRecord[], excludedSlugs: string[] = []) {
  const excludedSlugSet = new Set(excludedSlugs);
  const categoryMap = new Map<string, CategoryGroup>();

  articles.forEach((article) => {
    if (excludedSlugSet.has(article.slug)) {
      return;
    }

    const currentGroup = categoryMap.get(article.categorySlug);

    if (currentGroup) {
      if (currentGroup.articles.length < ARTICLES_PER_CATEGORY) {
        currentGroup.articles.push(article);
      }

      return;
    }

    categoryMap.set(article.categorySlug, {
      category: article.category,
      categorySlug: article.categorySlug,
      articles: [article],
    });
  });

  return [...categoryMap.values()].slice(0, CATEGORY_SECTION_LIMIT);
}

export function CategoryNewsSections({ articles, excludedSlugs = [] }: CategoryNewsSectionsProps) {
  const categoryGroups = groupArticlesByCategory(articles, excludedSlugs);

  if (!categoryGroups.length) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-100 bg-white/80 p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-[#0756b0]">Kategorilere göre</p>
          <SectionTitle title="Amerika Gündeminden Başlıklar" />
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          En çok okunan haberlerin ardından ekonomi, politika ve günlük yaşam başlıklarını daha hızlı tarayın.
        </p>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-100 bg-[#f7fbfd] md:grid-cols-2 dark:border-slate-800 dark:bg-slate-950/40">
        {categoryGroups.map((group, index) => {
          const [featuredArticle, ...secondaryArticles] = group.articles;
          const isLastRowOnDesktop = index >= categoryGroups.length - (categoryGroups.length % 2 || 2);

          return (
            <div
              key={group.categorySlug}
              className={`border-b border-slate-100 p-5 last:border-b-0 md:border-r md:even:border-r-0 sm:p-6 dark:border-slate-800 ${isLastRowOnDesktop ? "md:border-b-0" : ""}`}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <Link
                  href={`/kategori/${group.categorySlug}`}
                  className="rounded-full bg-[#0756b0]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#0756b0] transition-colors hover:bg-[#0756b0] hover:text-white"
                >
                  {group.category}
                </Link>
                <Link className="text-sm font-bold text-slate-500 transition-colors hover:text-[#0756b0] dark:text-slate-400" href={`/kategori/${group.categorySlug}`}>
                  Tümü ›
                </Link>
              </div>

              {featuredArticle ? (
                <Link href={`/${featuredArticle.slug}`} className="group block border-l-4 border-[#f4b000] pl-4">
                  <NewsMeta category={featuredArticle.category} time={featuredArticle.publishLabel} />
                  <h4 className="mt-2 text-lg font-extrabold leading-snug text-[#1b1a6b] transition-colors group-hover:text-[#0756b0] dark:text-white">
                    {featuredArticle.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{featuredArticle.excerpt}</p>
                </Link>
              ) : null}

              {secondaryArticles.length ? (
                <div className="mt-5 divide-y divide-slate-200/70 dark:divide-slate-800">
                  {secondaryArticles.map((article) => (
                    <Link key={article.slug} href={`/${article.slug}`} className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0756b0] transition-transform group-hover:scale-125" />
                      <span className="text-sm font-bold leading-6 text-slate-700 transition-colors group-hover:text-[#0756b0] dark:text-slate-200">{article.title}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
