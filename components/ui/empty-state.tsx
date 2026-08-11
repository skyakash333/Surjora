import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; href: string };
  className?: string;
};

/**
 * Shared empty-state block for listings with no results (no products yet, no
 * articles in a category, etc.). Keeps the "nothing here" experience consistent
 * and always offers a way forward.
 */
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'surface flex flex-col items-center justify-center gap-4 px-6 py-16 text-center',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600"
      >
        {icon ?? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        )}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        {description && <p className="mx-auto max-w-md text-sm text-ink-600">{description}</p>}
      </div>
      {action && (
        <ButtonLink href={action.href} variant="secondary" size="sm">
          {action.label}
        </ButtonLink>
      )}
    </div>
  );
}
