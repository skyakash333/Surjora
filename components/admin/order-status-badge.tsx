const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-ink-100 text-ink-600',
  SPAM: 'bg-red-100 text-red-700',
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
        statusColors[status] ?? 'bg-ink-100 text-ink-600'
      }`}
    >
      {status}
    </span>
  );
}
