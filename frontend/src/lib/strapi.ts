import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchAPI<T>(
  path: string,
  params: Record<string, unknown> = {},
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const query = qs.stringify(params, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ''}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    console.error(`Strapi fetch error: ${res.status} ${res.statusText} - ${url}`);
    return { data: [] as unknown as T, meta: {} };
  }

  return res.json();
}

// Site Settings
export async function getSiteSettings() {
  return fetchAPI('/site-setting', { populate: '*' });
}

// Hero Slides
export async function getHeroSlides() {
  return fetchAPI('/hero-slides', {
    populate: '*',
    sort: 'order:asc',
    filters: { published: true },
  });
}

// Homepage
export async function getHomepage() {
  return fetchAPI('/homepage', { populate: '*' });
}

// Blog Posts
export async function getBlogPosts(page = 1, pageSize = 9) {
  return fetchAPI('/blog-posts', {
    populate: ['featured_image', 'category', 'author'],
    sort: 'publish_date:desc',
    pagination: { page, pageSize },
  });
}

export async function getBlogPost(slug: string) {
  return fetchAPI('/blog-posts', {
    filters: { slug: { $eq: slug } },
    populate: ['featured_image', 'category', 'tags', 'author'],
  });
}

export async function getBlogCategories() {
  return fetchAPI('/blog-categories', { populate: '*' });
}

// Publications
export async function getPublications(page = 1, pageSize = 10) {
  return fetchAPI('/publications', {
    populate: ['file'],
    sort: 'publish_date:desc',
    pagination: { page, pageSize },
  });
}

// Project Components
export async function getProjectComponents() {
  return fetchAPI('/project-components', {
    populate: '*',
    sort: 'order:asc',
  });
}

// Stakeholders
export async function getStakeholders() {
  return fetchAPI('/stakeholders', {
    populate: ['logo'],
    sort: 'category:asc',
  });
}

// Testimonials
export async function getTestimonials() {
  return fetchAPI('/testimonials', { populate: ['author_image'] });
}

// Monitoring KPIs
export async function getMonitoringKPIs() {
  return fetchAPI('/monitoring-kpis', { populate: '*' });
}

// M&E Components
export async function getMEComponents() {
  return fetchAPI('/me-components', {
    populate: '*',
    sort: 'order:asc',
  });
}

// Archive Items
export async function getArchiveItems(page = 1, pageSize = 10) {
  return fetchAPI('/archive-items', {
    populate: ['file'],
    sort: 'year:desc',
    pagination: { page, pageSize },
  });
}

// News Items
export async function getNewsItems() {
  return fetchAPI('/news-items', {
    populate: ['thumbnail'],
    sort: 'createdAt:desc',
    pagination: { page: 1, pageSize: 3 },
  });
}

// Implementing Partners
export async function getImplementingPartners() {
  return fetchAPI('/implementing-partners', {
    populate: ['logo'],
  });
}

// M&E Reports
export async function getMEReports() {
  return fetchAPI('/me-reports', {
    populate: ['file'],
    sort: 'createdAt:desc',
  });
}

// Form submissions
export async function submitContactForm(data: Record<string, string>) {
  return fetchAPI('/contact-submissions', {}, {
    method: 'POST',
    body: JSON.stringify({ data }),
    next: { revalidate: 0 },
  });
}

export async function submitNewsletter(email: string) {
  return fetchAPI('/newsletter-subscribers', {}, {
    method: 'POST',
    body: JSON.stringify({ data: { email } }),
    next: { revalidate: 0 },
  });
}

// Helper to get Strapi media URL
export function getStrapiMedia(url: string | null): string {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${STRAPI_URL}${url}`;
}
