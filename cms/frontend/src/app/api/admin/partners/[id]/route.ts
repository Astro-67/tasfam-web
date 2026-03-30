import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  try {
    const data = await prisma.partner.findUnique({ where: { id: parseInt(params.id) } });
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
    const data = await prisma.partner.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        description: body.description || null,
        category: body.category || '',
        role: body.role || null,
        icon: body.icon || null,
        logo: body.logo || null,
        link: body.link || null,
        order: body.order ? parseInt(body.order) : 0,
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
    await prisma.partner.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
