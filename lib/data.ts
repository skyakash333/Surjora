import { prisma } from '@/lib/prisma';
import type {
  ArticleWithCategory,
  KnowledgeCategory,
  ProductWithCategory,
  SiteSettings,
  TestimonialItem,
} from '@/lib/types';

const isDbConfigured = Boolean(process.env.DATABASE_URL);

const productSelect = {
  id: true,
  slug: true,
  type: true,
  title: true,
  seoTitle: true,
  seoDescription: true,
  shortDescription: true,
  h1: true,
  coverImageId: true,
  description: true,
  features: true,
  faqs: true,
  priceFrom: true,
  featured: true,
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

export async function getFeaturedItems(limit = 6): Promise<ProductWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', featured: true },
    select: productSelect,
    orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    take: limit,
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.product.findFirst({
    where: { slug, status: 'PUBLISHED' },
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

/** A product/service category with the fields needed for a category landing page. */
export type ProductCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  kind: string;
};

export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.category.findFirst({
    where: { slug, kind: { in: ['PRODUCT', 'SERVICE'] } },
    select: { id: true, slug: true, name: true, description: true, kind: true },
  });
  return row;
}

export async function getProductsByCategorySlug(slug: string): Promise<ProductWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED', category: { slug } },
    select: productSelect,
    orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

export async function getProductCategorySlugs(): Promise<string[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.category.findMany({
    where: { kind: 'PRODUCT' },
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
  coverImageId: true,
  body: true,
  tags: true,
  faqs: true,
  relatedArticleIds: true,
  relatedProductIds: true,
  author: true,
  readTimeMinutes: true,
  publishedAt: true,
  featured: true,
  status: true,
  views: true,
  updatedAt: true,
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
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}

export async function getAllArticles(): Promise<ArticleWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.article.findMany({
    select: articleSelect,
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}

export async function getArticlesByCategory(categorySlug: string): Promise<ArticleWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.article.findMany({
    where: { status: 'PUBLISHED', category: { slug: categorySlug } },
    select: articleSelect,
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(normalizeArticle).filter((a): a is ArticleWithCategory => a !== null);
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithCategory | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.article.findFirst({
    where: { slug, status: 'PUBLISHED' },
    select: articleSelect,
  });
  return normalizeArticle(row);
}

export async function getArticleForEditing(slug: string) {
  if (!isDbConfigured) return null;
  return prisma.article.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      seoTitle: true,
      seoDescription: true,
      excerpt: true,
      coverImageId: true,
      categoryId: true,
      author: true,
      readTimeMinutes: true,
      publishedAt: true,
      featured: true,
      tags: true,
      faqs: true,
      relatedProductIds: true,
      relatedArticleIds: true,
      status: true,
      body: true,
    },
  });
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

export async function getAllCatalogItems(): Promise<ProductWithCategory[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.product.findMany({
    where: { status: 'PUBLISHED' },
    select: productSelect,
    orderBy: { title: 'asc' },
  });
  return rows.map(normalize).filter((p): p is ProductWithCategory => p !== null);
}

export async function getAllCatalogItemsForAdmin() {
  if (!isDbConfigured) return [];
  return prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      type: true,
      title: true,
      status: true,
      priceFrom: true,
      updatedAt: true,
      category: { select: { slug: true, name: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getCatalogItemForEditing(slug: string) {
  if (!isDbConfigured) return null;
  return prisma.product.findUnique({
    where: { slug },
    select: {
      slug: true,
      type: true,
      title: true,
      seoTitle: true,
      seoDescription: true,
      shortDescription: true,
      h1: true,
      coverImageId: true,
      categoryId: true,
      priceFrom: true,
      featured: true,
      status: true,
      description: true,
      features: true,
      faqs: true,
      relatedProductIds: true,
      relatedArticleIds: true,
    },
  });
}

export async function getProductCategories() {
  if (!isDbConfigured) return [];
  return prisma.category.findMany({
    where: { kind: { in: ['PRODUCT', 'SERVICE'] } },
    select: { id: true, name: true, slug: true },
    orderBy: { name: 'asc' },
  });
}

export async function getOrders() {
  if (!isDbConfigured) return [];
  const orders = await prisma.order.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    take: 100,
  });

  const productIds = orders
    .map((order) => order.productId)
    .filter((id): id is string => Boolean(id));
  const products = productIds.length
    ? await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, title: true, slug: true, type: true },
      })
    : [];
  const productById = new Map(products.map((product) => [product.id, product]));

  return orders.map((order) => ({
    ...order,
    product: order.productId ? (productById.get(order.productId) ?? null) : null,
  }));
}

export async function getVisibleTestimonials(): Promise<TestimonialItem[]> {
  if (!isDbConfigured) return [];
  const rows = await prisma.testimonial.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, quote: true, author: true, role: true, rating: true, isDemo: true },
  });
  return rows;
}

export async function getSettings(): Promise<SiteSettings | null> {
  if (!isDbConfigured) return null;
  const row = await prisma.settings.findUnique({
    where: { id: 'singleton' },
    select: {
      siteName: true,
      contactEmail: true,
      telegramUrl: true,
      whatsappUrl: true,
      paymentPlaceholder: true,
      customersServed: true,
    },
  });
  return row;
}

export async function getAllCategoriesForAdmin() {
  if (!isDbConfigured) return [];
  return prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      kind: true,
      description: true,
      _count: { select: { products: true, articles: true } },
    },
    orderBy: [{ kind: 'asc' }, { name: 'asc' }],
  });
}

export async function getMediaLibrary() {
  if (!isDbConfigured) return [];
  return prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
}

/**
 * Customers are not a first-class model — they are derived from the contact
 * details captured on orders/quote requests. This groups orders by their best
 * available identifier (email → telegram → whatsapp) into a simple directory.
 */
export type DerivedCustomer = {
  key: string;
  email: string | null;
  telegram: string | null;
  whatsapp: string | null;
  requestCount: number;
  lastRequestAt: Date;
  statuses: string[];
};

export async function getCustomers(): Promise<DerivedCustomer[]> {
  if (!isDbConfigured) return [];
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      customerEmail: true,
      customerTelegram: true,
      customerWhatsapp: true,
      status: true,
      createdAt: true,
    },
  });

  const map = new Map<string, DerivedCustomer>();
  for (const order of orders) {
    const key =
      order.customerEmail?.toLowerCase() ??
      order.customerTelegram ??
      order.customerWhatsapp ??
      null;
    if (!key) continue;

    const existing = map.get(key);
    if (existing) {
      existing.requestCount += 1;
      existing.email ??= order.customerEmail;
      existing.telegram ??= order.customerTelegram;
      existing.whatsapp ??= order.customerWhatsapp;
      if (order.createdAt > existing.lastRequestAt) existing.lastRequestAt = order.createdAt;
      if (!existing.statuses.includes(order.status)) existing.statuses.push(order.status);
    } else {
      map.set(key, {
        key,
        email: order.customerEmail,
        telegram: order.customerTelegram,
        whatsapp: order.customerWhatsapp,
        requestCount: 1,
        lastRequestAt: order.createdAt,
        statuses: [order.status],
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.lastRequestAt.getTime() - a.lastRequestAt.getTime(),
  );
}
