'use client';

import { useEffect } from 'react';

interface HeroSlide {
  image: string;
  caption: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  useEffect(() => {
    // Generate carousel indicators dynamically
    const indicatorsContainer = document.querySelector('#hero-carousel .carousel-indicators');
    if (indicatorsContainer && indicatorsContainer.children.length === 0) {
      slides.forEach((_, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-bs-target', '#hero-carousel');
        li.setAttribute('data-bs-slide-to', String(index));
        if (index === 0) li.classList.add('active');
        indicatorsContainer.appendChild(li);
      });
    }
  }, [slides]);

  return (
    <section id="hero" className="hero section dark-background">
      <div
        id="hero-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item${index === 0 ? ' active' : ''}`}
          >
            <img src={slide.image} alt="" />
            <div className="carousel-container">
              <p className="hero-caption">{slide.caption}</p>
            </div>
          </div>
        ))}

        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          ></span>
        </a>

        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          ></span>
        </a>

        <ol className="carousel-indicators"></ol>
      </div>
    </section>
  );
}
