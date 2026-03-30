import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Page Title */}
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: 'url(/img/page-title-bg.webp)' }}
      >
        <div className="container position-relative">
          <h1>About TASFAM</h1>
          <p>Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management Project</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">About</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h2>Project Overview</h2>
              <p>
                The Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management
                (TASFAM) Project is a World Bank-funded initiative aimed at improving the management
                of marine fisheries resources and developing sustainable aquaculture in Tanzania.
              </p>
              <p>
                TASFAM builds upon the achievements of the South West Indian Ocean Fisheries
                Governance and Shared Growth Project (tasfam) and expands its scope to include
                aquaculture development and enhanced marine resource management across both Tanzania
                Mainland and Zanzibar.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h2>Project Development Objective (PDO)</h2>
              <p>
                To improve the management of targeted marine fisheries and increase access to
                livelihood activities in selected coastal communities in Tanzania.
              </p>
              <h3 className="mt-4">Key Focus Areas:</h3>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Strengthening fisheries
                  governance and institutional capacity
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Enhancing marine fisheries
                  management and conservation
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Promoting sustainable
                  aquaculture development
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Supporting coastal
                  community livelihoods
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Improving fisheries data
                  collection and monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Background Section */}
      <section id="background" className="section light-background">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Project Background</h2>
            <p>Building on tasfam Success</p>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h4>
                    <i className="bi bi-calendar-check text-primary me-2"></i>Project Duration
                  </h4>
                  <p>
                    TASFAM is implemented over a multi-year period with phased activities designed to
                    achieve sustainable outcomes in fisheries management and aquaculture development.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h4>
                    <i className="bi bi-geo-alt text-primary me-2"></i>Geographic Coverage
                  </h4>
                  <p>
                    The project covers coastal areas of Tanzania Mainland and Zanzibar, targeting key
                    fishing communities and marine ecosystems in the Western Indian Ocean region.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 p-4">
                <div className="card-body">
                  <h4>
                    <i className="bi bi-people text-primary me-2"></i>Beneficiaries
                  </h4>
                  <p>
                    Coastal fishing communities, fish processors, aquaculture farmers, fisheries
                    cooperatives, and related value chain actors across Tanzania.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementing Agencies Section */}
      <section id="agencies" className="section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Implementing Agencies</h2>
            <p>Government Partners</p>
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <i className="bi bi-building text-primary" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mt-3">Ministry of Livestock and Fisheries</h4>
                  <p className="text-muted">Tanzania Mainland</p>
                  <p>
                    Responsible for overall project coordination and implementation on the Mainland,
                    including policy development and fisheries management.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <i className="bi bi-building text-primary" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mt-3">Ministry of Blue Economy and Fisheries</h4>
                  <p className="text-muted">Zanzibar</p>
                  <p>
                    Leads project implementation in Zanzibar, focusing on sustainable blue economy
                    development and marine resource management.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <i className="bi bi-globe text-primary" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mt-3">Deep Sea Fishing Authority</h4>
                  <p className="text-muted">DSFA</p>
                  <p>
                    Manages deep-sea fishing activities and ensures sustainable exploitation of
                    Tanzania&apos;s Exclusive Economic Zone (EEZ) resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Bank Support Section */}
      <section id="worldbank" className="section light-background">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h2>World Bank Support</h2>
              <p>
                TASFAM is funded by the World Bank as part of its commitment to supporting sustainable
                fisheries management and blue economy development in the Western Indian Ocean region.
              </p>
              <p>
                The project aligns with Tanzania&apos;s national development priorities and the World
                Bank&apos;s strategy for sustainable development of marine resources in Africa.
              </p>
              <h4 className="mt-4">Project Financing:</h4>
              <ul>
                <li>
                  <i className="bi bi-check2 text-primary"></i> International Development Association
                  (IDA) Credit
                </li>
                <li>
                  <i className="bi bi-check2 text-primary"></i> Government of Tanzania Contribution
                </li>
                <li>
                  <i className="bi bi-check2 text-primary"></i> Beneficiary Contributions
                </li>
              </ul>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h2>Expected Outcomes</h2>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Improved
                  fisheries governance and regulatory frameworks
                </li>
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Enhanced fish
                  stock monitoring and data management systems
                </li>
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Increased
                  aquaculture production and productivity
                </li>
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Strengthened
                  community-based fisheries management
                </li>
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Improved
                  livelihoods for coastal communities
                </li>
                <li className="mb-3">
                  <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i> Reduced illegal,
                  unreported, and unregulated (IUU) fishing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
