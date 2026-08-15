'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderStatuses, type OrderStatusValue } from '@/schema/order';
import { Button } from '@/components/ui/button';

type Props = {
  id: string;
  status: string;
  quotedPrice: number | null;
  internalNotes: string | null;
};

export function OrderStatusActions({ id, status, quotedPrice, internalNotes }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nextStatus, setNextStatus] = useState(status as OrderStatusValue);
  const [quote, setQuote] = useState(quotedPrice?.toString() ?? '');
  const [notes, setNotes] = useState(internalNotes ?? '');
  const [error, setError] = useState<string | null>(null);

  async function update() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          quotedPrice: quote ? Number(quote) : null,
          internalNotes: notes.trim() || null,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error ?? 'Failed to update request.');
        return;
      }

      router.refresh();
    } catch {
      setError('Could not save the request. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-[220px] space-y-2">
      <select
        aria-label="Request status"
        value={nextStatus}
        onChange={(event) => setNextStatus(event.target.value as OrderStatusValue)}
        disabled={loading}
        className="w-full rounded-md border border-ink-300 px-2 py-1.5 text-xs"
      >
        {orderStatuses.map((item) => (
          <option key={item} value={item}>
            {item.replaceAll('_', ' ')}
          </option>
        ))}
      </select>
      <input
        aria-label="Quoted price in USD"
        value={quote}
        onChange={(event) => setQuote(event.target.value)}
        type="number"
        min="0"
        step="0.01"
        placeholder="Quoted price (USD)"
        className="w-full rounded-md border border-ink-300 px-2 py-1.5 text-xs"
      />
      <textarea
        aria-label="Internal notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        rows={2}
        placeholder="Internal notes"
        className="w-full rounded-md border border-ink-300 px-2 py-1.5 text-xs"
      />
      {error && <p className="text-left text-xs text-red-600">{error}</p>}
      <Button variant="secondary" size="sm" className="w-full" onClick={update} disabled={loading}>
        {loading ? 'Saving…' : 'Save request'}
      </Button>
    </div>
  );
}
