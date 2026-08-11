import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export const buttonClasses = {
  base: 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    primary:
      'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md active:translate-y-px',
    secondary:
      'border border-ink-200 bg-white text-ink-800 shadow-sm hover:border-ink-300 hover:bg-ink-50 active:translate-y-px',
    ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  },
  sizes: {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  },
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonClasses.variants;
  size?: keyof typeof buttonClasses.sizes;
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        buttonClasses.base,
        buttonClasses.variants[variant],
        buttonClasses.sizes[size],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof buttonClasses.variants;
  size?: keyof typeof buttonClasses.sizes;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  children,
}: ButtonLinkProps) {
  const classes = cn(
    buttonClasses.base,
    buttonClasses.variants[variant],
    buttonClasses.sizes[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
