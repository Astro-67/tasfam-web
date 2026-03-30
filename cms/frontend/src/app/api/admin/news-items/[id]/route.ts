import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    const data = await prisma.newsItem.findUnique({ where: { id: parseInt(params.id) } });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    const body = await request.json();
    const data = await prisma.newsItem.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        thumbnail: body.thumbnail || null,
        dateBadge: body.dateBadge || null,
        published: body.published ?? false,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    await prisma.newsItem.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
