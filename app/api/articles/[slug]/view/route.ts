import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_request: Request, { params }: { params: { slug: string } }) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    await prisma.article.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('View increment failed:', error);
    return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
  }
}
