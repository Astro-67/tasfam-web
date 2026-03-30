import Link from 'next/link';
import NewsletterForm from '@/components/shared/NewsletterForm';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/stakeholders', label: 'Stakeholders' },
  { href: '/research', label: 'Research' },
  { href: '/monitoring', label: 'M & E' },
  { href: '/archives', label: 'Archives' },
];

export default function Footer() {
  return (
    <footer id="footer" className="footer tasfam-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">

            {/* Column 1: About TASFAM */}
            <div className="col-lg-4 col-md-6 footer-about">
              <div className="footer-logo">
                <img src="/images/logo.png" alt="TASFAM Logo" />
                <h3>TASFAM Zanzibar</h3>
              </div>
              <p>
                The South West Indian Ocean Fisheries Governance and Shared Growth Project aims to
                improve regional cooperation and sustainable fisheries management in the Western
                Indian Ocean region.
              </p>
              <div className="footer-tags">
                <span className="tag">Fisheries</span>
                <span className="tag">Conservation</span>
                <span className="tag">Blue Economy</span>
                <span className="tag">Sustainable</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <i className="bi bi-chevron-right"></i>{' '}
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <i className="bi bi-geo-alt"></i>
                <div>
                  <p>Department of Fisheries Development</p>
                  <p>P.O. Box 774, Zanzibar, Tanzania</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone"></i>
                <div>
                  <p>+255 24 223 4511</p>
                  <p>+255 24 223 4512</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope"></i>
                <div>
                  <p>tasfam@blueeconomysmz.go.tz</p>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter & Social */}
            <div className="col-lg-3 col-md-6 footer-newsletter">
              <h4>Stay Connected</h4>
              <p>Subscribe to our newsletter for the latest updates on TASFAM activities.</p>
              <NewsletterForm />
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
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">&copy; 2026 TASFAM Zanzibar. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-partners">
                <span>Supported by:</span>
                <span className="partner">World Bank</span>
                <span className="partner">Government of Tanzania</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
