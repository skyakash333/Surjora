import { z } from 'zod';

export const settingsSchema = z.object({
  siteName: z.string().trim().min(1, 'Site name is required').max(120),
  contactEmail: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(200)
    .optional()
    .or(z.literal('')),
  telegramUrl: z.string().trim().url('Enter a valid URL').max(300).optional().or(z.literal('')),
  whatsappUrl: z.string().trim().url('Enter a valid URL').max(300).optional().or(z.literal('')),
  paymentPlaceholder: z.string().trim().max(500).optional().or(z.literal('')),
  customersServed: z.coerce.number().int().min(0).max(10_000_000).optional().default(0),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
