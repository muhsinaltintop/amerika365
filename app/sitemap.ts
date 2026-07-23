import type { MetadataRoute } from "next";
import {
  getCategoryStaticParams,
  getPublishedArticles,
} from "@/lib/articles";

const SITE_URL = "https://amerika365.com";

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function toValidDate(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    getPublishedArticles(),
    getCategoryStaticParams(),
  ]);

  const latestArticleDate = articles.reduce<Date | undefined>((latestDate, article) => {
    const articleDate = toValidDate(article.updated_at) ?? toValidDate(article.publishedAt);

    if (!articleDate || (latestDate && articleDate <= latestDate)) {
      return latestDate;
    }

    return articleDate;
  }, undefined);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestArticleDate,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: absoluteUrl("/haberler"),
      lastModified: latestArticleDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/gizlilik-politikasi"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/cerez-politikasi"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(({ categorySlug }) => ({
    url: absoluteUrl(`/kategori/${categorySlug}`),
    lastModified: latestArticleDate,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/${article.slug}`),
    lastModified: toValidDate(article.updated_at) ?? toValidDate(article.publishedAt),
    changeFrequency: "weekly",
    priority: article.is_featured ? 0.85 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
