import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsMeta } from "@/components/molecules/NewsMeta";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { getPublishedArticles } from "@/lib/articles";

const ARTICLES_PER_PAGE = 10;

interface PageProps {
  searchParams?: Promise<{ sayfa?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "Top Amerika Haberleri",
  description: "Amerika gündemindeki en yeni haberleri sayfa sayfa takip edin.",
};

function getPageNumber(pageParam: string | string[] | undefined) {
  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;

  if (!rawPage) {
    return 1;
  }

  const page = Number(rawPage);
  return Number.isInteger(page) && page > 0 ? page : null;
}

export default async function AllNewsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getPageNumber(resolvedSearchParams?.sayfa);

  if (!currentPage) {
    notFound();
  }

  const articles = await getPublishedArticles();
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));

  if (currentPage > totalPages) {
    notFound();
  }

  const pageStart = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(pageStart, pageStart + ARTICLES_PER_PAGE);

  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#0756b0]">
            Ana Sayfa
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">Top Amerika Haberleri</span>
        </nav>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-slate-900">
          <p className="mb-2 text-sm font-bold tracking-wide text-[#0756b0] uppercase">Haber Arşivi</p>
          <h1 className="text-3xl font-extrabold text-[#1b1a6b] sm:text-5xl dark:text-white">Top Amerika Haberleri</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            En yeni Amerika haberlerini 10&apos;lu sayfalar halinde listeliyoruz. {currentPage}. sayfada {pageStart + 1}-
            {Math.min(pageStart + ARTICLES_PER_PAGE, articles.length)} arası haberler gösteriliyor.
          </p>
        </section>

        <section className="space-y-5">
          {paginatedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              className="grid gap-5 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:grid-cols-[220px_1fr] sm:p-5 dark:bg-slate-900"
            >
              <img alt={article.heroImageAlt} className="h-44 w-full rounded-lg object-cover sm:h-36" src={article.heroImage} />
              <div className="flex flex-col justify-center space-y-3">
                <NewsMeta category={article.category} time={article.publishLabel} />
                <h2 className="text-xl font-bold leading-snug text-[#1b1a6b] transition-colors hover:text-[#0756b0] dark:text-white">
                  {article.title}
                </h2>
                <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </section>

        {totalPages > 1 ? (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Sayfalama">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const href = page === 1 ? "/haberler" : `/haberler?sayfa=${page}`;
              const isActive = page === currentPage;

              return (
                <Link
                  key={page}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-bold transition ${
                    isActive
                      ? "border-[#0756b0] bg-[#0756b0] text-white"
                      : "border-slate-200 bg-white text-[#1b1a6b] hover:border-[#0756b0] hover:text-[#0756b0] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  }`}
                >
                  {page}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
