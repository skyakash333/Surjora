import { getOrders } from '@/lib/data';
import { OrderStatusBadge } from '@/components/admin/order-status-badge';
import { OrderStatusActions } from '@/components/admin/order-status-actions';
import { orderStatuses } from '@/schema/order';

export const revalidate = 0;

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-ink-100 text-ink-600',
  SPAM: 'bg-red-100 text-red-700',
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  const counts = orderStatuses.reduce<Record<string, number>>((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {});
  for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900">Orders</h1>
          <p className="mt-2 text-ink-600">Quote and buy-intent requests.</p>
        </div>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {orderStatuses.map((status) => (
          <div key={status} className="rounded-lg border border-ink-200 bg-white p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">{status}</dt>
            <dd className="mt-1 text-2xl font-bold text-ink-900">{counts[status] ?? 0}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 overflow-hidden rounded-lg border border-ink-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200 bg-ink-50">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-600">Reference</th>
              <th className="px-4 py-3 font-medium text-ink-600">Contact</th>
              <th className="px-4 py-3 font-medium text-ink-600">Type</th>
              <th className="px-4 py-3 font-medium text-ink-600">Message</th>
              <th className="px-4 py-3 font-medium text-ink-600">Status</th>
              <th className="px-4 py-3 font-medium text-ink-600">Received</th>
              <th className="px-4 py-3 font-medium text-ink-600">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-500">
                  No orders yet.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-mono text-xs font-medium text-ink-900">
                  {order.reference}
                </td>
                <td className="px-4 py-3">
                  <div className="text-ink-900">{order.customerEmail ?? '—'}</div>
                  <div className="text-xs text-ink-500">
                    {order.customerTelegram && `TG: ${order.customerTelegram} `}
                    {order.customerWhatsapp && `WA: ${order.customerWhatsapp}`}
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-600">{order.requestType}</td>
                <td className="max-w-[240px] px-4 py-3 text-ink-600">
                  <p className="line-clamp-2">{order.message}</p>
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-ink-600">
                  {order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-3 text-right">
                  <OrderStatusActions id={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
