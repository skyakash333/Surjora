import { BoltIcon, ShieldIcon, HeadsetIcon, GlobeIcon } from '@/components/ui/icons';

const points = [
  {
    icon: GlobeIcon,
    title: 'Digital delivery',
    text: 'Everything is delivered electronically — no shipping, hardware or waiting on couriers.',
  },
  {
    icon: BoltIcon,
    title: 'Fast turnaround',
    text: 'Most requests are quoted within a few hours and fulfilled shortly after confirmation.',
  },
  {
    icon: ShieldIcon,
    title: 'Private & careful',
    text: 'Your details stay private. We handle every request personally and transparently.',
  },
  {
    icon: HeadsetIcon,
    title: 'Real support',
    text: 'We stay reachable after delivery on Telegram and WhatsApp to help you get set up.',
  },
];

/**
 * Four-up value proposition strip. States facts about how the service operates
 * (digital delivery, turnaround, privacy, support) — no invented metrics or claims.
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
