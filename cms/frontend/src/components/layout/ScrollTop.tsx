'use client';

import { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#"
      id="scroll-top"
      className={`scroll-top d-flex align-items-center justify-content-center${active ? ' active' : ''}`}
      onClick={handleClick}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}
