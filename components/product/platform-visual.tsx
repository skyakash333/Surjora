import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Branded visual placeholder for cards that have no real cover image. Renders a
 * clean, on-brand gradient tile with a platform monogram and optional icon — a
 * consistent 16:10 lockup, NOT a stock photo, screenshot or fabricated proof.
 * The gradient is picked deterministically from `name` so each platform keeps a
 * stable, distinct backdrop across the site.
 */
const gradients = [
  'from-brand-500 to-brand-700',
  'from-orange-500 to-rose-600',
  'from-amber-500 to-orange-700',
  'from-rose-500 to-brand-600',
  'from-brand-600 to-amber-600',
  'from-orange-600 to-red-700',
  'from-amber-600 to-brand-700',
  'from-brand-500 to-orange-700',
] as const;

function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Two-character monogram from a category/product name (drops filler words). */
function monogram(name: string): string {
  const cleaned = name
    .replace(/\b(accounts?|chinese)\b/gi, '')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  const first = words[0] ?? name.trim();
  const second = words[1];
  if (first.length === 0) return name.slice(0, 2).toUpperCase() || '??';
  if (second && second.length > 0) {
    return (first.charAt(0) + second.charAt(0)).toUpperCase();
  }
  return first.slice(0, 2).toUpperCase();
}

type PlatformVisualProps = {
  name: string;
  icon?: ReactNode;
  className?: string;
};

export function PlatformVisual({ name, icon, className }: PlatformVisualProps) {
  const gradient = gradients[hashKey(name) % gradients.length] ?? gradients[0];
  const mono = monogram(name);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        gradient,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(255,255,255,0.28),transparent_60%)]" />
      <span className="pointer-events-none absolute -bottom-5 -left-2 select-none text-[6.5rem] font-black leading-none text-white/10">
        {mono}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
        {icon ?? <span className="text-lg font-bold tracking-tight">{mono}</span>}
      </span>
    </div>
  );
}
