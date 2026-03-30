'use client';

import { useEffect, useState } from 'react';

interface Stats {
  blogPosts: number;
  publishedPosts: number;
  publications: number;
  partners: number;
  testimonials: number;
  newsItems: number;
  heroSlides: number;
}

const cards = [
  { key: 'blogPosts', label: 'Total Blog Posts', icon: 'bi-newspaper', color: '#2c5f7d', href: '/admin/blog-posts' },
  { key: 'publishedPosts', label: 'Published Posts', icon: 'bi-check-circle', color: '#198754', href: '/admin/blog-posts' },
  { key: 'publications', label: 'Publications', icon: 'bi-journal-text', color: '#6f42c1', href: '/admin/publications' },
  { key: 'partners', label: 'Partners', icon: 'bi-people', color: '#0dcaf0', href: '/admin/partners' },
  { key: 'testimonials', label: 'Testimonials', icon: 'bi-chat-quote', color: '#fd7e14', href: '/admin/testimonials' },
  { key: 'newsItems', label: 'News Items', icon: 'bi-megaphone', color: '#dc3545', href: '/admin/news-items' },
  { key: 'heroSlides', label: 'Hero Slides', icon: 'bi-images', color: '#20c997', href: '/admin/hero-slides' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h3 className="fw-bold mb-4">Dashboard</h3>
      <div className="row g-3">
        {cards.map((card) => (
          <div key={card.key} className="col-sm-6 col-lg-4 col-xl-3">
            <a href={card.href} className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{ width: 48, height: 48, background: card.color, color: '#fff', fontSize: 22 }}
                  >
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                  <div>
                    <div className="text-muted small">{card.label}</div>
                    <div className="fw-bold fs-4">
                      {stats ? stats[card.key as keyof Stats] : '-'}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
