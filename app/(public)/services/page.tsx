import { getPublishedServices } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Digital Services',
  description:
    'Digital services for China: WeChat QR scan, Chinese verification, account assistance and custom requests. Fast, friendly support.',
  path: '/services',
});

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com'}/` },
          {
            label: 'Services',
            href: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com'}/services`,
          },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Services' }]} />
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Digital Services</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Everything you need beyond the accounts themselves — verification, QR scanning, setup help
          and custom requests.
        </p>

        {services.length === 0 ? (
          <p className="mt-10 rounded-lg border border-ink-200 bg-white p-8 text-ink-600">
            Service pages are being prepared. Contact us directly and we&apos;ll help you get what
            you need.
          </p>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ProductCard
                key={service.id}
                slug={service.slug}
                title={service.title}
                seoDescription={service.seoDescription}
                priceFrom={service.priceFrom}
                href={`/services/${service.slug}`}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
