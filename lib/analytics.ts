import type { NextRequest } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com';
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '';

export async function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>,
  request?: NextRequest,
): Promise<void> {
  if (!PLAUSIBLE_DOMAIN) return;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Forwarded-For': request?.headers.get('x-forwarded-for') ?? '',
    'User-Agent': request?.headers.get('user-agent') ?? '',
  };

  try {
    await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        domain: PLAUSIBLE_DOMAIN,
        name,
        url: request?.url ?? SITE_URL,
        props: props && Object.keys(props).length > 0 ? props : undefined,
      }),
    });
  } catch {
    // Analytics must never break the request.
  }
}
