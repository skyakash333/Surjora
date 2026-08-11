import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getAllCategoriesForAdmin,
  getCustomers,
  getMediaLibrary,
  getOrders,
  getPublishedArticles,
  getPublishedProducts,
  getPublishedServices,
} from '@/lib/data';
import { ButtonLink } from '@/components/ui/button';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const [products, services, articles, orders, categories, customers, media] = await Promise.all([
    getPublishedProducts(),
    getPublishedServices(),
    getPublishedArticles(),
    getOrders(),
    getAllCategoriesForAdmin(),
    getCustomers(),
    getMediaLibrary(),
  ]);

  const newOrders = orders.filter((o) => o.status === 'NEW').length;

  const stats = [
    { label: 'Products', value: products.length, href: '/admin/catalog' },
    { label: 'Services', value: services.length, href: '/admin/catalog' },
    { label: 'Articles', value: articles.length, href: '/admin/articles' },
    { label: 'Categories', value: categories.length, href: '/admin/categories' },
    { label: 'Media', value: media.length, href: '/admin/media' },
    { label: 'Customers', value: customers.length, href: '/admin/customers' },
    { label: 'Orders', value: orders.length, href: '/admin/orders' },
    { label: 'New requests', value: newOrders, href: '/admin/orders' },
  ];

  const quickActions = [
    { label: 'Add catalog item', href: '/admin/catalog/new' },
    { label: 'Write an article', href: '/admin/articles/new' },
    { label: 'Manage categories', href: '/admin/categories' },
    { label: 'Upload media', href: '/admin/media' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900">Dashboard</h1>
          <p className="mt-2 text-ink-600">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}.
          </p>
        </div>
        <ButtonLink href="/admin/catalog/new" size="md">
          New catalog item
        </ButtonLink>
      </div>

      <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-ink-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-card"
          >
            <dt className="text-sm font-medium uppercase tracking-wide text-ink-500">
              {stat.label}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-ink-900">{stat.value}</dd>
          </Link>
        ))}
      </dl>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:border-brand-300 hover:text-brand-700"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
