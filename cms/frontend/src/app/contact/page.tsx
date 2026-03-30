import Link from 'next/link';
import ContactForm from '@/components/shared/ContactForm';

export default function ContactPage() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Contact Us</h1>
                <p className="mb-0">
                  Get in touch with the TASFAM Zanzibar team. We&apos;re here to answer your
                  questions and assist with any inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">Contact Us</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Contact Section */}
      <section id="contact-content" className="section-padding">
        <div className="container">
          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-5">
              <div className="contact-info-box">
                <h3>Get In Touch</h3>
                <p>
                  We welcome your inquiries, feedback, and collaboration opportunities. Reach out to
                  us through any of the following channels:
                </p>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="info-content">
                    <h5>Our Location</h5>
                    <p>
                      Ministry of Blue Economy and Fisheries
                      <br />
                      Department of Fisheries Development
                      <br />
                      P.O. Box 774
                      <br />
                      Zanzibar, Tanzania
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="info-content">
                    <h5>Phone Numbers</h5>
                    <p>
                      Main Office: +255 24 223 4511
                      <br />
                      Project Office: +255 24 223 4512
                      <br />
                      Fax: +255 24 223 4513
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h5>Email Addresses</h5>
                    <p>
                      General Inquiries: tasfam@blueeconomysmz.go.tz
                      <br />
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div className="info-content">
                    <h5>Office Hours</h5>
                    <p>
                      Monday - Friday: 8:00 AM - 4:00 PM
                      <br />
                      Saturday: 8:00 AM - 12:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="social-contact mt-4">
                  <h5>Follow Us</h5>
                  <div className="social-links">
                    <a href="#" target="_blank" title="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" target="_blank" title="Twitter">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="#" target="_blank" title="YouTube">
                      <i className="bi bi-youtube"></i>
                    </a>
                    <a href="#" target="_blank" title="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <ContactForm />
            </div>
          </div>

          {/* Map Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="map-container">
                <h3 className="mb-4">Find Us</h3>
                <div className="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127271.55883869!2d39.16988!3d-6.1659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd0ba23b33fe7%3A0x3b0e8b2c3d0b5f3f!2sZanzibar%20City%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1704200000000!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '10px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
