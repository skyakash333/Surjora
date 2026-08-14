import type { ContentBlock, ProductFaq, ProductFeature } from '@/lib/content-blocks';

export type KnowledgeCategory = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  description: string | null;
};

export type ArticleWithCategory = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  excerpt: string | null;
  coverImageId: string | null;
  body: unknown;
  tags: string[];
  faqs: unknown;
  relatedArticleIds: string[];
  relatedProductIds: string[];
  author: string;
  readTimeMinutes: number | null;
  publishedAt: Date | null;
  featured: boolean;
  status: string;
  views: number;
  updatedAt: Date;
  category: {
    slug: string;
    name: string;
  } | null;
};

export type ProductWithCategory = {
  id: string;
  slug: string;
  type: 'PRODUCT' | 'SERVICE';
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  shortDescription: string | null;
  h1: string | null;
  coverImageId: string | null;
  description: ContentBlock[] | null;
  features: ProductFeature[] | null;
  faqs: ProductFaq[] | null;
  priceFrom: number | null;
  featured: boolean;
  status: string;
  relatedProductIds: string[];
  relatedArticleIds: string[];
  category: {
    slug: string;
    name: string;
  } | null;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  rating: number;
  isDemo: boolean;
};

export type SiteSettings = {
  siteName: string;
  contactEmail: string | null;
  telegramUrl: string | null;
  whatsappUrl: string | null;
  paymentPlaceholder: string | null;
  customersServed: number;
};
