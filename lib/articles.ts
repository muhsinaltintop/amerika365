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

export interface ArticleData {
  version: string;
  generated_at: string;
  stats?: {
    total_news: number;
    generated_at: string;
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

// DB'ye geçiş için: aynı imzaları koruyup bu fonksiyonların içini Prisma/API sorgularıyla değiştirmek yeterlidir.
