'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type MediaItem = {
  id: string;
  url: string;
  alt: string;
  provider: string;
  createdAt: string;
};

type MediaLibraryProps = {
  media: MediaItem[];
  cloudinaryEnabled: boolean;
};

const inputClass =
  'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

export function MediaLibrary({ media, cloudinaryEnabled }: MediaLibraryProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function addByUrl(event: React.FormEvent) {
    event.preventDefault();
    if (!url.trim()) return;
    setBusy(true);
    setError(null);

    const response = await fetch('/api/admin/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim(), alt: alt.trim() || 'Image' }),
    });

    setBusy(false);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to add image.');
      return;
    }
    setUrl('');
    setAlt('');
    router.refresh();
  }

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt.trim() || file.name);

    const response = await fetch('/api/admin/media', { method: 'POST', body: formData });

    setBusy(false);
    event.target.value = '';
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Upload failed.');
      return;
    }
    router.refresh();
  }

  async function copyId(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
    } catch {
      setError('Could not copy to clipboard.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-ink-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink-900">Add media</h2>

        <form onSubmit={addByUrl} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor="media-url" className="mb-1 block text-sm font-medium text-ink-700">
              Image URL
            </label>
            <input
              id="media-url"
              type="url"
              placeholder="https://…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="media-alt" className="mb-1 block text-sm font-medium text-ink-700">
              Alt text
            </label>
            <input
              id="media-alt"
              type="text"
              placeholder="Describe the image"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className={inputClass}
            />
          </div>
          <Button type="submit" disabled={busy || !url.trim()}>
            {busy ? 'Adding…' : 'Add URL'}
          </Button>
        </form>

        <div className="mt-4 border-t border-ink-100 pt-4">
          {cloudinaryEnabled ? (
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
              <input type="file" accept="image/*" onChange={uploadFile} disabled={busy} className="hidden" />
              Upload a file to Cloudinary →
            </label>
          ) : (
            <p className="text-xs text-ink-500">
              File uploads require Cloudinary. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and
              CLOUDINARY_API_SECRET to enable direct uploads. You can still add images by URL above.
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {media.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink-300 bg-white p-10 text-center">
          <p className="text-ink-600">No media yet. Add an image URL or upload a file above.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-lg border border-ink-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.alt}
                className="aspect-video w-full bg-ink-50 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <p className="truncate text-sm font-medium text-ink-900" title={item.alt}>
                  {item.alt}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-ink-400">{item.provider}</p>
                <button
                  type="button"
                  onClick={() => copyId(item.id)}
                  className="mt-2 text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  {copiedId === item.id ? 'Copied ID ✓' : 'Copy media ID'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
