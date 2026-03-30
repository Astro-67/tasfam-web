'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewHeroSlidePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    caption: '',
    order: '0',
    published: true,
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
      const res = await fetch('/api/admin/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image }),
      });
      if (res.ok) router.push('/admin/hero-slides');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">New Hero Slide</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Caption</label>
              <textarea className="form-control" rows={3} value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
              {image && <img src={image} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 150 }} />}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Order</label>
                <input type="number" className="form-control" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
              </div>
              <div className="col-md-6 mb-3 d-flex align-items-end">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  <label className="form-check-label" htmlFor="published">Published</label>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn text-white" style={{ background: '#2c5f7d' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/hero-slides')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
