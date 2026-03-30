import prisma from './prisma';

// Hero Slides
export async function getHeroSlides() {
  const slides = await prisma.heroSlide.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
  return { data: slides, meta: {} };
}

// Blog Posts (paginated)
export async function getBlogPosts(page = 1, pageSize = 9) {
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishDate: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  return {
    data: posts,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    },
  };
}

// Single Blog Post by slug
export async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });
  return { data: post ? [post] : [], meta: {} };
}

// Publications (paginated)
export async function getPublications(page = 1, pageSize = 10) {
  const [publications, total] = await Promise.all([
    prisma.publication.findMany({
      orderBy: { publishDate: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.publication.count(),
  ]);

  return {
    data: publications,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    },
  };
}

// Stakeholders (all partners)
export async function getStakeholders() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  });
  return { data: partners, meta: {} };
}

// Testimonials
export async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany();
  return { data: testimonials, meta: {} };
}

// News Items (latest 3, published)
export async function getNewsItems() {
  const items = await prisma.newsItem.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  return { data: items, meta: {} };
}

// Implementing Partners (government category)
export async function getImplementingPartners() {
  const partners = await prisma.partner.findMany({
    where: { category: 'government' },
    orderBy: { order: 'asc' },
  });
  return { data: partners, meta: {} };
}

// Site Settings — placeholder
export async function getSiteSettings() {
  return { data: {}, meta: {} };
}

// Media helper — return URL as-is (no Strapi prefix needed)
export function getStrapiMedia(url: string | null): string {
  if (!url) return '';
  return url;
}

// Monitoring KPIs — placeholder
export async function getMonitoringKPIs() {
  return { data: [], meta: {} };
}

// M&E Components — placeholder
export async function getMEComponents() {
  return { data: [], meta: {} };
}

// M&E Reports — placeholder
export async function getMEReports() {
  return { data: [], meta: {} };
}

// Archive Items — placeholder
export async function getArchiveItems() {
  return { data: [], meta: {} };
}

// Blog Categories — placeholder
export async function getBlogCategories() {
  return { data: [], meta: {} };
}

// Project Components — placeholder
export async function getProjectComponents() {
  return { data: [], meta: {} };
}
