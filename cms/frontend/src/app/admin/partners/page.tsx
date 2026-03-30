'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Partner {
  id: number;
  name: string;
  category: string;
  role: string | null;
  order: number;
}

export default function PartnersListPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = () => {
    setLoading(true);
    fetch('/api/admin/partners')
      .then((r) => r.json())
      .then((res) => setItems(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;
    await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Partners</h3>
        <button className="btn text-white" style={{ background: '#2c5f7d' }} onClick={() => router.push('/admin/partners/new')}>
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
                <th>Name</th>
                <th>Category</th>
                <th>Role</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted py-4">No partners yet</td></tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category || '-'}</td>
                  <td>{item.role || '-'}</td>
                  <td>{item.order}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => router.push(`/admin/partners/${item.id}/edit`)}>
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
