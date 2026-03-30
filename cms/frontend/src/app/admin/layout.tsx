'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'bi-speedometer2' },
  { href: '/admin/blog-posts', label: 'Blog Posts', icon: 'bi-newspaper' },
  { href: '/admin/news-items', label: 'News', icon: 'bi-megaphone' },
  { href: '/admin/publications', label: 'Publications', icon: 'bi-journal-text' },
  { href: '/admin/partners', label: 'Partners', icon: 'bi-people' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: 'bi-chat-quote' },
  { href: '/admin/hero-slides', label: 'Hero Slides', icon: 'bi-images' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Mobile toggle */}
      <button
        className="btn btn-dark d-md-none position-fixed"
        style={{ top: 10, left: 10, zIndex: 1051 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1049 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`position-fixed top-0 start-0 h-100 d-flex flex-column ${sidebarOpen ? '' : 'd-none d-md-flex'}`}
        style={{
          width: 250,
          background: '#2c5f7d',
          zIndex: 1050,
          overflowY: 'auto',
        }}
      >
        <div className="p-3 text-center border-bottom border-secondary">
          <img src="/images/logo.png" alt="Logo" style={{ width: 40, height: 40 }} className="mb-1" />
          <h6 className="text-white mb-0 fw-bold">TASFAM Admin</h6>
        </div>

        <ul className="nav flex-column flex-grow-1 py-2">
          {navItems.map((item) => (
            <li className="nav-item" key={item.href}>
              <a
                href={item.href}
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 ${
                  isActive(item.href) ? 'text-white fw-semibold' : 'text-white-50'
                }`}
                style={
                  isActive(item.href)
                    ? { background: 'rgba(255,255,255,0.15)', borderLeft: '3px solid #fff' }
                    : { borderLeft: '3px solid transparent' }
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSidebarOpen(false);
                  router.push(item.href);
                }}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="p-3 border-top border-secondary">
          <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-1"></i> Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="d-none d-md-block" style={{ marginLeft: 250 }}>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
      <div className="d-md-none">
        <div style={{ padding: '60px 15px 20px' }}>{children}</div>
      </div>
    </div>
  );
}
