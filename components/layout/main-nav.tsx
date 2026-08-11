'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/constants';
import { cn } from '@/lib/cn';

/**
 * Desktop primary navigation with active-route highlighting. Client component so
 * it can read the current pathname; the header shell around it stays server-rendered.
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {mainNav.map((item) => {
        const active =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-brand-50 text-brand-700'
                : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
