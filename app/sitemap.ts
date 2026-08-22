import type { MetadataRoute } from 'next';
import {
  getPublishedArticles,
  getPublishedProductSlugs,
  getPublishedServiceSlugs,
} from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wechatscan.online';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, serviceSlugs, articles] = await Promise.all([
    getPublishedProductSlugs(),
    getPublishedServiceSlugs(),
    getPublishedArticles(),
  ]);
  const categorySlugs = [...new Set(articles.map((article) => article.category?.slug).filter((slug): slug is string => Boolean(slug)))];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/knowledge`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/support`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/refund-delivery-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/knowledge/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/knowledge/${article.category!.slug}/${article.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...categoryRoutes, ...articleRoutes];
}
