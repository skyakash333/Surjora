import Link from 'next/link';

const links = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Articles', href: '/admin/articles' },
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
