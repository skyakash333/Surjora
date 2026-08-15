'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, type OrderInput } from '@/schema/order';
import { Button } from '@/components/ui/button';
import { Turnstile } from '@/components/forms/turnstile';

type QuoteFormProps = {
  productId?: string | null;
  requestType?: 'buy' | 'custom' | 'quote';
  cta?: string;
};

export function QuoteForm({
  productId,
  requestType = 'quote',
  cta = 'Request a quote',
}: QuoteFormProps) {
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerEmail: '',
      customerTelegram: '',
      customerWhatsapp: '',
      productId: productId ?? '',
      quantity: 1,
      contactPreference: 'email',
      requestType,
      message: '',
      acceptedTerms: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const contactPreference = watch('contactPreference');

  async function onSubmit(values: OrderInput) {
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error ?? 'Something went wrong. Please try again.');
        return;
      }

      const body = (await response.json().catch(() => null)) as { reference?: string } | null;
      setReference(body?.reference ?? null);
      setSuccess(true);
    } catch {
      setError('We could not submit your request. Check your connection and try again.');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="font-semibold text-green-800">Availability request received</h3>
        <p className="mt-2 text-sm text-green-700">
          We&apos;ll review availability and reply with the exact scope, price, delivery estimate
          and payment instructions. This is not a confirmed purchase yet.
          {reference && (
            <>
              {' '}
              Your reference is <span className="font-medium">{reference}</span>.
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
        <input
          id="customerEmail"
          type="email"
          autoComplete="email"
          {...register('customerEmail')}
          className={inputClass}
        />
        {errors.customerEmail && (
          <p className="mt-1 text-xs text-red-600">{errors.customerEmail.message}</p>
        )}
      </div>

      {productId && (
        <div>
          <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-ink-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={100}
            inputMode="numeric"
            {...register('quantity')}
            className={inputClass}
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customerTelegram" className="mb-1 block text-sm font-medium text-ink-700">
            Telegram {contactPreference === 'telegram' ? '*' : '(optional)'}
          </label>
          <input
            id="customerTelegram"
            {...register('customerTelegram')}
            placeholder="@username"
            className={inputClass}
          />
          {errors.customerTelegram && (
            <p className="mt-1 text-xs text-red-600">{errors.customerTelegram.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="customerWhatsapp" className="mb-1 block text-sm font-medium text-ink-700">
            WhatsApp {contactPreference === 'whatsapp' ? '*' : '(optional)'}
          </label>
          <input
            id="customerWhatsapp"
            {...register('customerWhatsapp')}
            placeholder="+1 555 000 0000"
            className={inputClass}
          />
          {errors.customerWhatsapp && (
            <p className="mt-1 text-xs text-red-600">{errors.customerWhatsapp.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contactPreference" className="mb-1 block text-sm font-medium text-ink-700">
          Preferred reply channel
        </label>
        <select id="contactPreference" {...register('contactPreference')} className={inputClass}>
          <option value="email">Email</option>
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
          What do you need? *
        </label>
        <textarea id="message" rows={4} {...register('message')} className={inputClass} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <Turnstile onChange={setTurnstileToken} />

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-600">
        <input
          type="checkbox"
          {...register('acceptedTerms')}
          className="mt-0.5 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
        />
        <span>
          I understand this submits an availability and quote request, not an immediate purchase. I
          agree to the{' '}
          <Link href="/terms" className="font-medium text-brand-700 underline">
            Terms
          </Link>
          ,{' '}
          <Link href="/privacy" className="font-medium text-brand-700 underline">
            Privacy Policy
          </Link>
          , and{' '}
          <Link href="/refund-delivery-policy" className="font-medium text-brand-700 underline">
            Refund &amp; Delivery Policy
          </Link>
          .
        </span>
      </label>
      {errors.acceptedTerms && (
        <p className="text-xs text-red-600">{errors.acceptedTerms.message}</p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : cta}
      </Button>
    </form>
  );
}
