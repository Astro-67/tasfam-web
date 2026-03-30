import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  variant?: 'dark' | 'light';
}

export default function PageTitle({
  title,
  subtitle,
  breadcrumbs,
  variant = 'light',
}: PageTitleProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`page-title${isDark ? ' dark-background' : ''}`}
      style={isDark ? { backgroundImage: 'url(/img/page-title-bg.webp)' } : undefined}
    >
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="breadcrumbs">
          <ol>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className={index === breadcrumbs.length - 1 ? 'current' : ''}>
                {crumb.href && index !== breadcrumbs.length - 1 ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  crumb.label
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
