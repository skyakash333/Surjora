import type { Metadata } from 'next';
import { getMediaLibrary } from '@/lib/data';
import { isCloudinaryConfigured } from '@/lib/media';
import { MediaLibrary } from '@/components/admin/media-library';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Media | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  const media = await getMediaLibrary();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Media</h1>
      <p className="mt-2 text-ink-600">
        Add images once, then select them as product, service or article covers in the relevant
        editor.
      </p>

      <div className="mt-8">
        <MediaLibrary
          cloudinaryEnabled={isCloudinaryConfigured()}
          media={media.map((m) => ({
            id: m.id,
            url: m.url,
            alt: m.alt,
            provider: m.provider,
            createdAt: m.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
