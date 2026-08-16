import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'Terms governing Wechatscan availability requests, quotes, digital delivery and account assistance.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service"
      updated="14 August 2026"
      sections={[
        [
          'Service model',
          'Wechatscan operates a manually reviewed quote and fulfilment service. A website request is not an accepted order. A transaction begins only after Wechatscan confirms availability, scope, final price, delivery estimate and payment instructions in writing, and the customer accepts that quote.',
        ],
        [
          'Customer information',
          'You must provide accurate contact information and a lawful intended use. Do not send passwords, one-time codes, payment PINs or identity documents unless a necessary, secure and specifically explained step has been agreed.',
        ],
        [
          'Platform independence',
          'Wechatscan is an independent service and is not endorsed by, affiliated with or an authorized representative of Tencent, Alibaba, ByteDance, Baidu, Bilibili, JD.com, Xiaohongshu or other referenced platforms unless expressly stated. Platform names and marks belong to their owners.',
        ],
        [
          'Eligibility and platform rules',
          'You are responsible for complying with applicable law and third-party platform terms. Platform features, verification, recovery and continued access are controlled by the platform and can change. Wechatscan does not promise permanent access, unrestricted functionality or approval.',
        ],
        [
          'Quotes and payment',
          'Displayed “from” prices are indicative. The written quote controls the final scope, price, currency, payment method and validity period. Do not send payment until you receive and accept a quote through an official Wechatscan contact channel.',
        ],
        [
          'Delivery and cooperation',
          'Delivery is digital. You must remain reachable and complete agreed customer-side steps promptly. Delivery estimates can change if platform checks, customer information, availability or third-party systems cause delay.',
        ],
        [
          'Prohibited use',
          'You may not use Wechatscan services for fraud, spam, impersonation, harassment, unauthorized access, evasion of platform enforcement, money laundering or other illegal or abusive conduct. Wechatscan may refuse or cancel suspicious requests.',
        ],
        [
          'Liability',
          'To the extent permitted by law, Wechatscan is not responsible for independent platform decisions, policy changes, customer misuse, loss of a linked phone number, inaccurate customer information or events outside reasonable control. Any liability is limited to the amount paid for the affected service.',
        ],
        [
          'Contact',
          'Questions about these terms should be sent through the Wechatscan contact page before payment.',
        ],
      ]}
    />
  );
}

function PolicyPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Array<[string, string]>;
}) {
  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: title }]} />
      <SectionHeading
        as="h1"
        eyebrow="Legal"
        title={title}
        description={`Last updated ${updated}`}
      />
      <div className="mt-10 max-w-3xl space-y-8">
        {sections.map(([heading, text]) => (
          <section key={heading}>
            <h2 className="text-xl font-semibold text-ink-900">{heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-600">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
