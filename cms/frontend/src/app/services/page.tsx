import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      {/* Page Title */}
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: 'url(/img/page-title-bg.webp)' }}
      >
        <div className="container position-relative">
          <h1>Services</h1>
          <p>Home / Services</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">Services</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>SERVICES</h2>
          <p>Coming Soon</p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="py-5">
                <i
                  className="bi bi-gear text-primary"
                  style={{ fontSize: '4rem' }}
                ></i>
                <h3 className="mt-4">This Section Is Under Development</h3>
                <p className="text-muted mt-3">
                  We are currently working on this section to bring you detailed information about
                  TASFAM services. Please check back soon for updates on our fisheries management
                  services, aquaculture support programs, and community development initiatives.
                </p>
                <Link href="/" className="btn btn-primary mt-3">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
