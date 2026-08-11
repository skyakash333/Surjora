import { z } from 'zod';

export const categoryKinds = ['PRODUCT', 'SERVICE', 'CONTENT'] as const;

export const categorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated words'),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  kind: z.enum(categoryKinds),
  description: z.string().trim().max(500).optional().or(z.literal('')),
  seoTitle: z.string().trim().max(160).optional().or(z.literal('')),
});

export type CategoryInput = z.infer<typeof categorySchema>;
