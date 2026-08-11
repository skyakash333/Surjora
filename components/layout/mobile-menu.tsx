'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, siteConfig } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 transition hover:border-brand-400 hover:text-brand-600 md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-ink-900/20 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full z-40 border-b border-ink-200 bg-white shadow-card-hover md:hidden"
          >
            <ul className="container py-3">
              {mainNav.map((item) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="container flex flex-wrap gap-2 pb-4 pt-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Request a quote
              </Link>
              {siteConfig.telegram && (
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-sky-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Telegram
                </a>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
