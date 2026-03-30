'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/components', label: 'Components' },
  { href: '/partners', label: 'Partners' },
  { href: '/research', label: 'Research & Publication' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
    return () => {
      document.body.classList.remove('mobile-nav-active');
    };
  }, [mobileNavOpen]);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <header
      id="header"
      className={`header d-flex align-items-center position-relative${scrolled ? ' header-scrolled' : ''}`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <nav id="navmenu" className="navmenu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                  onClick={closeMobileNav}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <i
            className={`mobile-nav-toggle d-lg-none bi ${mobileNavOpen ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          ></i>
        </nav>
      </div>
    </header>
  );
}
