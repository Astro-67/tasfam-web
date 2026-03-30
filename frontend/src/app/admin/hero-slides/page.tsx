'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroSlide {
  id: number;
  caption: string;
  image: string;
  order: number;
  published: boolean;
}

export default function HeroSlidesListPage() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = () => {
    setLoading(true);
    fetch('/api/admin/hero-slides')
      .then((r) => r.json())
      .then((res) => setItems(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    await fetch(`/api/admin/hero-slides/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Hero Slides</h3>
        <button className="btn text-white" style={{ background: '#2c5f7d' }} onClick={() => router.push('/admin/hero-slides/new')}>
          <i className="bi bi-plus-lg me-1"></i> Add New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white shadow-sm rounded">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Caption</th>
                <th>Order</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted py-4">No hero slides yet</td></tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image && <img src={item.image} alt="" style={{ height: 40, borderRadius: 4 }} />}
                  </td>
                  <td>{item.caption ? (item.caption.length > 60 ? item.caption.substring(0, 60) + '...' : item.caption) : '-'}</td>
                  <td>{item.order}</td>
                  <td>
                    <span className={`badge ${item.published ? 'bg-success' : 'bg-secondary'}`}>
                      {item.published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => router.push(`/admin/hero-slides/${item.id}/edit`)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
