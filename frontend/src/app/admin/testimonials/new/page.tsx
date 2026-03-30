'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    quote: '',
    role: '',
  });
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setImage(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image }),
      });
      if (res.ok) router.push('/admin/testimonials');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">New Testimonial</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Quote</label>
              <textarea className="form-control" rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input type="text" className="form-control" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
              {image && <img src={image} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 100 }} />}
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn text-white" style={{ background: '#2c5f7d' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/testimonials')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
