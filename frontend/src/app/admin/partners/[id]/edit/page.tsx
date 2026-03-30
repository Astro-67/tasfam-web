'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    role: '',
    icon: '',
    link: '',
    order: '0',
  });
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/partners/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          category: data.category || '',
          role: data.role || '',
          icon: data.icon || '',
          link: data.link || '',
          order: String(data.order || 0),
        });
        setLogo(data.logo || '');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setLogo(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, logo }),
      });
      if (res.ok) router.push('/admin/partners');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Edit Partner</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  <option value="government">Government</option>
                  <option value="international">International</option>
                  <option value="community">Community</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <input type="text" className="form-control" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Icon (Bootstrap icon class)</label>
                <input type="text" className="form-control" placeholder="e.g. bi-building" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Link (URL)</label>
                <input type="url" className="form-control" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Order</label>
                <input type="number" className="form-control" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
              {logo && <img src={logo} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 80 }} />}
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn text-white" style={{ background: '#2c5f7d' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/partners')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
