import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';
import { isCloudinaryConfigured } from '@/lib/media';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Settings | Surjora Admin',
  robots: { index: false, follow: false },
};

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        ok ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      {ok ? 'Configured' : 'Not configured'}
    </span>
  );
}

function Row({ label, value, ok, hint }: { label: string; value: string; ok: boolean; hint?: string }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 py-3 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        <p className="mt-0.5 text-sm text-ink-500">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
      </div>
      <StatusBadge ok={ok} />
    </li>
  );
}

export default async function AdminSettingsPage() {
  const integrations = [
    {
      label: 'Database (Postgres)',
      value: process.env.DATABASE_URL ? 'Connected via Prisma' : 'DATABASE_URL missing',
      ok: Boolean(process.env.DATABASE_URL),
    },
    {
      label: 'Contact email',
      value: siteConfig.email,
      ok: Boolean(process.env.CONTACT_TO_EMAIL),
    },
    {
      label: 'Site URL',
      value: siteConfig.url,
      ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    },
    {
      label: 'Telegram (contact link)',
      value: siteConfig.telegram || 'No link set (NEXT_PUBLIC_TELEGRAM_URL)',
      ok: Boolean(siteConfig.telegram),
    },
    {
      label: 'WhatsApp (contact link)',
      value: siteConfig.whatsapp || 'No link set (NEXT_PUBLIC_WHATSAPP_URL)',
      ok: Boolean(siteConfig.whatsapp),
    },
    {
      label: 'Telegram notifications',
      value: process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
        ? 'Order notifications enabled'
        : 'TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID required',
      ok: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    },
    {
      label: 'WhatsApp notifications',
      value: process.env.WHATSAPP_NUMBER && process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID
        ? 'Order notifications enabled'
        : 'WHATSAPP_NUMBER + WHATSAPP_TOKEN + WHATSAPP_PHONE_ID required',
      ok: Boolean(
        process.env.WHATSAPP_NUMBER && process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID,
      ),
    },
    {
      label: 'Cloudinary (media uploads)',
      value: isCloudinaryConfigured()
        ? 'File uploads enabled'
        : 'CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET required',
      ok: isCloudinaryConfigured(),
    },
    {
      label: 'Turnstile (spam protection)',
      value: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY
        ? 'Contact/quote forms protected'
        : 'NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY required',
      ok: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Settings</h1>
      <p className="mt-2 text-ink-600">
        Configuration is driven by environment variables. This page shows the current state.
      </p>

      <section className="mt-8 rounded-lg border border-ink-200 bg-white">
        <div className="border-b border-ink-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-ink-900">Site</h2>
        </div>
        <ul className="px-6 pb-2">
          <Row label="Site name" value={siteConfig.name} ok />
          <Row
            label="Site URL"
            value={siteConfig.url}
            ok={Boolean(process.env.NEXT_PUBLIC_SITE_URL)}
            hint="NEXT_PUBLIC_SITE_URL is used for canonical links and JSON-LD."
          />
          <Row
            label="Contact email"
            value={siteConfig.email}
            ok={Boolean(process.env.CONTACT_TO_EMAIL)}
            hint="CONTACT_TO_EMAIL receives contact and quote submissions."
          />
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-ink-200 bg-white">
        <div className="border-b border-ink-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-ink-900">Contact channels</h2>
        </div>
        <ul className="px-6 pb-2">
          <Row
            label="Telegram link"
            value={siteConfig.telegram || '—'}
            ok={Boolean(siteConfig.telegram)}
            hint="NEXT_PUBLIC_TELEGRAM_URL appears in the header, footer and contact pages."
          />
          <Row
            label="WhatsApp link"
            value={siteConfig.whatsapp || '—'}
            ok={Boolean(siteConfig.whatsapp)}
            hint="NEXT_PUBLIC_WHATSAPP_URL appears in the header, footer and contact pages."
          />
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-ink-200 bg-white">
        <div className="border-b border-ink-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-ink-900">Integrations</h2>
        </div>
        <ul className="px-6 pb-2">
          {integrations.map((item) => (
            <Row key={item.label} {...item} />
          ))}
        </ul>
      </section>
    </div>
  );
}
