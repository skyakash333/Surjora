'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsInput } from '@/schema/settings';
import { Button } from '@/components/ui/button';

type SettingsFormProps = {
  settings: {
    siteName: string;
    contactEmail: string | null;
    telegramUrl: string | null;
    whatsappUrl: string | null;
    paymentPlaceholder: string | null;
    customersServed: number;
  };
};

const inputClass =
  'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: settings.siteName,
      contactEmail: settings.contactEmail ?? '',
      telegramUrl: settings.telegramUrl ?? '',
      whatsappUrl: settings.whatsappUrl ?? '',
      paymentPlaceholder: settings.paymentPlaceholder ?? '',
      customersServed: settings.customersServed,
    },
  });

  async function onSubmit(values: SettingsInput) {
    setSaving(true);
    setError(null);
    setSaved(false);

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    setSaving(false);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to save settings.');
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-lg border border-ink-200 bg-white p-6">
      <div>
        <label htmlFor="siteName" className="mb-1 block text-sm font-medium text-ink-700">
          Site name *
        </label>
        <input id="siteName" {...register('siteName')} className={inputClass} />
        {errors.siteName && <p className="mt-1 text-xs text-red-600">{errors.siteName.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contactEmail" className="mb-1 block text-sm font-medium text-ink-700">
            Contact email
          </label>
          <input id="contactEmail" type="email" {...register('contactEmail')} className={inputClass} />
          {errors.contactEmail && (
            <p className="mt-1 text-xs text-red-600">{errors.contactEmail.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="customersServed" className="mb-1 block text-sm font-medium text-ink-700">
            Customers served
          </label>
          <input
            id="customersServed"
            type="number"
            min={0}
            {...register('customersServed')}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-ink-500">
            Only shown publicly once above zero — leave at 0 to hide the counter.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="telegramUrl" className="mb-1 block text-sm font-medium text-ink-700">
            Telegram URL
          </label>
          <input id="telegramUrl" type="url" placeholder="https://t.me/…" {...register('telegramUrl')} className={inputClass} />
          {errors.telegramUrl && (
            <p className="mt-1 text-xs text-red-600">{errors.telegramUrl.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="whatsappUrl" className="mb-1 block text-sm font-medium text-ink-700">
            WhatsApp URL
          </label>
          <input id="whatsappUrl" type="url" placeholder="https://wa.me/…" {...register('whatsappUrl')} className={inputClass} />
          {errors.whatsappUrl && (
            <p className="mt-1 text-xs text-red-600">{errors.whatsappUrl.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="paymentPlaceholder" className="mb-1 block text-sm font-medium text-ink-700">
          Payment note
        </label>
        <textarea
          id="paymentPlaceholder"
          {...register('paymentPlaceholder')}
          rows={2}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-ink-500">
          Placeholder text about how payment is handled. No live payment processing is enabled.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </Button>
        {saved && <span className="text-sm font-medium text-green-600">Saved ✓</span>}
      </div>
    </form>
  );
}
