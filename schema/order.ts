import { z } from 'zod';

export const orderSchema = z.object({
  customerEmail: z.string().trim().email('Please enter a valid email').max(200),
  customerTelegram: z.string().trim().max(100).optional().or(z.literal('')),
  customerWhatsapp: z.string().trim().max(100).optional().or(z.literal('')),
  productId: z.string().max(100).optional().nullable(),
  requestType: z.enum(['buy', 'custom', 'quote']),
  message: z.string().trim().min(10, 'Please enter a message of at least 10 characters').max(2000),
  turnstileToken: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const orderStatuses = ['NEW', 'CONTACTED', 'WON', 'LOST', 'SPAM'] as const;
export type OrderStatusValue = (typeof orderStatuses)[number];
