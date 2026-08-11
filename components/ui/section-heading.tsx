import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
  children?: React.ReactNode;
};

/**
 * Consistent section header: optional eyebrow label, a title, and an optional
 * supporting description. Used across public pages to keep hierarchy uniform.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
  className,
  children,
}: SectionHeadingProps) {
  const Heading = as;
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        centered && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={cn(
          'text-balance font-bold tracking-tight text-ink-900',
          as === 'h1' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn('max-w-2xl text-base text-ink-600 sm:text-lg', centered && 'mx-auto')}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
