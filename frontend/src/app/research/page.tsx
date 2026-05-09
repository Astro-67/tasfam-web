import Link from 'next/link';
import { getPublications } from '@/lib/db';

const fallbackPublications = [
  { category: 'Technical Report', title: 'Zanzibar Fisheries Stock Assessment Report 2025', desc: "Comprehensive analysis of fish stock levels and recommendations for sustainable catch limits in Zanzibar waters.", date: 'December 2025', size: 'PDF, 2.4 MB', file: '' },
  { category: 'Research Paper', title: 'Impact of Climate Change on Coastal Fisheries', desc: 'Study examining the effects of changing ocean temperatures on fish migration patterns and catch volumes.', date: 'November 2025', size: 'PDF, 1.8 MB', file: '' },
  { category: 'Policy Brief', title: 'Marine Protected Areas Management Guidelines', desc: "Guidelines for establishing and managing marine protected areas in Zanzibar's territorial waters.", date: 'October 2025', size: 'PDF, 890 KB', file: '' },
  { category: 'Annual Report', title: 'TASFAM Project Annual Report 2024', desc: 'Comprehensive overview of project achievements, challenges, and financial summary for fiscal year 2024.', date: 'March 2025', size: 'PDF, 5.2 MB', file: '' },
  { category: 'Research Paper', title: 'Octopus Fishery Management: A Case Study', desc: 'Analysis of community-based octopus closure management and its impact on stock recovery.', date: 'September 2025', size: 'PDF, 1.2 MB', file: '' },
  { category: 'Technical Manual', title: 'SAMAKI Data Collection System User Guide', desc: 'Comprehensive user manual for the SAMAKI fisheries data collection and reporting system.', date: 'August 2025', size: 'PDF, 3.1 MB', file: '' },
];

const PAGE_SIZE = 6;

export default async function ResearchPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const requestedPage = Math.max(1, parseInt(sp?.page || '1', 10) || 1);

  let publications = fallbackPublications;
  let pageCount = 1;
  let currentPage = 1;
  let usingFallback = true;

  try {
    const res = await getPublications(requestedPage, PAGE_SIZE);
    if (Array.isArray(res.data) && res.data.length > 0) {
      publications = res.data.map((p: Record<string, unknown>) => {
        const row = p as {
          category?: string;
          title?: string;
          description?: string;
          publishDate?: string | Date;
          fileSize?: string;
          file?: string;
        };
        const dateStr = row.publishDate
          ? new Date(row.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
          : '';
        return {
          category: row.category || 'Report',
          title: row.title || '',
          desc: row.description || '',
          date: dateStr,
          size: row.fileSize || 'PDF',
          file: row.file || '',
        };
      });
      pageCount = res.meta?.pagination?.pageCount || 1;
      currentPage = res.meta?.pagination?.page || requestedPage;
      usingFallback = false;
    }
  } catch {
    // Use fallback
  }

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < pageCount;

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
                    {pub.file ? (
                      <a href={pub.file} target="_blank" rel="noopener noreferrer" download className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-download"></i> Download
                      </a>
                    ) : (
                      <button type="button" className="btn btn-sm btn-outline-secondary" disabled>
                        <i className="bi bi-download"></i> Unavailable
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!usingFallback && pageCount > 1 && (
            <div className="row mt-5">
              <div className="col-12">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${hasPrev ? '' : 'disabled'}`}>
                      <Link className="page-link" href={hasPrev ? `/research?page=${currentPage - 1}` : '#'}>
                        Previous
                      </Link>
                    </li>
                    {pageNumbers.map((n) => (
                      <li key={n} className={`page-item ${n === currentPage ? 'active' : ''}`}>
                        <Link className="page-link" href={`/research?page=${n}`}>
                          {n}
                        </Link>
                      </li>
                    ))}
                    <li className={`page-item ${hasNext ? '' : 'disabled'}`}>
                      <Link className="page-link" href={hasNext ? `/research?page=${currentPage + 1}` : '#'}>
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
