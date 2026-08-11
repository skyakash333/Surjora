import { cn } from '@/lib/cn';

type BadgeProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

const variants = {
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200',
  neutral: 'bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  outline: 'bg-white text-ink-600 ring-1 ring-inset ring-ink-200',
} as const;

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
