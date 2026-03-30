import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // --- Admin User ---
  const hashedPassword = await hash('admin123', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@tasfam.go.tz' },
    update: {},
    create: {
      email: 'admin@tasfam.go.tz',
      password: hashedPassword,
    },
  });
  console.log('Admin user created');

  // --- Hero Slides ---
  const heroSlides = [
    {
      image: '/img/hero_1.jpg',
      caption:
        'Operational Manager wa Benk ya Dunia Bibi Preeti Arora akipata fursa ya kutembelea Wizara ya Uchumi wa Blue na Uvuvi na kuzungumza na wasimamizi wa Mradi wa TASFAM Zanzibar',
      order: 1,
    },
    {
      image: '/img/hero_2.jpg',
      caption:
        'Aliyekua Msimamizi Mkuu wa Mradi wa tasfam Tanzania akimkabidhi Mkuu mpya usimamizi wa Mradi wa TASFAM Tanzania Enos E. Esikuri',
      order: 2,
    },
    {
      image: '/img/hero_3.jpg',
      caption:
        'Mkurugenzi wa Idara ya Maendeleo ya Uvuvi na Mazao ya Baharini Ndugu Mussa akifungua kikao cha Mafunzo ya mfumo mpya wa Uchukuaaji wa Takwimu(SAMAKIs)',
      order: 3,
    },
    {
      image: '/img/hero_4.jpg',
      caption:
        'Wananchi wa Kijiji cha Michamvi wakifurahia Ufunguaji wa Pweza katika Ufunguzi Pweza',
      order: 4,
    },
    {
      image: '/img/hero_5.jpg',
      caption: 'Wafugaji wa Majongoo Bahari Sea cucumber',
      order: 5,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log('Hero slides seeded');

  // --- News Items ---
  const newsItems = [
    {
      title: 'World Bank Delegation Visits TASFAM Zanzibar Project',
      thumbnail: '/img/blog/blog-1.jpg',
      dateBadge: 'Jan 02',
    },
    {
      title: 'SAMAKI Data Collection System Training Launched',
      thumbnail: '/img/blog/blog-2.jpg',
      dateBadge: 'Dec 28',
    },
    {
      title: 'Michamvi Village Celebrates Octopus Fishing Season Opening',
      thumbnail: '/img/blog/blog-3.jpg',
      dateBadge: 'Dec 20',
    },
  ];

  for (const item of newsItems) {
    await prisma.newsItem.create({ data: item });
  }
  console.log('News items seeded');

  // --- Implementing Partners (government) ---
  const governmentPartners = [
    {
      name: 'MINISTRY OF LIVESTOCK AND FISHERIES (MAINLAND)',
      icon: 'bi-building',
      logo: '/images/agencies/mlf-logo.png',
      link: 'https://www.mifugouvuvi.go.tz',
      category: 'government',
      role: 'Lead Implementing Agency',
      order: 1,
    },
    {
      name: 'MINISTRY OF BLUE ECONOMY AND FISHERIES (ZANZIBAR)',
      icon: 'bi-water',
      logo: '/images/smz-logo.jpeg',
      category: 'government',
      role: 'Lead Implementing Agency',
      order: 2,
    },
    {
      name: 'DEEP SEA FISHING AUTHORITY (DSFA)',
      icon: 'bi-globe',
      logo: '/images/agencies/dsfa-logo.png',
      category: 'government',
      role: 'Regulatory Partner',
      order: 3,
    },
  ];

  for (const partner of governmentPartners) {
    await prisma.partner.create({ data: partner });
  }
  console.log('Implementing partners seeded');

  // --- Stakeholder Partners ---
  const stakeholders = [
    {
      name: 'Ministry of Blue Economy and Fisheries',
      icon: 'bi-building-fill',
      category: 'government',
      description:
        "Zanzibar's lead ministry responsible for fisheries policy and marine resource management.",
      role: 'Lead Implementing Agency',
      order: 10,
    },
    {
      name: 'Ministry of Livestock and Fisheries - Tanzania',
      icon: 'bi-building-fill',
      category: 'government',
      description:
        'National ministry coordinating fisheries development across mainland Tanzania.',
      role: 'Partner Agency',
      order: 11,
    },
    {
      name: 'Deep Sea Fishing Authority',
      icon: 'bi-water',
      category: 'government',
      description:
        'Authority managing deep sea fishing licenses and offshore marine resources.',
      role: 'Regulatory Partner',
      order: 12,
    },
    {
      name: 'World Bank',
      icon: 'bi-bank',
      category: 'international',
      description:
        'Primary funding partner supporting the TASFAM project through technical and financial assistance.',
      role: 'Funding Partner',
      order: 20,
    },
    {
      name: 'Indian Ocean Commission',
      icon: 'bi-globe-asia-australia',
      category: 'international',
      description:
        'Regional organization coordinating fisheries cooperation among Indian Ocean states.',
      role: 'Regional Coordinator',
      order: 21,
    },
    {
      name: 'FAO - Food and Agriculture Organization',
      icon: 'bi-flag',
      category: 'international',
      description:
        'UN agency providing technical guidance on sustainable fisheries practices.',
      role: 'Technical Partner',
      order: 22,
    },
  ];

  for (const s of stakeholders) {
    await prisma.partner.create({ data: s });
  }
  console.log('Stakeholder partners seeded');

  // --- Testimonials ---
  const testimonials = [
    {
      name: 'James Smith',
      quote:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?',
      image: '/img/testimonials/testimonials-1.jpg',
    },
    {
      name: 'Kate Smith',
      quote:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?',
      image: '/img/testimonials/testimonials-2.jpg',
    },
    {
      name: 'Claire Anderson',
      quote:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?',
      image: '/img/testimonials/testimonials-3.jpg',
    },
    {
      name: 'Dan Smith',
      quote:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?',
      image: '/img/testimonials/testimonials-4.jpg',
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('Testimonials seeded');

  // --- Publications ---
  const publications = [
    {
      title: 'Zanzibar Fisheries Stock Assessment Report 2025',
      description:
        "Comprehensive analysis of fish stock levels and recommendations for sustainable catch limits in Zanzibar waters.",
      category: 'Technical Report',
      fileSize: 'PDF, 2.4 MB',
      publishDate: new Date('2025-12-01'),
    },
    {
      title: 'Impact of Climate Change on Coastal Fisheries',
      description:
        'Study examining the effects of changing ocean temperatures on fish migration patterns and catch volumes.',
      category: 'Research Paper',
      fileSize: 'PDF, 1.8 MB',
      publishDate: new Date('2025-11-01'),
    },
    {
      title: 'Marine Protected Areas Management Guidelines',
      description:
        "Guidelines for establishing and managing marine protected areas in Zanzibar's territorial waters.",
      category: 'Policy Brief',
      fileSize: 'PDF, 890 KB',
      publishDate: new Date('2025-10-01'),
    },
    {
      title: 'TASFAM Project Annual Report 2024',
      description:
        'Comprehensive overview of project achievements, challenges, and financial summary for fiscal year 2024.',
      category: 'Annual Report',
      fileSize: 'PDF, 5.2 MB',
      publishDate: new Date('2025-03-01'),
    },
    {
      title: 'Octopus Fishery Management: A Case Study',
      description:
        'Analysis of community-based octopus closure management and its impact on stock recovery.',
      category: 'Research Paper',
      fileSize: 'PDF, 1.2 MB',
      publishDate: new Date('2025-09-01'),
    },
    {
      title: 'SAMAKI Data Collection System User Guide',
      description:
        'Comprehensive user manual for the SAMAKI fisheries data collection and reporting system.',
      category: 'Technical Manual',
      fileSize: 'PDF, 3.1 MB',
      publishDate: new Date('2025-08-01'),
    },
  ];

  for (const pub of publications) {
    await prisma.publication.create({ data: pub });
  }
  console.log('Publications seeded');

  // --- Blog Posts ---
  const blogPosts = [
    {
      title: 'Dolorum optio tempore voluptas dignissimos',
      slug: 'dolorum-optio-tempore',
      content:
        'Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.',
      featuredImage: '/img/blog/blog-1.jpg',
      author: 'John Doe',
      category: 'Politics',
      published: true,
      publishDate: new Date('2025-12-12'),
    },
    {
      title: 'Nisi magni odit consequatur autem nulla dolorem',
      slug: 'nisi-magni-odit',
      content:
        'Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur.',
      featuredImage: '/img/blog/blog-2.jpg',
      author: 'Julia Parker',
      category: 'Economics',
      published: true,
      publishDate: new Date('2025-03-19'),
    },
    {
      title:
        'Possimus soluta ut id suscipit ea ut. In quo quia et soluta libero sit sint.',
      slug: 'possimus-soluta',
      content:
        'Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium.',
      featuredImage: '/img/blog/blog-3.jpg',
      author: 'Maria Doe',
      category: 'Sports',
      published: true,
      publishDate: new Date('2025-06-24'),
    },
    {
      title:
        'Non rem rerum nam cum quo minus explicabo eius exercitationem.',
      slug: 'non-rem-rerum',
      content:
        'Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque.',
      featuredImage: '/img/blog/blog-4.jpg',
      author: 'Maria Doe',
      category: 'Sports',
      published: true,
      publishDate: new Date('2025-08-05'),
    },
    {
      title:
        'Accusamus quaerat aliquam qui debitis facilis consequatur',
      slug: 'accusamus-quaerat',
      content:
        'Dolorem atque aut. Omnis doloremque blanditiis quia eum porro quis ut velit tempore. Cumque sed quia ut maxime.',
      featuredImage: '/img/blog/blog-5.jpg',
      author: 'John Parker',
      category: 'Politics',
      published: true,
      publishDate: new Date('2025-09-17'),
    },
    {
      title: 'Distinctio provident quibusdam numquam aperiam aut',
      slug: 'distinctio-provident',
      content:
        'Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid.',
      featuredImage: '/img/blog/blog-6.jpg',
      author: 'Julia White',
      category: 'Economics',
      published: true,
      publishDate: new Date('2025-12-07'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('Blog posts seeded');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
