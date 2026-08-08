type AnalyticsEvent = {
  event: string;
  props?: Record<string, string | number | boolean>;
};

export async function trackEvent(_payload: AnalyticsEvent): Promise<void> {
  // Placeholder for Plausible / Vercel Analytics integration.
  // Wired up in Phase 4 (SEO System).
  return;
}
