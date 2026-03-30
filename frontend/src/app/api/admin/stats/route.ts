import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [blogPosts, publishedPosts, publications, partners, testimonials, newsItems, heroSlides] =
      await Promise.all([
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { published: true } }),
        prisma.publication.count(),
        prisma.partner.count(),
        prisma.testimonial.count(),
        prisma.newsItem.count(),
        prisma.heroSlide.count(),
      ]);

    return NextResponse.json({
      blogPosts,
      publishedPosts,
      publications,
      partners,
      testimonials,
      newsItems,
      heroSlides,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
