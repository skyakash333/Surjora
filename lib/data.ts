import { prisma } from '@/lib/prisma';
import type { ArticleWithCategory, KnowledgeCategory, ProductWithCategory } from '@/lib/types';

const isDbConfigured = Boolean(process.env.DATABASE_URL);

const productSelect = {
  id: true,
  slug: true,
  type: true,
  title: true,
  seoTitle: true,
  seoDescription: true,
  h1: true,
  description: true,
  features: true,
  faqs: true,
  priceFrom: true,
  status: true,
  relatedProductIds: true,
  relatedArticleIds: true,
  category: {
    select: { slug: true, name: true },
  },
} as const;

function normalize(json: unknown): ProductWithCategory | null {
  if (!json) return null;
  return json as unknown as ProductWithCategory;
}

export async function getPublishedProducts(): Promise<ProductWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', type: 'PRODUCT' },
    select: productSelect,
    orderBy: { createdAt: 'asc' },
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

export async function getPublishedServices(): Promise<ProductWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', type: 'SERVICE' },
    select: productSelect,
    orderBy: { createdAt: 'asc' },
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.product.findUnique({
    where: { slug },
    select: productSelect,
  });
  return normalize(row);
}

export async function getPublishedProductSlugs(): Promise<string[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', type: 'PRODUCT' },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getPublishedServiceSlugs(): Promise<string[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', type: 'SERVICE' },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getRelatedProducts(
  ids: string[],
  excludeSlug: string,
): Promise<ProductWithCategory[]> {
  if (!isDbConfigured || ids.length === 0) return [];
  const rows = await prisma.product.findMany({
    where: {
      id: { in: ids },
      status: 'PUBLISHED',
      slug: { not: excludeSlug },
    },
    select: productSelect,
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

const articleSelect = {
  id: true,
  slug: true,
  title: true,
  seoTitle: true,
  seoDescription: true,
  excerpt: true,
  body: true,
  tags: true,
  relatedArticleIds: true,
  relatedProductIds: true,
  author: true,
  readTimeMinutes: true,
  publishedAt: true,
  status: true,
  views: true,
  category: {
    select: { slug: true, name: true },
  },
} as const;

function normalizeArticle(json: unknown): ArticleWithCategory | null {
  if (!json) return null;
  return json as unknown as ArticleWithCategory;
}

export async function getKnowledgeCategories(): Promise<KnowledgeCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.category.findMany({
    where: { kind: 'CONTENT' },
    select: { id: true, slug: true, name: true, kind: true, description: true },
    orderBy: { name: 'asc' },
  });
  return rows as KnowledgeCategory[];
}

export async function getPublishedArticles(): Promise<ArticleWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: articleSelect,
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}

export async function getArticlesByCategory(
  categorySlug: string,
): Promise<ArticleWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.article.findMany({
    where: { status: 'PUBLISHED', category: { slug: categorySlug } },
    select: articleSelect,
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleWithCategory | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.article.findUnique({
    where: { slug },
    select: articleSelect,
  });
  return normalizeArticle(row);
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getRelatedArticles(
  ids: string[],
  excludeSlug: string,
): Promise<ArticleWithCategory[]> {
  if (!isDbConfigured || ids.length === 0) return [];
  const rows = await prisma.article.findMany({
    where: {
      id: { in: ids },
      status: 'PUBLISHED',
      slug: { not: excludeSlug },
    },
    select: articleSelect,
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}
