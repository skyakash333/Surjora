import { z } from 'zod';

export const contentBlockSchema = z.discriminatedUnion('type', [
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

export const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated words'),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(160),
  seoTitle: z.string().trim().max(160).optional().or(z.literal('')),
  seoDescription: z.string().trim().max(300).optional().or(z.literal('')),
  excerpt: z.string().trim().max(500).optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Choose a category'),
  coverImageId: z.string().max(100).optional().or(z.literal('')),
  author: z.string().trim().max(100).optional().or(z.literal('')),
  readTimeMinutes: z.coerce.number().int().min(0).max(240).optional(),
  publishedAt: z.string().datetime().optional().or(z.literal('')),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
  faqs: z
    .array(z.object({ question: z.string().trim().min(1).max(200), answer: z.string().trim().min(1).max(2000) }))
    .max(20)
    .optional(),
  relatedProductIds: z.array(z.string()).max(10).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  body: z.array(contentBlockSchema).min(1, 'Add at least one content block'),
});

export type ArticleInput = z.infer<typeof articleSchema>;
