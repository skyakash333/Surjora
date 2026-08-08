import type { Metadata } from 'next';

const SITE_NAME = 'Surjora';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com';

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  openGraphType?: 'website' | 'article' | 'profile';
};

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  openGraphType = 'website',
}: BuildMetadataArgs): Metadata {
  const url = new URL(path, SITE_URL);

  return {
    title: {
      absolute: `${title} | ${SITE_NAME}`,
    },
    description,
    alternates: {
      canonical: url.toString(),
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      type: openGraphType,
      locale: 'en_US',
      url: url.toString(),
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
