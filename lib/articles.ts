import articleData from "@/data/articles.json";

export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleAuthor {
  id: string;
  name: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
}

export interface ArticleSeo {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  title?: string;
  description?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
  content: string;
  author: string;
  authorRecord: ArticleAuthor;
  category: string;
  categoryRecord: ArticleCategory;
  categorySlug: string;
  tags: string[];
  cover_image: ArticleImage;
  heroImage: string;
  heroImageAlt: string;
  status: ArticleStatus;
  is_featured: boolean;
  language: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  publishedAt: string;
  publishLabel: string;
  readTime: string;
  seo?: ArticleSeo;
}

export interface CategoryNavItem {
  id: string;
  name: string;
  label: string;
  slug: string;
  aliases?: string[];
}

export interface ResolvedCategory {
  id: string;
  name: string;
  label: string;
  slug: string;
}

export interface ArticleData {
  version: string;
  generated_at: string;
  stats?: {
    total_news: number;
    generated_at?: string;
  };
  news: RawArticleRecord[];
}

interface RawArticleRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: ArticleAuthor;
  category: ArticleCategory;
  tags: string[];
  cover_image: ArticleImage;
  status: ArticleStatus;
  is_featured: boolean;
  language: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  seo?: ArticleSeo;
}

export const categoryNavItems: CategoryNavItem[] = [
  { id: "cat_gundem", name: "Gündem", label: "Gündem", slug: "gundem" },
  { id: "cat_politics", name: "Politika", label: "Politika", slug: "politika" },
  { id: "cat_goc", name: "Göç", label: "Göçmenlik", slug: "gocmenlik", aliases: ["goc"] },
  { id: "cat_economy", name: "Ekonomi", label: "Ekonomi", slug: "ekonomi" },
  { id: "cat_art", name: "Sanat", label: "Sanat", slug: "sanat" },
  { id: "cat_opinion", name: "Yorum", label: "Yorum", slug: "yorum" },
  { id: "cat_sports", name: "Spor", label: "Spor", slug: "spor" },
];

const data = articleData as ArticleData;
const articles = data.news.map(toArticleRecord);

function toArticleRecord(article: RawArticleRecord): ArticleRecord {
  return {
    ...article,
    excerpt: article.summary,
    author: article.author.name,
    authorRecord: article.author,
    category: article.category.name,
    categoryRecord: article.category,
    categorySlug: slugifyCategory(article.category.name),
    heroImage: article.cover_image.url,
    heroImageAlt: article.cover_image.alt,
    publishedAt: article.published_at,
    publishLabel: formatPublishLabel(article.published_at),
    readTime: calculateReadTime(article.content),
    seo: normalizeSeo(article.seo),
  };
}

function normalizeSeo(seo: ArticleSeo | undefined): ArticleSeo | undefined {
  if (!seo) {
    return undefined;
  }

  return {
    ...seo,
    title: seo.title ?? seo.meta_title,
    description: seo.description ?? seo.meta_description,
  };
}

function calculateReadTime(content: string) {
  const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return `${minutes} dk okuma`;
}

function formatPublishLabel(publishedAt: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(publishedAt));
}

export function slugifyCategory(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCategoryId(value: string) {
  return value.replace(/^cat_/, "");
}

function isCategoryNavItem(category: CategoryNavItem | ArticleCategory): category is CategoryNavItem {
  return "label" in category && "slug" in category;
}

function getCategorySlugCandidates(category: ArticleCategory) {
  return new Set([
    category.id,
    normalizeCategoryId(category.id),
    slugifyCategory(category.name),
    ...categoryNavItems
      .filter((item) => item.id === category.id || item.name === category.name)
      .flatMap((item) => [item.slug, ...(item.aliases ?? [])]),
  ]);
}

export async function getAllArticles() {
  return articles;
}

export async function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getFeaturedArticles() {
  return articles.filter((article) => article.is_featured && article.status === "published");
}

export async function getPublishedArticles() {
  return articles
    .filter((article) => article.status === "published")
    .sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime();
      const bTime = new Date(b.publishedAt).getTime();
      return bTime - aTime;
    });
}

export async function getPublishedArticleBySlug(slug: string) {
  const article = await getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    return null;
  }

  return article;
}

export async function getCategoryBySlug(slug: string): Promise<ResolvedCategory | null> {
  const publishedArticles = await getPublishedArticles();
  const publishedCategories = publishedArticles.map((article) => article.categoryRecord);
  const category = [...categoryNavItems, ...publishedCategories].find((item) => {
    const candidateSlugs = isCategoryNavItem(item)
      ? new Set([item.id, normalizeCategoryId(item.id), item.slug, ...(item.aliases ?? []), slugifyCategory(item.name)])
      : getCategorySlugCandidates(item);

    return candidateSlugs.has(slug);
  });

  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    label: isCategoryNavItem(category) ? category.label : category.name,
    slug: isCategoryNavItem(category) ? category.slug : slugifyCategory(category.name),
  };
}

export async function getPublishedArticlesByCategorySlug(slug: string) {
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  const categoryKeys = new Set([category.id, normalizeCategoryId(category.id), category.name, slugifyCategory(category.name), category.slug]);
  return (await getPublishedArticles()).filter((article) => {
    const articleKeys = getCategorySlugCandidates(article.categoryRecord);
    articleKeys.add(article.categoryRecord.name);

    return [...categoryKeys].some((key) => articleKeys.has(key));
  });
}

export async function getCategoryStaticParams() {
  const publishedArticles = await getPublishedArticles();
  const articleCategorySlugs = publishedArticles.map((article) => ({ categorySlug: article.categorySlug }));
  const navCategorySlugs = categoryNavItems.flatMap((item) => [
    { categorySlug: item.slug },
    ...(item.aliases ?? []).map((alias) => ({ categorySlug: alias })),
  ]);

  return [...navCategorySlugs, ...articleCategorySlugs].filter(
    (item, index, self) => self.findIndex((candidate) => candidate.categorySlug === item.categorySlug) === index,
  );
}

// DB'ye geçiş için: aynı imzaları koruyup bu fonksiyonların içini Prisma/API sorgularıyla değiştirmek yeterlidir.
