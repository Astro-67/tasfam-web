'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  author: string;
  published: boolean;
  createdAt: string;
}

export default function BlogPostsListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = () => {
    setLoading(true);
    fetch('/api/admin/blog-posts')
      .then((r) => r.json())
      .then((res) => setPosts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    await fetch(`/api/admin/blog-posts/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Blog Posts</h3>
        <button className="btn text-white" style={{ background: '#2c5f7d' }} onClick={() => router.push('/admin/blog-posts/new')}>
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
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-4">No blog posts yet</td></tr>
              )}
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.category || '-'}</td>
                  <td>{post.author}</td>
                  <td>
                    <span className={`badge ${post.published ? 'bg-success' : 'bg-secondary'}`}>
                      {post.published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => router.push(`/admin/blog-posts/${post.id}/edit`)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(post.id)}>
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
