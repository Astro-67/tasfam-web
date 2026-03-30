import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import slugify from 'slugify';

export async function GET(request: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const [data, total] = await Promise.all([
      prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.blogPost.count(),
    ]);

    return NextResponse.json({ data, total, page, pageSize });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    const body = await request.json();
    const slug = slugify(body.title, { lower: true, strict: true });
    const data = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        content: body.content || '',
        category: body.category || null,
        author: body.author || 'TASFAM',
        featuredImage: body.featuredImage || null,
        published: body.published || false,
      },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
