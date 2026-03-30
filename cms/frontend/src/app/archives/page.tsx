import Link from 'next/link';
import { getArchiveItems } from '@/lib/db';

const fallbackCategories = [
  { icon: 'bi-folder2-open', title: 'Policy Documents', desc: 'Fisheries policies, regulations, and legal frameworks', count: '45 Documents' },
  { icon: 'bi-database', title: 'Statistical Data', desc: 'Historical catch data, surveys, and statistics', count: '120+ Datasets' },
  { icon: 'bi-images', title: 'Photo Gallery', desc: 'Historical and project documentation photos', count: '500+ Photos' },
  { icon: 'bi-camera-video', title: 'Video Archives', desc: 'Documentary and training videos', count: '30 Videos' },
];

const fallbackItems = [
  { icon: 'bi-file-earmark-text', title: 'Zanzibar Fisheries Policy 2020', desc: 'National fisheries policy framework for sustainable development', year: '2020', tag: 'Policy' },
  { icon: 'bi-table', title: 'Fish Landing Statistics 2015-2024', desc: 'Comprehensive fish landing data across all landing sites', year: '2024', tag: 'Statistics' },
  { icon: 'bi-map', title: 'Marine Protected Areas Map Collection', desc: 'Historical and current MPA boundary maps', year: '2023', tag: 'Maps' },
  { icon: 'bi-journal-text', title: 'Fisheries Development Reports 2010-2020', desc: 'Annual reports documenting sector development', year: '2020', tag: 'Reports' },
  { icon: 'bi-camera', title: 'Historical Fishing Community Photos', desc: 'Photo collection documenting fishing traditions', year: '1990-2020', tag: 'Photos' },
  { icon: 'bi-play-circle', title: 'TASFAM Project Documentary', desc: 'Documentary video on project achievements', year: '2024', tag: 'Video' },
];

export default async function ArchivesPage() {
  let items = fallbackItems;

  try {
    const res = await getArchiveItems();
    if (Array.isArray(res.data) && res.data.length > 0) {
      items = res.data.map((a: Record<string, unknown>) => ({
        icon: (a as { icon?: string }).icon || 'bi-file-earmark-text',
        title: (a as { title?: string }).title || '',
        desc: (a as { description?: string }).description || '',
        year: (a as { year?: string }).year || '',
        tag: (a as { tag?: string }).tag || 'Document',
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
                <h1>Fisheries Archives</h1>
                <p className="mb-0">
                  Access historical fisheries data, policy documents, and archival materials from
                  Zanzibar&apos;s fisheries sector.
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
              <li className="current">Fisheries Archives</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Archives Section */}
      <section id="archives-content" className="section-padding">
        <div className="container">
          {/* Archive Categories */}
          <div className="row g-4 mb-5">
            {fallbackCategories.map((cat, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="archive-category-card">
                  <div className="archive-icon">
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  <h5>{cat.title}</h5>
                  <p>{cat.desc}</p>
                  <span className="item-count">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Archives */}
          <div className="row">
            <div className="col-12">
              <h3 className="mb-4">Browse Archives</h3>
            </div>
          </div>

          <div className="row g-4">
            {items.map((item, index) => (
              <div key={index} className="col-lg-6">
                <div className="archive-item">
                  <div className="archive-item-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div className="archive-item-content">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                    <div className="archive-meta">
                      <span>
                        <i className="bi bi-calendar"></i> {item.year}
                      </span>
                      <span>
                        <i className="bi bi-tag"></i> {item.tag}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye"></i> View
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <a href="#" className="btn btn-primary btn-lg">
                Load More Archives
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
