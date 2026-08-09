import { JsonLd } from '@/components/seo/json-ld';
import type { ProductFaq } from '@/lib/content-blocks';

type Crumb = {
  label: string;
  href: string;
};

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const itemList = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href,
  }));

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itemList,
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: ProductFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  );
}

type ProductSchemaProps = {
  name: string;
  description: string;
  url: string;
  priceFrom?: number | null;
  image?: string;
};

export function ProductSchema({ name, description, url, priceFrom, image }: ProductSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        url,
        image: image ?? undefined,
        offers: priceFrom
          ? {
              '@type': 'Offer',
              price: priceFrom,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url,
            }
          : undefined,
      }}
    />
  );
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  url: string;
};

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        serviceType: 'Digital Services',
      }}
    />
  );
}

type ArticleSchemaProps = {
  headline: string;
  description?: string | null;
  url: string;
  image?: string;
  author: string;
  datePublished?: string | null;
  dateModified?: string | null;
};

export function ArticleSchema({
  headline,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description: description ?? undefined,
        url,
        image: image ?? undefined,
        author: { '@type': 'Person', name: author },
        publisher: {
          '@type': 'Organization',
          name: 'Surjora',
        },
        mainEntityOfPage: url,
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
      }}
    />
  );
}
