import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400',
        'focus:border-brand-500 focus:outline-2 focus:outline-offset-0 focus:outline-brand-500',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
