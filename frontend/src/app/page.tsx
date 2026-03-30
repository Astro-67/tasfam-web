import Link from 'next/link';
import { getHeroSlides, getNewsItems, getImplementingPartners } from '@/lib/db';
import HeroCarousel from '@/components/home/HeroCarousel';

const fallbackSlides = [
  { image: '/img/hero_1.jpg', caption: 'Operational Manager wa Benk ya Dunia Bibi Preeti Arora akipata fursa ya kutembelea Wizara ya Uchumi wa Blue na Uvuvi na kuzungumza na wasimamizi wa Mradi wa TASFAM Zanzibar' },
  { image: '/img/hero_2.jpg', caption: 'Aliyekua Msimamizi Mkuu wa Mradi wa tasfam Tanzania akimkabidhi Mkuu mpya usimamizi wa Mradi wa TASFAM Tanzania Enos E. Esikuri' },
  { image: '/img/hero_3.jpg', caption: 'Mkurugenzi wa Idara ya Maendeleo ya Uvuvi na Mazao ya Baharini Ndugu Mussa akifungua kikao cha Mafunzo ya mfumo mpya wa Uchukuaaji wa Takwimu(SAMAKIs)' },
  { image: '/img/hero_4.jpg', caption: 'Wananchi wa Kijiji cha Michamvi wakifurahia Ufunguaji wa Pweza katika Ufunguzi Pweza' },
  { image: '/img/hero_5.jpg', caption: 'Wafugaji wa Majongoo Bahari Sea cucumber' },
];

const fallbackNews = [
  { image: '/img/blog/blog-1.jpg', date: 'Jan 02', title: 'World Bank Delegation Visits TASFAM Zanzibar Project' },
  { image: '/img/blog/blog-2.jpg', date: 'Dec 28', title: 'SAMAKI Data Collection System Training Launched' },
  { image: '/img/blog/blog-3.jpg', date: 'Dec 20', title: 'Michamvi Village Celebrates Octopus Fishing Season Opening' },
];

const fallbackPartners: { name: string; icon: string; link?: string; logo?: string }[] = [
  { name: 'MINISTRY OF LIVESTOCK AND FISHERIES (MAINLAND)', icon: 'bi-building', link: 'https://www.mifugouvuvi.go.tz', logo: '/images/agencies/mlf-logo.png' },
  { name: 'MINISTRY OF BLUE ECONOMY AND FISHERIES (ZANZIBAR)', logo: '/images/smz-logo.jpeg', icon: 'bi-water' },
  { name: 'DEEP SEA FISHING AUTHORITY (DSFA)', icon: 'bi-globe', logo: '/images/agencies/dsfa-logo.png' },
];

const monitoringCards = [
  { icon: 'bi-bar-chart-line', title: 'Takwimu za Uvuvi', desc: 'Ukusanyaji na uchambuzi wa takwimu za uvuvi na samaki wanaovuliwa.' },
  { icon: 'bi-geo-alt', title: 'Ufuatiliaji wa GPS', desc: 'Teknolojia ya kisasa ya kufuatilia vyombo vya uvuvi na maeneo ya uvuvi.' },
  { icon: 'bi-clipboard-data', title: 'Ripoti za Mwezi', desc: 'Maandalizi ya ripoti za kila mwezi kuhusu hali ya uvuvi na mazingira.' },
  { icon: 'bi-shield-check', title: 'Usimamizi wa Rasilimali', desc: 'Kuhakikisha matumizi endelevu ya rasilimali za bahari na uvuvi.' },
  { icon: 'bi-people', title: 'Ushirikiano na Wavuvi', desc: 'Programu za kushirikisha wavuvi wadogo katika uhifadhi wa mazingira.' },
  { icon: 'bi-graph-up-arrow', title: 'Tathmini ya Matokeo', desc: 'Uchambuzi wa athari za miradi yetu kwa jamii za wavuvi.' },
];

