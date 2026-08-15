import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata = buildMetadata({
  title: 'Refund and Delivery Policy',
  description: 'Surjora digital delivery, cancellation, refund and issue-reporting policy.',
  path: '/refund-delivery-policy',
});

export default function RefundDeliveryPage() {
  const sections = [
    [
      'Before payment',
      'Submitting a request does not require payment. You may withdraw before accepting and paying an issued quote. Availability and delivery timing are not reserved until Surjora confirms otherwise in writing.',
    ],
    [
      'Digital delivery',
      'Products, credentials, instructions and services are delivered digitally through the contact channel agreed in the quote. The delivery estimate begins when payment is confirmed and all required customer information is available.',
    ],
    [
      'Customer review',
      'Inspect delivered information promptly and report a material mismatch through the original communication channel. Include the request reference and evidence, but never send passwords or payment PINs in ordinary chat.',
    ],
    [
      'Refund eligibility',
      'A refund may be available when Surjora cannot deliver the specifically agreed scope, when the delivered item materially differs from the written quote and cannot be corrected, or when Surjora cancels before delivery. The written quote may define product-specific replacement or review conditions.',
    ],
    [
      'Non-refundable situations',
      'Refunds are generally unavailable after correctly delivered digital credentials or completed services when the issue results from customer misuse, changed mind, loss of a linked number, incorrect information, unauthorized sharing, violation of platform rules, independent platform enforcement or features not promised in the quote.',
    ],
    [
      'Replacement and correction',
      'When appropriate, Surjora may first investigate, correct instructions, repeat an agreed service step or provide a replacement consistent with the accepted quote. This does not guarantee reversal of third-party platform decisions.',
    ],
    [
      'Timing',
      'Approved refunds are returned through an available agreed method. Processing time depends on the payment provider and destination. Fees charged independently by banks, exchanges or payment networks may not be recoverable.',
    ],
    [
      'Disputes',
      'Contact Surjora first with the request reference and evidence. Fraudulent chargebacks, threats or concealment of material facts may result in refusal of future service. Nothing in this policy removes non-waivable consumer rights under applicable law.',
    ],
  ];
  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: 'Refund & Delivery Policy' }]} />
      <SectionHeading
        as="h1"
        eyebrow="Legal"
        title="Refund & Delivery Policy"
        description="Last updated 14 August 2026"
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
