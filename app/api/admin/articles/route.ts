import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { articleSchema } from '@/schema/article';
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

  const parsed = articleSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const slug = slugify(input.slug);
  const publishedAt = input.publishedAt ? new Date(input.publishedAt) : null;
  const tags = input.tags ?? [];

  const data = {
    slug,
    title: input.title,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    excerpt: input.excerpt || null,
    coverImageId: input.coverImageId || null,
    categoryId: input.categoryId,
    author: input.author || 'Wechatscan Team',
    readTimeMinutes: input.readTimeMinutes ?? null,
    publishedAt,
    tags,
    faqs: input.faqs as Prisma.InputJsonValue,
    relatedProductIds: input.relatedProductIds ?? [],
    relatedArticleIds: input.relatedArticleIds ?? [],
    featured: input.featured ?? false,
    status: input.status,
    body: normalizeBody(input.body) as Prisma.InputJsonValue,
  };

  const existing = await prisma.article.findUnique({ where: { slug } });
  const article = existing
    ? await prisma.article.update({ where: { slug }, data })
    : await prisma.article.create({ data });

  const category = await prisma.category.findUnique({
    where: { id: article.categoryId },
    select: { slug: true },
  });
  const categorySlug = category?.slug ?? '';

  revalidatePath(`/knowledge/${categorySlug}`, 'page');
  revalidatePath('/knowledge', 'page');
  revalidatePath(`/knowledge/${categorySlug}/${article.slug}`, 'page');

  return NextResponse.json({ ok: true, slug: article.slug }, { status: 200 });
}
