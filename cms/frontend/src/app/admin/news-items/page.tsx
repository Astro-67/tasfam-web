'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: number;
  title: string;
  dateBadge: string | null;
  published: boolean;
  createdAt: string;
}

export default function NewsItemsListPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = () => {
    setLoading(true);
    fetch('/api/admin/news-items')
      .then((r) => r.json())
      .then((res) => setItems(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    await fetch(`/api/admin/news-items/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">News Items</h3>
        <button className="btn text-white" style={{ background: '#2c5f7d' }} onClick={() => router.push('/admin/news-items/new')}>
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
                <th>Title</th>
                <th>Date Badge</th>
                <th>Published</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted py-4">No news items yet</td></tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.dateBadge || '-'}</td>
                  <td>
                    <span className={`badge ${item.published ? 'bg-success' : 'bg-secondary'}`}>
                      {item.published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => router.push(`/admin/news-items/${item.id}/edit`)}>
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
