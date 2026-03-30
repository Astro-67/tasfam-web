import Link from 'next/link';
import { getMonitoringKPIs, getMEComponents, getMEReports } from '@/lib/db';

const fallbackKPIs = [
  { icon: 'bi-graph-up', value: '85%', label: 'Project Completion Rate', progress: 85, color: '' },
  { icon: 'bi-people', value: '5,000+', label: 'Beneficiaries Reached', progress: 90, color: 'bg-success' },
  { icon: 'bi-mortarboard', value: '120', label: 'Training Sessions', progress: 75, color: 'bg-info' },
  { icon: 'bi-award', value: '92%', label: 'Stakeholder Satisfaction', progress: 92, color: 'bg-warning' },
];

const fallbackComponents = [
  { icon: 'bi-clipboard-data', title: 'Data Collection', items: ['SAMAKI digital monitoring system', 'Quarterly field surveys', 'Beneficiary feedback forms', 'Fish landing site monitoring'] },
  { icon: 'bi-bar-chart-line', title: 'Analysis & Reporting', items: ['Monthly progress reports', 'Quarterly indicator tracking', 'Annual impact assessments', 'Real-time dashboards'] },
  { icon: 'bi-lightbulb', title: 'Learning & Adaptation', items: ['Lessons learned documentation', 'Best practice sharing', 'Adaptive management reviews', 'Knowledge management'] },
];

const fallbackReports = [
  { title: 'Q4 2025 Progress Report', period: 'Oct - Dec 2025', type: 'Quarterly', badge: 'bg-primary' },
  { title: 'Annual Impact Assessment 2025', period: 'Jan - Dec 2025', type: 'Annual', badge: 'bg-success' },
  { title: 'Mid-Term Review Report', period: '2023 - 2025', type: 'Special', badge: 'bg-info' },
  { title: 'Q3 2025 Progress Report', period: 'Jul - Sep 2025', type: 'Quarterly', badge: 'bg-primary' },
];

export default async function MonitoringPage() {
  let kpis = fallbackKPIs;
  let components = fallbackComponents;
  let reports = fallbackReports;

  try {
    const kpiRes = await getMonitoringKPIs();
    if (Array.isArray(kpiRes.data) && kpiRes.data.length > 0) {
      kpis = kpiRes.data.map((k: Record<string, unknown>) => ({
        icon: (k as { icon?: string }).icon || 'bi-graph-up',
        value: (k as { value?: string }).value || '',
        label: (k as { label?: string }).label || '',
        progress: (k as { progress?: number }).progress || 0,
        color: (k as { color?: string }).color || '',
      }));
    }
  } catch { /* fallback */ }

  try {
    const compRes = await getMEComponents();
    if (Array.isArray(compRes.data) && compRes.data.length > 0) {
      components = compRes.data.map((c: Record<string, unknown>) => ({
        icon: (c as { icon?: string }).icon || 'bi-clipboard-data',
        title: (c as { title?: string }).title || '',
        items: (c as { items?: string[] }).items || [],
      }));
    }
  } catch { /* fallback */ }

  try {
    const repRes = await getMEReports();
    if (Array.isArray(repRes.data) && repRes.data.length > 0) {
      reports = repRes.data.map((r: Record<string, unknown>) => ({
        title: (r as { title?: string }).title || '',
        period: (r as { period?: string }).period || '',
        type: (r as { type?: string }).type || 'Report',
        badge: (r as { badge?: string }).badge || 'bg-primary',
      }));
    }
  } catch { /* fallback */ }

  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Monitoring &amp; Evaluation</h1>
                <p className="mb-0">
                  Tracking progress, measuring impact, and ensuring accountability in all TASFAM
                  project activities.
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
              <li className="current">Monitoring &amp; Evaluation</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* M&E Section */}
      <section id="monitoring-content" className="section-padding">
        <div className="container">
          {/* M&E Framework Overview */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-heading">Our M&amp;E Framework</h2>
              <p className="section-desc">
                The TASFAM Monitoring and Evaluation framework ensures systematic tracking of project
                outputs, outcomes, and impacts to support evidence-based decision making and adaptive
                management.
              </p>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="row g-4 mb-5">
            {kpis.map((kpi, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="kpi-card">
                  <div className="kpi-icon">
                    <i className={`bi ${kpi.icon}`}></i>
                  </div>
                  <h3 className="kpi-value">{kpi.value}</h3>
                  <p className="kpi-label">{kpi.label}</p>
                  <div className="progress">
                    <div
                      className={`progress-bar ${kpi.color}`}
                      role="progressbar"
                      style={{ width: `${kpi.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* M&E Components */}
          <div className="row g-4 mb-5">
            {components.map((comp, index) => (
              <div key={index} className="col-lg-4">
                <div className="me-component-card">
                  <div className="component-icon">
                    <i className={`bi ${comp.icon}`}></i>
                  </div>
                  <h4>{comp.title}</h4>
                  <ul>
                    {comp.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Reports */}
          <div className="row">
            <div className="col-12">
              <h3 className="mb-4">Recent M&amp;E Reports</h3>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Report Title</th>
                      <th>Period</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index}>
                        <td>{report.title}</td>
                        <td>{report.period}</td>
                        <td>
                          <span className={`badge ${report.badge}`}>{report.type}</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-download"></i> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
