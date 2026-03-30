import Link from 'next/link';

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3 col-4 text-center text-md-start">
            <Link href="/" className="top-logo">
              <img src="/images/logo.png" alt="TASFAM Logo" className="logo-img" />
            </Link>
          </div>
          <div className="col-md-6 col-4 text-center ministry-text">
            <span className="country-name">THE REVOLUTIONARY GOVERNMENT OF ZANZIBAR (RGoZ)</span>
            <span className="ministry-name">Ministry of Blue Economy and Fisheries (Zanzibar)</span>
            <span className="ministry-name">Department of Fisheries Development and Aquaculture</span>
          </div>
          <div className="col-md-3 col-4 text-center text-md-end">
            <img src="/images/smz-logo.jpeg" alt="Government Logo" className="logo-img govt-logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
