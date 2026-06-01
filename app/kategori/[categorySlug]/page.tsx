import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { NewsMeta } from "@/components/molecules/NewsMeta";
import {
  getCategoryBySlug,
  getCategoryStaticParams,
  getPublishedArticlesByCategorySlug,
} from "@/lib/articles";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  return getCategoryStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.label} Haberleri`,
    description: `${category.label} kategorisindeki güncel Amerika haberleri ve analizleri.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const [category, articles] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPublishedArticlesByCategorySlug(categorySlug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-[#f7fbfd] text-slate-900 dark:bg-[#101822] dark:text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#0756b0]">
            Ana Sayfa
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-900 dark:text-slate-200">{category.label}</span>
        </nav>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-slate-900">
          <p className="mb-2 text-sm font-bold tracking-wide text-[#0756b0] uppercase">Kategori</p>
          <h1 className="text-3xl font-extrabold text-[#1b1a6b] sm:text-5xl dark:text-white">{category.label} Haberleri</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            {category.name} kategorisine ait yayınlanmış haberleri, en yeni içerikler üstte olacak şekilde listeliyoruz.
          </p>
        </section>

        {articles.length > 0 ? (
          <section className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${article.slug}`}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900"
              >
                <img alt={article.heroImageAlt} className="h-44 w-full object-cover sm:h-48" src={article.heroImage} />
                <div className="space-y-3 p-5 sm:p-6">
                  <NewsMeta category={article.category} time={article.publishLabel} />
                  <h2 className="text-base font-bold leading-snug text-[#1b1a6b] transition-colors hover:text-[#0756b0] sm:text-lg dark:text-white">
                    {article.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-[#1b1a6b] dark:text-white">Bu kategoride henüz haber yok</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">
              {category.name} kategorisine ait yayınlanmış haber eklendiğinde bu sayfada otomatik olarak listelenecek.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-[#0756b0] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0756b0]/90"
            >
              Ana Sayfaya Dön
            </Link>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
