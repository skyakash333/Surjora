import Link from 'next/link';

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-600">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-ink-300">
                /
              </span>
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-brand-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink-700">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

