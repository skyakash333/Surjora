import { getMediaById } from '@/lib/media';

type CoverImageProps = {
  mediaId?: string | null;
  url?: string | null;
  alt: string;
  className?: string;
};

export async function CoverImage({ mediaId, url, alt, className }: CoverImageProps) {
  let src: string | null | undefined = url;
  if (!src && mediaId) {
    const media = await getMediaById(mediaId);
    src = media?.url;
  }
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className ?? 'aspect-video w-full rounded-xl object-cover'}
    />
  );
}
