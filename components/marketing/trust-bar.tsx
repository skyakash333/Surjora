import { BoltIcon, ShieldIcon, HeadsetIcon, GlobeIcon } from '@/components/ui/icons';

const points = [
  {
    icon: GlobeIcon,
    title: 'Focused coverage',
    text: 'Account and assistance options for WeChat, Alipay, Douyin, Taobao and other major platforms.',
  },
  {
    icon: BoltIcon,
    title: 'Reviewed before payment',
    text: 'We confirm the exact scope, availability, final price and delivery estimate before asking you to pay.',
  },
  {
    icon: ShieldIcon,
    title: 'Data minimization',
    text: 'Initial requests should not include passwords, payment PINs, one-time codes or identity documents.',
  },
  {
    icon: HeadsetIcon,
    title: 'Direct channels',
    text: 'Use email, Telegram or WhatsApp for quote questions and agreed delivery coordination.',
  },
];

/**
 * Four-up value proposition strip. States facts about how the service operates
 * (platform coverage, turnaround, privacy, support) — no invented metrics or claims.
 */
export function TrustBar() {
  return (
    <section className="container py-14 sm:py-16">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <li key={point.title} className="surface flex flex-col gap-3 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
              <point.icon />
            </span>
            <h3 className="font-semibold text-ink-900">{point.title}</h3>
            <p className="text-sm leading-relaxed text-ink-600">{point.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
