'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const CATEGORIES = ['Technical Report', 'Research Paper', 'Policy Brief', 'Annual Report', 'Technical Manual'];

export default function EditPublicationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    fileSize: '',
    publishDate: '',
  });
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/publications/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          fileSize: data.fileSize || '',
          publishDate: data.publishDate ? new Date(data.publishDate).toISOString().split('T')[0] : '',
        });
        setFile(data.file || '');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append('file', f);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setFile(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/publications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, file }),
      });
      if (res.ok) router.push('/admin/publications');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Edit Publication</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">File Size</label>
                <input type="text" className="form-control" placeholder="e.g. 2.5 MB" value={form.fileSize} onChange={(e) => setForm({ ...form, fileSize: e.target.value })} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Publish Date</label>
                <input type="date" className="form-control" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">File (PDF)</label>
              <input type="file" className="form-control" accept=".pdf,application/pdf" onChange={handleUpload} />
              {file && <p className="mt-1 text-success small">Current file: {file}</p>}
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn text-white" style={{ background: '#2c5f7d' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/publications')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
