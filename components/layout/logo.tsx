import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Wechatscan wordmark with a scan-frame W mark. Kept as inline SVG so it needs
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
      aria-label="Wechatscan — home"
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M8 4H5a1 1 0 0 0-1 1v3M16 4h3a1 1 0 0 1 1 1v3M8 20H5a1 1 0 0 1-1-1v-3M16 20h3a1 1 0 0 0 1-1v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m7.5 10 2.25 5 2.25-6 2.25 6 2.25-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        Wechatscan<span className="text-brand-600">.</span>
      </span>
    </Link>
  );
}
