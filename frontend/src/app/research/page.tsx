import Link from 'next/link';
import { getPublications } from '@/lib/db';

const fallbackPublications = [
  { category: 'Technical Report', title: 'Zanzibar Fisheries Stock Assessment Report 2025', desc: "Comprehensive analysis of fish stock levels and recommendations for sustainable catch limits in Zanzibar waters.", date: 'December 2025', size: 'PDF, 2.4 MB' },
  { category: 'Research Paper', title: 'Impact of Climate Change on Coastal Fisheries', desc: 'Study examining the effects of changing ocean temperatures on fish migration patterns and catch volumes.', date: 'November 2025', size: 'PDF, 1.8 MB' },
  { category: 'Policy Brief', title: 'Marine Protected Areas Management Guidelines', desc: "Guidelines for establishing and managing marine protected areas in Zanzibar's territorial waters.", date: 'October 2025', size: 'PDF, 890 KB' },
  { category: 'Annual Report', title: 'TASFAM Project Annual Report 2024', desc: 'Comprehensive overview of project achievements, challenges, and financial summary for fiscal year 2024.', date: 'March 2025', size: 'PDF, 5.2 MB' },
  { category: 'Research Paper', title: 'Octopus Fishery Management: A Case Study', desc: 'Analysis of community-based octopus closure management and its impact on stock recovery.', date: 'September 2025', size: 'PDF, 1.2 MB' },
  { category: 'Technical Manual', title: 'SAMAKI Data Collection System User Guide', desc: 'Comprehensive user manual for the SAMAKI fisheries data collection and reporting system.', date: 'August 2025', size: 'PDF, 3.1 MB' },
];

export default async function ResearchPage() {
  let publications = fallbackPublications;

  try {
    const res = await getPublications();
    if (Array.isArray(res.data) && res.data.length > 0) {
      publications = res.data.map((p: Record<string, unknown>) => ({
        category: (p as { category?: string }).category || 'Report',
        title: (p as { title?: string }).title || '',
        desc: (p as { description?: string }).description || '',
        date: (p as { publish_date?: string }).publish_date || '',
        size: (p as { file_size?: string }).file_size || 'PDF',
      }));
    }
  } catch {
    // Use fallback
  }

  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Research &amp; Publication</h1>
                <p className="mb-0">
                  Access scientific research, technical reports, and publications supporting
                  sustainable fisheries management in Zanzibar.
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
              <li className="current">Research &amp; Publication</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Research Section */}
      <section id="research-content" className="section-padding">
        <div className="container">
          {/* Search and Filter */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="search-box">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search publications..."
                  />
                  <button className="btn btn-primary" type="button">
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="row g-4">
            {publications.map((pub, index) => (
              <div key={index} className="col-lg-6">
                <div className="publication-card">
                  <div className="pub-icon">
                    <i className="bi bi-file-earmark-pdf"></i>
                  </div>
                  <div className="pub-content">
                    <span className="pub-category">{pub.category}</span>
                    <h5>{pub.title}</h5>
                    <p>{pub.desc}</p>
                    <div className="pub-meta">
                      <span>
                        <i className="bi bi-calendar"></i> {pub.date}
                      </span>
                      <span>
                        <i className="bi bi-file-earmark"></i> {pub.size}
                      </span>
                    </div>
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-download"></i> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row mt-5">
            <div className="col-12">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
