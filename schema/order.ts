import { z } from 'zod';

export const orderSchema = z
  .object({
    customerEmail: z.string().trim().email('Please enter a valid email').max(200),
    customerTelegram: z.string().trim().max(100).optional().or(z.literal('')),
    customerWhatsapp: z.string().trim().max(100).optional().or(z.literal('')),
    productId: z.string().trim().max(100).optional().nullable(),
    quantity: z.coerce.number().int().min(1).max(100).optional().default(1),
    contactPreference: z.enum(['email', 'telegram', 'whatsapp']).optional().default('email'),
    requestType: z.enum(['buy', 'custom', 'quote']),
    message: z
      .string()
      .trim()
      .min(10, 'Please enter a message of at least 10 characters')
      .max(2000),
    acceptedTerms: z.boolean().refine(Boolean, { message: 'Please accept the request terms' }),
    turnstileToken: z.string().optional(),
  })
  .superRefine((input, context) => {
    if (input.contactPreference === 'telegram' && !input.customerTelegram?.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customerTelegram'],
        message: 'Enter your Telegram username or choose another reply channel',
      });
    }

    if (input.contactPreference === 'whatsapp' && !input.customerWhatsapp?.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customerWhatsapp'],
        message: 'Enter your WhatsApp number or choose another reply channel',
      });
    }
  });

export type OrderInput = z.infer<typeof orderSchema>;

export const orderStatuses = [
  'NEW',
  'REVIEWING',
  'QUOTED',
  'AWAITING_PAYMENT',
  'PAID',
  'FULFILLING',
  'COMPLETED',
  'CANCELLED',
  'SPAM',
] as const;
export type OrderStatusValue = (typeof orderStatuses)[number];
