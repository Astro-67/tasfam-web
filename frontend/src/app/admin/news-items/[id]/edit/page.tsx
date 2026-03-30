'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditNewsItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState({
    title: '',
    dateBadge: '',
    published: false,
  });
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/news-items/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || '',
          dateBadge: data.dateBadge || '',
          published: data.published ?? false,
        });
        setThumbnail(data.thumbnail || '');
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
    if (data.url) setThumbnail(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/news-items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, thumbnail }),
      });
      if (res.ok) router.push('/admin/news-items');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Edit News Item</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Thumbnail</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
              {thumbnail && <img src={thumbnail} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 150 }} />}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date Badge</label>
                <input type="text" className="form-control" placeholder="e.g. Jan 02" value={form.dateBadge} onChange={(e) => setForm({ ...form, dateBadge: e.target.value })} />
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
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/news-items')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
