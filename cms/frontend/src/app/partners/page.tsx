import Link from 'next/link';
import { getStakeholders } from '@/lib/db';

const fallbackGovernment = [
  { icon: 'bi-building-fill', name: 'Ministry of Blue Economy and Fisheries', desc: "Zanzibar's lead ministry responsible for fisheries policy and marine resource management.", role: 'Lead Implementing Agency' },
  { icon: 'bi-building-fill', name: 'Ministry of Livestock and Fisheries - Tanzania', desc: 'National ministry coordinating fisheries development across mainland Tanzania.', role: 'Partner Agency' },
  { icon: 'bi-water', name: 'Deep Sea Fishing Authority', desc: 'Authority managing deep sea fishing licenses and offshore marine resources.', role: 'Regulatory Partner' },
];

const fallbackInternational = [
  { icon: 'bi-bank', name: 'World Bank', desc: 'Primary funding partner supporting the TASFAM project through technical and financial assistance.', role: 'Funding Partner' },
  { icon: 'bi-globe-asia-australia', name: 'Indian Ocean Commission', desc: 'Regional organization coordinating fisheries cooperation among Indian Ocean states.', role: 'Regional Coordinator' },
  { icon: 'bi-flag', name: 'FAO - Food and Agriculture Organization', desc: 'UN agency providing technical guidance on sustainable fisheries practices.', role: 'Technical Partner' },
];

const fallbackCommunity = [
  { icon: 'bi-people-fill', name: 'Beach Management Units (BMUs)', desc: 'Community-based organizations managing local fishing grounds and resources.', role: 'Community Partners' },
  { icon: 'bi-life-preserver', name: 'Fishermen Cooperatives', desc: 'Organized groups of fishers working together for sustainable livelihoods.', role: 'Beneficiary Groups' },
  { icon: 'bi-gender-female', name: 'Women in Fisheries Groups', desc: "Organizations supporting women's participation in fisheries value chains.", role: 'Gender Inclusion Partners' },
];

export default async function PartnersPage() {
  let government = fallbackGovernment;
  let international = fallbackInternational;
  let community = fallbackCommunity;

  try {
    const res = await getStakeholders();
    if (Array.isArray(res.data) && res.data.length > 0) {
      // If Strapi data available, categorize stakeholders
      const govData = res.data.filter((s: Record<string, unknown>) => (s as { category?: string }).category === 'government');
      const intlData = res.data.filter((s: Record<string, unknown>) => (s as { category?: string }).category === 'international');
      const commData = res.data.filter((s: Record<string, unknown>) => (s as { category?: string }).category === 'community');
      if (govData.length > 0) government = govData.map((s: Record<string, unknown>) => ({ icon: (s as { icon?: string }).icon || 'bi-building', name: (s as { name?: string }).name || '', desc: (s as { description?: string }).description || '', role: (s as { role?: string }).role || '' }));
      if (intlData.length > 0) international = intlData.map((s: Record<string, unknown>) => ({ icon: (s as { icon?: string }).icon || 'bi-globe', name: (s as { name?: string }).name || '', desc: (s as { description?: string }).description || '', role: (s as { role?: string }).role || '' }));
      if (commData.length > 0) community = commData.map((s: Record<string, unknown>) => ({ icon: (s as { icon?: string }).icon || 'bi-people', name: (s as { name?: string }).name || '', desc: (s as { description?: string }).description || '', role: (s as { role?: string }).role || '' }));
    }
  } catch {
    // Use fallback
  }

  const categories = [
    { title: 'Government Partners', icon: 'bi-building', items: government },
    { title: 'International Partners', icon: 'bi-globe', items: international },
    { title: 'Community Partners', icon: 'bi-people', items: community },
  ];

  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Our Stakeholders</h1>
                <p className="mb-0">
                  Meet the partners and organizations working together to achieve sustainable
                  fisheries management in Zanzibar and the Western Indian Ocean region.
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
              <li className="current">Stakeholders</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Stakeholders Section */}
      <section id="stakeholders-content" className="section-padding">
        <div className="container">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="stakeholder-category mb-5">
              <h3 className="category-title">
                <i className={`bi ${category.icon}`}></i> {category.title}
              </h3>
              <div className="row g-4">
                {category.items.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <div className="stakeholder-card">
                      <div className="stakeholder-logo">
                        <i className={`bi ${item.icon}`}></i>
                      </div>
                      <h5>{item.name}</h5>
                      <p>{item.desc}</p>
                      <span className="stakeholder-role">{item.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
