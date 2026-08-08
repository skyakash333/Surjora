import Link from 'next/link';
import { mainNav, siteConfig } from '@/lib/constants';
import { ButtonLink } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink-900">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" size="sm">
            Contact
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
