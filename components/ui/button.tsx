import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export const buttonClasses = {
  base: 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
  variants: {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'border border-ink-300 bg-white text-ink-800 hover:bg-ink-50',
    ghost: 'text-ink-700 hover:text-ink-900',
  },
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
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
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonClasses.base,
        buttonClasses.variants[variant],
        buttonClasses.sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
