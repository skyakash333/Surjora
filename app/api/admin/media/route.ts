import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createMedia, isCloudinaryConfigured, uploadToCloudinary } from '@/lib/media';

async function readFileBuffer(file: File): Promise<Buffer> {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const contentType = request.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('multipart/form-data')) {
      if (!isCloudinaryConfigured()) {
        return NextResponse.json(
          { error: 'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.' },
          { status: 503 },
        );
      }

      const formData = await request.formData();
      const file = formData.get('file');
      const alt = (formData.get('alt') as string | null) ?? 'Cover image';

      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Missing file' }, { status: 400 });
      }

      const buffer = await readFileBuffer(file);
      const { url } = await uploadToCloudinary({
        buffer,
        name: file.name,
        mimeType: file.type,
      });

      const media = await createMedia({ url, alt, provider: 'cloudinary' });
      return NextResponse.json({ id: media.id, url: media.url }, { status: 201 });
    }

    // JSON fallback: accept an external URL so uploads work without Cloudinary.
    const payload = (await request.json()) as { url?: string; alt?: string };
    const url = payload.url?.trim();
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const media = await createMedia({ url, alt: payload.alt ?? 'Cover image', provider: 'manual' });
    return NextResponse.json({ id: media.id, url: media.url }, { status: 201 });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
