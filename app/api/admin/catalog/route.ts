import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { catalogSchema } from '@/schema/catalog';
import { slugify } from '@/lib/slug';

function isConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function normalizeBody(body: unknown) {
  return (body as Array<{ type: string; data: Record<string, unknown> }>).map((block) => {
    if (block.type === 'heading') {
      return {
        type: block.type,
        data: { level: Number(block.data.level), text: block.data.text },
      };
    }
    return block;
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = catalogSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const slug = slugify(input.slug);

  const data = {
    slug,
    type: input.type,
    title: input.title,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    shortDescription: input.shortDescription || null,
    h1: input.h1 || null,
    coverImageId: input.coverImageId || null,
    categoryId: input.categoryId,
    priceFrom: input.priceFrom ?? null,
    featured: input.featured ?? false,
    status: input.status,
    description: normalizeBody(input.description) as Prisma.InputJsonValue,
    features: input.features as Prisma.InputJsonValue,
    faqs: input.faqs as Prisma.InputJsonValue,
    relatedProductIds: input.relatedProductIds ?? [],
    relatedArticleIds: input.relatedArticleIds ?? [],
  };

  const existing = await prisma.product.findUnique({ where: { slug } });
  const item = existing
    ? await prisma.product.update({ where: { slug }, data })
    : await prisma.product.create({ data });

  const prefix = item.type === 'SERVICE' ? 'services' : 'products';
  revalidatePath(`/${prefix}`, 'page');
  revalidatePath(`/${prefix}/${item.slug}`, 'page');
  revalidatePath('/sitemap.xml', 'layout');

  return NextResponse.json({ ok: true, slug: item.slug }, { status: 200 });
}
