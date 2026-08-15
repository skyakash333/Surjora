import { getPublishedServices } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState } from '@/components/ui/empty-state';
import { CtaSection } from '@/components/marketing/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schemas';

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
  title: 'Digital Services',
  description:
    'Request reviewed WeChat QR assistance, Chinese platform verification guidance, account help and custom services.',
  path: '/services',
});

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Services', href: `${siteConfig.url}/services` },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Services' }]} />
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="Digital Services"
          description="Reviewed assistance for verification, QR confirmation, setup, recovery and custom Chinese-platform needs."
        />

        {services.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No services listed yet"
              description="There are no published services. Send the details for a manual scope review."
              action={{ label: 'Contact us', href: '/contact' }}
            />
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ProductCard
                key={service.id}
                slug={service.slug}
                title={service.title}
                description={service.shortDescription ?? service.seoDescription}
                priceFrom={service.priceFrom}
                type={service.type}
                featured={service.featured}
                coverImageId={service.coverImageId}
                href={`/services/${service.slug}`}
              />
            ))}
          </ul>
        )}
      </div>

      <CtaSection
        title="Need something custom?"
        description="Describe the platform, intended outcome and country involved. We'll review what can be supported and define the scope before payment."
      />
    </>
  );
}
