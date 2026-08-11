import type { Metadata } from 'next';
import { getCustomers } from '@/lib/data';
import { OrderStatusBadge } from '@/components/admin/order-status-badge';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Customers | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Customers</h1>
      <p className="mt-2 text-ink-600">
        Derived from quote and buy requests — grouped by email, Telegram or WhatsApp. No separate
        customer accounts are stored.
      </p>

      {customers.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-ink-300 bg-white p-10 text-center">
          <p className="text-ink-600">No customers yet. They&apos;ll appear here as requests come in.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50">
              <tr>
                <th className="px-4 py-3 font-medium text-ink-600">Contact</th>
                <th className="px-4 py-3 font-medium text-ink-600">Channels</th>
                <th className="px-4 py-3 font-medium text-ink-600">Requests</th>
                <th className="px-4 py-3 font-medium text-ink-600">Statuses</th>
                <th className="px-4 py-3 font-medium text-ink-600">Last request</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {customers.map((customer) => (
                <tr key={customer.key}>
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {customer.email ?? customer.telegram ?? customer.whatsapp ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-500">
                    {[
                      customer.telegram && `TG: ${customer.telegram}`,
                      customer.whatsapp && `WA: ${customer.whatsapp}`,
                    ]
                      .filter(Boolean)
                      .join(' · ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{customer.requestCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {customer.statuses.map((status) => (
                        <OrderStatusBadge key={status} status={status} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {customer.lastRequestAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
