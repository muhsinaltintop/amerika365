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

interface ArticlesFileNewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author?: { name?: string };
  category?: { name?: string };
  cover_image?: { url?: string };
  status?: string;
  published_at?: string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
  };
}

interface ArticlesFileShape {
  version: string;
  generated_at: string;
  news: ArticlesFileNewsItem[];
}

const typedArticleData = articleData as ArticlesFileShape;

function mapStatus(status?: string): ArticleStatus {
  return status?.toUpperCase() === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const articles: ArticleRecord[] = typedArticleData.news.map((item) => ({
  id: item.id,
  slug: item.slug,
  category: item.category?.name ?? "Genel",
  title: item.title,
  excerpt: item.summary,
  author: item.author?.name ?? "Editör Ekibi",
  publishLabel: item.published_at
    ? new Date(item.published_at).toLocaleDateString("tr-TR")
    : "",
  readTime: `${Math.max(1, Math.ceil(stripHtml(item.content).split(" ").length / 200))} dk`,
  heroImage: item.cover_image?.url ?? "",
  status: mapStatus(item.status),
  publishedAt: item.published_at,
  seo: {
    title: item.seo?.meta_title,
    description: item.seo?.meta_description,
  },
  content: [{ type: "paragraph", text: stripHtml(item.content) }],
}));

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
