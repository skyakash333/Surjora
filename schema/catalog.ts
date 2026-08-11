import { z } from 'zod';

export const catalogBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('paragraph'),
    data: z.object({ text: z.string().max(5000) }),
  }),
  z.object({
    type: z.literal('heading'),
    data: z.object({ level: z.enum(['2', '3', '4']), text: z.string().max(300) }),
  }),
  z.object({
    type: z.literal('list'),
    data: z.object({ ordered: z.boolean(), items: z.array(z.string().max(1000)).min(1).max(20) }),
  }),
  z.object({
    type: z.literal('callout'),
    data: z.object({ title: z.string().max(200), text: z.string().max(2000) }),
  }),
]);

export const catalogFeatureSchema = z.object({
  title: z.string().trim().max(120),
  text: z.string().trim().max(1000),
  icon: z.string().trim().max(40).optional(),
});

export const catalogFaqSchema = z.object({
  question: z.string().trim().max(200),
  answer: z.string().trim().max(2000),
});

export const catalogSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated words'),
  type: z.enum(['PRODUCT', 'SERVICE']),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(160),
  seoTitle: z.string().trim().max(160).optional().or(z.literal('')),
  seoDescription: z.string().trim().max(300).optional().or(z.literal('')),
  shortDescription: z.string().trim().max(300).optional().or(z.literal('')),
  h1: z.string().trim().max(160).optional().or(z.literal('')),
  coverImageId: z.string().max(100).optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Choose a category'),
  priceFrom: z.coerce.number().min(0).max(100000).optional().nullable(),
  featured: z.coerce.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  description: z.array(catalogBlockSchema).min(1, 'Add at least one content block'),
  features: z.array(catalogFeatureSchema).max(12),
  faqs: z.array(catalogFaqSchema).max(12),
  relatedProductIds: z.array(z.string()).max(12).optional(),
  relatedArticleIds: z.array(z.string()).max(12).optional(),
});

export type CatalogInput = z.infer<typeof catalogSchema>;
