let warnedDisabled = false;
let warnedMisconfigured = false;

export async function verifyTurnstileToken(token: string | undefined, ip?: string | null): Promise<boolean> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Both keys absent → feature intentionally disabled. The widget is not rendered
  // (Turnstile component returns null), so there is no token to verify. Pass through.
  if (!siteKey && !secret) {
    if (!warnedDisabled) {
      warnedDisabled = true;
      console.warn('[turnstile] Cloudflare Turnstile is not configured; bot protection is disabled.');
    }
    return true;
  }

  // Partial configuration is a misconfiguration: if only the site key is set the
  // widget renders and users solve it, but the server would accept every submission.
  // Fail CLOSED instead of silently passing. Log once to avoid log spam.
  if (!siteKey || !secret) {
    if (!warnedMisconfigured) {
      warnedMisconfigured = true;
      console.error(
        '[turnstile] Misconfiguration: both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are required together.',
      );
    }
    return false;
  }

  if (!token) return false;

  try {
    const form = new URLSearchParams({
      secret,
      response: token,
    });
    if (ip) form.set('remoteip', ip);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
