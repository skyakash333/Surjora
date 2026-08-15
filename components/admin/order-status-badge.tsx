const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  REVIEWING: 'bg-amber-100 text-amber-700',
  QUOTED: 'bg-violet-100 text-violet-700',
  AWAITING_PAYMENT: 'bg-orange-100 text-orange-700',
  PAID: 'bg-cyan-100 text-cyan-700',
  FULFILLING: 'bg-indigo-100 text-indigo-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-ink-100 text-ink-600',
  SPAM: 'bg-red-100 text-red-700',
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
        statusColors[status] ?? 'bg-ink-100 text-ink-600'
      }`}
    >
      {status.replaceAll('_', ' ')}
    </span>
  );
}
