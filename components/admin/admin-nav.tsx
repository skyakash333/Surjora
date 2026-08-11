import Link from 'next/link';

const links = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Catalog', href: '/admin/catalog' },
  { label: 'Articles', href: '/admin/articles' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Media', href: '/admin/media' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminNav() {
  return (
    <nav aria-label="Admin navigation" className="hidden items-center gap-5 md:flex">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
