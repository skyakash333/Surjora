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
  body: unknown;
  tags: string[];
  relatedArticleIds: string[];
  relatedProductIds: string[];
  author: string;
  readTimeMinutes: number | null;
  publishedAt: Date | null;
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
  h1: string | null;
  description: ContentBlock[] | null;
  features: ProductFeature[] | null;
  faqs: ProductFaq[] | null;
  priceFrom: number | null;
  status: string;
  relatedProductIds: string[];
  relatedArticleIds: string[];
  category: {
    slug: string;
    name: string;
  } | null;
};
