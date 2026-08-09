'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, type OrderInput } from '@/schema/order';
import { Button } from '@/components/ui/button';

type QuoteFormProps = {
  productId?: string | null;
  requestType?: 'buy' | 'custom' | 'quote';
  cta?: string;
};

export function QuoteForm({ productId, requestType = 'buy', cta = 'Request a quote' }: QuoteFormProps) {
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerEmail: '',
      customerTelegram: '',
      customerWhatsapp: '',
      productId: productId ?? '',
      requestType,
      message: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: OrderInput) {
    setError(null);
    setSuccess(false);

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Something went wrong. Please try again.');
      return;
    }

    const body = (await response.json().catch(() => null)) as { reference?: string } | null;
    setReference(body?.reference ?? null);
    setSuccess(true);
  }

  const inputClass =
    'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="font-semibold text-green-800">Request received</h3>
        <p className="mt-2 text-sm text-green-700">
          Thanks! We&apos;ll get back to you shortly.
          {reference && (
            <>
              {' '}Your reference is <span className="font-medium">{reference}</span>.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="customerEmail" className="mb-1 block text-sm font-medium text-ink-700">
          Email *
        </label>
        <input id="customerEmail" type="email" autoComplete="email" {...register('customerEmail')} className={inputClass} />
        {errors.customerEmail && <p className="mt-1 text-xs text-red-600">{errors.customerEmail.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customerTelegram" className="mb-1 block text-sm font-medium text-ink-700">
            Telegram (optional)
          </label>
          <input id="customerTelegram" {...register('customerTelegram')} placeholder="@username" className={inputClass} />
        </div>
        <div>
          <label htmlFor="customerWhatsapp" className="mb-1 block text-sm font-medium text-ink-700">
            WhatsApp (optional)
          </label>
          <input id="customerWhatsapp" {...register('customerWhatsapp')} placeholder="+1 555 000 0000" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
          What do you need? *
        </label>
        <textarea id="message" rows={4} {...register('message')} className={inputClass} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : cta}
      </Button>
    </form>
  );
}
