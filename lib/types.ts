import type { ContentBlock, ProductFaq, ProductFeature } from '@/lib/content-blocks';

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
