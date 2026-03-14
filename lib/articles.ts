import articleData from "@/data/articles.json";

export type ArticleStatus = "DRAFT" | "PUBLISHED";

export interface ArticleContentBlock {
  type: "paragraph" | "heading" | "quote";
  text: string;
}

export interface ArticleSeo {
  title?: string;
  description?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  category: string;
  subcategory?: string;
  title: string;
  excerpt: string;
  author: string;
  publishLabel: string;
  readTime: string;
  heroImage: string;
  status: ArticleStatus;
  publishedAt?: string;
  seo?: ArticleSeo;
  content: ArticleContentBlock[];
}

const articles = articleData as ArticleRecord[];

export async function getPublishedArticles() {
  return articles
    .filter((article) => article.status === "PUBLISHED")
    .sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });
}

export async function getPublishedArticleBySlug(slug: string) {
  const publishedArticles = await getPublishedArticles();
  return publishedArticles.find((article) => article.slug === slug) ?? null;
}

// DB'ye geçiş için: aynı imzaları koruyup bu fonksiyonların içini Prisma/API sorgularıyla değiştirmek yeterlidir.
