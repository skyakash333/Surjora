'use client';

import { useEffect } from 'react';
import { Button, ButtonLink } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-brand-600">Error</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-ink-600">
          An unexpected error occurred on our end. Please try again — if it keeps happening, reach
          out and we&apos;ll help directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
