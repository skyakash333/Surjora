import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPublishedArticles, getPublishedProducts, getPublishedServices } from '@/lib/data';
import { ButtonLink } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const [products, services, articles] = await Promise.all([
    getPublishedProducts(),
    getPublishedServices(),
    getPublishedArticles(),
  ]);

  const stats = [
    { label: 'Products', value: products.length, href: '/admin/catalog' },
    { label: 'Services', value: services.length, href: '/admin/catalog' },
    { label: 'Articles', value: articles.length, href: '/admin/articles' },
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
        <ButtonLink href="/admin/articles/new" size="md">
          New article
        </ButtonLink>
      </div>

      <dl className="mt-8 grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-ink-200 bg-white p-6 transition hover:border-brand-400"
          >
            <dt className="text-sm font-medium uppercase tracking-wide text-ink-500">
              {stat.label}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-ink-900">{stat.value}</dd>
          </Link>
        ))}
      </dl>
    </div>
  );
}
