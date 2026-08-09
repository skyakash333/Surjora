'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderStatuses, type OrderStatusValue } from '@/schema/order';
import { Button } from '@/components/ui/button';

export function OrderStatusActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(next: OrderStatusValue) {
    if (next === status) return;
    setLoading(true);

    const response = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });

    setLoading(false);

    if (!response.ok) {
      alert('Failed to update order.');
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {orderStatuses.map((s) => (
        <Button
          key={s}
          variant="ghost"
          size="sm"
          className={s === status ? 'bg-ink-100 text-ink-900' : 'text-ink-500'}
          onClick={() => update(s)}
          disabled={loading || s === status}
        >
          {s}
        </Button>
      ))}
    </div>
  );
}
