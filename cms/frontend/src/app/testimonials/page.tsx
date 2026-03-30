import Link from 'next/link';
import { getTestimonials } from '@/lib/db';

const fallbackTestimonials = [
  { image: '/img/testimonials/testimonials-1.jpg', quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?', name: 'James Smith' },
  { image: '/img/testimonials/testimonials-2.jpg', quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?', name: 'Kate Smith' },
  { image: '/img/testimonials/testimonials-3.jpg', quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?', name: 'Claire Anderson' },
  { image: '/img/testimonials/testimonials-4.jpg', quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?', name: 'Dan Smith' },
];

export default async function TestimonialsPage() {
  let testimonials = fallbackTestimonials;

  try {
    const res = await getTestimonials();
    if (Array.isArray(res.data) && res.data.length > 0) {
      testimonials = res.data.map((t: Record<string, unknown>) => ({
        image: '/img/testimonials/testimonials-1.jpg',
        quote: (t as { quote?: string }).quote || '',
        name: (t as { name?: string }).name || '',
      }));
    }
  } catch {
    // Use fallback
  }

  return (
    <>
      {/* Page Title */}
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: 'url(/img/page-title-bg.webp)' }}
      >
        <div className="container position-relative">
          <h1>Testimonials</h1>
          <p>Home / Testimonials</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">Testimonials</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials-12 testimonials section" id="testimonials">
        <div className="container section-title" data-aos="fade-up">
          <h2>TESTIMONIALS</h2>
          <p>Necessitatibus eius consequatur</p>
        </div>

        <div className="testimonial-wrap">
          <div className="container">
            <div className="row">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-md-6 mb-4 mb-md-4">
                  <div className="testimonial">
                    <img src={testimonial.image} alt="Testimonial author" />
                    <blockquote>
                      <p>&ldquo;{testimonial.quote}&rdquo;</p>
                    </blockquote>
                    <p className="client-name">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section id="call-to-action" className="call-to-action section light-background">
        <div className="content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h3>Subscribe To Our Newsletter</h3>
                <p className="opacity-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, reprehenderit!
                </p>
              </div>
              <div className="col-lg-6">
                <form className="form-subscribe">
                  <div className="form-group d-flex align-items-stretch">
                    <input
                      type="email"
                      name="email"
                      className="form-control h-100"
                      placeholder="Enter your e-mail"
                    />
                    <input
                      type="submit"
                      className="btn btn-secondary px-4"
                      value="Subscribe"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
