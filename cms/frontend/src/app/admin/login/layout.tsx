export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', background: '#f5f6fa' }}
    >
      {children}
    </div>
  );
}
