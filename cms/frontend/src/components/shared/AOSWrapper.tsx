'use client';

import { useEffect } from 'react';

export default function AOSWrapper() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }, []);

  return null;
}