export default async function HomePage() {
  let slides = fallbackSlides;
  let news = fallbackNews;
  let partners = fallbackPartners;

  try {
    const slidesRes = await getHeroSlides();
    if (Array.isArray(slidesRes.data) && slidesRes.data.length > 0) {
      slides = slidesRes.data.map((s: Record<string, unknown>) => ({
        image: (s as { image?: string }).image || '/img/hero_1.jpg',
        caption: (s as { caption?: string }).caption || '',
      }));
    }
  } catch {
    // Use fallback slides
  }

  try {
    const newsRes = await getNewsItems();
    if (Array.isArray(newsRes.data) && newsRes.data.length > 0) {
      news = newsRes.data.map((n: Record<string, unknown>) => ({
        image: (n as { image?: string }).image || '/img/blog/blog-1.jpg',
        date: (n as { date?: string }).date || '',
        title: (n as { title?: string }).title || '',
      }));
    }
  } catch {
    // Use fallback news
  }

  try {
    const partnersRes = await getImplementingPartners();
    if (Array.isArray(partnersRes.data) && partnersRes.data.length > 0) {
      partners = partnersRes.data.map((p: Record<string, unknown>) => ({
        name: (p as { name?: string }).name || '',
        icon: (p as { icon?: string }).icon || 'bi-building',
        link: (p as { link?: string }).link,
        logo: (p as { logo?: string }).logo,
      }));
    }
  } catch {
    // Use fallback partners
  }

  return (
    <>
      {/* Hero Section */}
      <HeroCarousel slides={slides} />

      {/* Welcome Section */}
      <section id="welcome" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h2 className="welcome-title">
                TANZANIA SCALING-UP SUSTAINABLE MARINE FISHERIES AND AQUACULTURE MANAGEMENT (TASFAM)
              </h2>
              <p className="welcome-text">
                The Ministry of Livestock and Fisheries (Mainland) and Ministry of Blue Economy and
                Fisheries (Zanzibar) through the Ministry of Finance have requested support from the
                World Bank to support the development and implementation of the Tanzania Scaling-up
                Sustainable Marine Fisheries and Aquaculture Management Project (TASFAM).
              </p>
              <p className="welcome-text">
                The Project development objective is to improve the management effectiveness of
                selected priority fisheries at regional, national and community level. The project
                supports sustainable fisheries management, strengthens sector governance, and promotes
                shared growth through harnessing the value of coastal and marine fisheries to national
                economies.
              </p>
              <div className="text-center">
                <Link href="/about" className="btn btn-primary mt-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Map Combined Section */}
      <section id="news-map" className="news-map-section">
        <div className="container">
          <div className="row">
            {/* News Column */}
            <div className="col-lg-7">
              <h2 className="section-heading">NEWS &amp; EVENTS</h2>
              <div className="news-compact-list">
                {news.map((item, index) => (
                  <div key={index} className="news-compact-item">
                    <div className="news-thumb">
                      <img src={item.image} alt={item.title} />
                      <span className="news-date-badge">{item.date}</span>
                    </div>
                    <div className="news-compact-content">
                      <h5 className="news-compact-title">{item.title}</h5>
                      <a href="#" className="news-link">
                        Read More <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map Column */}
            <div className="col-lg-5">
              <h2 className="section-heading">TASFAM EEZ MAP</h2>
              <div className="map-compact">
                <a href="/images/eez-map.jpg" className="glightbox" data-gallery="eez-map">
                  <img
                    src="/images/eez-map.jpg"
                    alt="TASFAM Exclusive Economic Zone Map"
                    className="map-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementing Partners Section */}
      <section id="partners" className="section-padding">
        <div className="container">
          <h2 className="welcome-title">IMPLEMENTING PARTNERS</h2>
          <div className="row g-4">
            {partners.map((partner, index) => (
              <div key={index} className="col-md-4">
                <div className="agency-card">
                  <div className="agency-logo">
                    {partner.logo && (
                      <img src={partner.logo} alt={partner.name} />
                    )}
                    <div
                      className="agency-icon-placeholder"
                      style={{ display: partner.logo ? 'none' : 'flex' }}
                    >
                      <i className={`bi ${partner.icon}`}></i>
                    </div>
                  </div>
                  <h5 className="agency-name">{partner.name}</h5>
                  <a
                    href={partner.link || '#'}
                    target="_blank"
                    className="agency-link"
                    rel="noreferrer"
                  >
                    Visit Website <i className="bi bi-box-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring & Evaluation Section */}
      <section id="monitoring" className="monitoring-section section dark-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>UFUATILIAJI NA TATHMINI</h2>
          <p>Monitoring &amp; Evaluation</p>
        </div>

        <div className="container">
          <div className="row g-4">
            {monitoringCards.map((card, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={String((index + 1) * 100)}
              >
                <div className="monitoring-card">
                  <div className="icon-box">
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-section section">
        <div className="container">
          <div className="newsletter-content text-center">
            <h2>Stay Updated with TASFAM Zanzibar</h2>
            <p>
              Subscribe to receive the latest news, updates, and publications about fisheries
              development and marine resources management in Zanzibar.
            </p>
            <form className="newsletter-form-main">
              <div className="form-group d-flex align-items-stretch justify-content-center">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit" className="btn btn-subscribe-main">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
