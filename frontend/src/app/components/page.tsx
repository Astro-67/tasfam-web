import Link from 'next/link';
import { getProjectComponents } from '@/lib/db';

const fallbackProjects = [
  { icon: 'bi-water', title: 'Marine Resource Management', desc: "Implementing sustainable fishing practices and marine conservation strategies to protect the rich biodiversity of Zanzibar's waters." },
  { icon: 'bi-people', title: 'Community Fisheries', desc: 'Empowering local fishing communities through training, equipment support, and sustainable livelihood programs.' },
  { icon: 'bi-graph-up-arrow', title: 'Blue Economy Development', desc: 'Promoting economic growth through sustainable ocean-based industries and value chain development.' },
  { icon: 'bi-shield-check', title: 'Fisheries Governance', desc: 'Strengthening regional cooperation and governance frameworks for effective fisheries management.' },
  { icon: 'bi-clipboard-data', title: 'Data & Monitoring Systems', desc: 'Implementing SAMAKI and other digital systems for comprehensive fisheries data collection and analysis.' },
  { icon: 'bi-globe-asia-australia', title: 'Regional Cooperation', desc: 'Collaborating with SWIO countries for shared fisheries management and transboundary resource conservation.' },
];

const stats = [
  { value: '15+', label: 'Active Projects' },
  { value: '50+', label: 'Communities Reached' },
  { value: '1000+', label: 'Fishers Trained' },
  { value: '$10M+', label: 'Investment' },
];

export default async function ComponentsPage() {
  let projects = fallbackProjects;

  try {
    const res = await getProjectComponents();
    if (Array.isArray(res.data) && res.data.length > 0) {
      projects = res.data.map((p: Record<string, unknown>) => ({
        icon: (p as { icon?: string }).icon || 'bi-water',
        title: (p as { title?: string }).title || '',
        desc: (p as { description?: string }).description || '',
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
                <h1>Our Projects</h1>
                <p className="mb-0">
                  Discover the initiatives and programs driving sustainable fisheries development in
                  Zanzibar and the Western Indian Ocean region.
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
              <li className="current">Projects</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Projects Section */}
      <section id="projects-content" className="section-padding">
        <div className="container">
          <div className="row g-4 mb-5">
            {projects.map((project, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="project-card">
                  <div className="project-icon">
                    <i className={`bi ${project.icon}`}></i>
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.desc}</p>
                  <a href="#" className="btn btn-outline-primary btn-sm">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Project Statistics */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="stats-section">
                <div className="row text-center">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-md-3 col-6 mb-4">
                      <div className="stat-item">
                        <h2 className="stat-number">{stat.value}</h2>
                        <p className="stat-label">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
