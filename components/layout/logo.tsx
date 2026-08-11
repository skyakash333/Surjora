import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Surjora wordmark with a simple geometric mark. Kept as inline SVG so it needs
 * no asset pipeline and inherits currentColor for the mark's accent.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight text-ink-900',
        className,
      )}
      aria-label="Surjora — home"
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white shadow-sm transition-transform duration-200 group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M7 16c0-2 1.5-3 3.5-3.4C13 12.1 15 11.2 15 9c0-1.8-1.6-3-3.8-3C9.4 6 8 6.9 7.4 8.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="15.5" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span>
        Surjora<span className="text-brand-600">.</span>
      </span>
    </Link>
  );
}
