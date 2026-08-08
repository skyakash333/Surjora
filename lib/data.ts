import { prisma } from '@/lib/prisma';
import type { ProductWithCategory } from '@/lib/types';

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
    where: { status: 'PUBLISHED' },
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
