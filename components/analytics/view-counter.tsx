'use client';

import { useEffect } from 'react';

export function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/articles/${encodeURIComponent(slug)}/view`, {
      method: 'POST',
      signal: controller.signal,
    }).catch(() => {
      // Best-effort; never block rendering or throw.
    });
    return () => controller.abort();
  }, [slug]);

  return null;
}
