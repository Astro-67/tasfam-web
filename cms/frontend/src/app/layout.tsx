import type { Metadata } from 'next';
import { Open_Sans, Marcellus } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';
import '@/styles/main.css';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollTop from '@/components/layout/ScrollTop';
import AOSWrapper from '@/components/shared/AOSWrapper';
import BootstrapClient from '@/components/shared/BootstrapClient';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TASFAM | Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management',
  description:
    'Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management (TASFAM) - Supporting sustainable fisheries management and marine resource development in Tanzania.',
  keywords:
    'TASFAM, Tanzania fisheries, blue economy, sustainable fishing, marine conservation, Indian Ocean, fisheries management, coastal resources, aquaculture, marine resources, fisheries governance',
  openGraph: {
    type: 'website',
    title: 'TASFAM | Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management',
    description:
      'Tanzania Scaling-up Sustainable Marine Fisheries and Aquaculture Management (TASFAM) - Supporting sustainable fisheries management and marine resource development.',
    images: ['/images/logo.png'],
    url: 'https://tasfam.blueeconomysmz.go.tz',
    siteName: 'TASFAM Tanzania',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${marcellus.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body>
        <AOSWrapper />
        <BootstrapClient />
        <TopHeader />
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
