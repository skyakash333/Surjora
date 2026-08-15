import { createHash } from 'node:crypto';
import { prisma } from '@/lib/prisma';

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );
}

// Server-side signed upload to Cloudinary (no SDK dependency).
export async function uploadToCloudinary(file: {
  buffer: Buffer;
  name: string;
  mimeType: string;
}): Promise<{ url: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary is not configured');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = 'surjora';
  const publicId = `upload-${timestamp}`;

  const toSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash('sha1').update(toSign).digest('hex');

  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(file.buffer)], { type: file.mimeType }), file.name);
  form.append('folder', folder);
  form.append('public_id', publicId);
  form.append('timestamp', timestamp);
  form.append('api_key', apiKey);
  form.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudinary upload failed: ${response.status} ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as { secure_url?: string; url?: string };
  const url = data.secure_url ?? data.url;
  if (!url) throw new Error('Cloudinary upload returned no URL');

  return { url };
}

export async function createMedia(input: { url: string; alt: string; provider?: string }) {
  return prisma.media.create({
    data: {
      url: input.url,
      alt: input.alt || 'Cover image',
      provider: input.provider ?? 'manual',
    },
  });
}

export async function getMediaById(id: string | null | undefined) {
  if (!id) return null;
  try {
    return await prisma.media.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
