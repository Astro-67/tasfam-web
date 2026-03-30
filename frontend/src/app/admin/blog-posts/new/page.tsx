'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    author: 'TASFAM',
    published: false,
  });
  const [featuredImage, setFeaturedImage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setFeaturedImage(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/blog-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, featuredImage }),
      });
      if (res.ok) router.push('/admin/blog-posts');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">New Blog Post</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Author</label>
                <input type="text" className="form-control" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Featured Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
              {featuredImage && <img src={featuredImage} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 150 }} />}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              <label className="form-check-label" htmlFor="published">Published</label>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn text-white" style={{ background: '#2c5f7d' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/blog-posts')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
