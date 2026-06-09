import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Blog() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs')
      .then(r => setBlogs(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      Loading...
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          PulseFit <span style={{ color: '#f97316' }}>Blog</span>
        </h1>
        <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1rem' }}>
          Fitness tips, nutrition guides, and training advice
        </p>

        {blogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#444' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <p>No posts yet. Check back soon!</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blogs.map(blog => (
            <div key={blog._id} style={{
              background: '#1a1a1a', borderRadius: '14px', padding: '2rem',
              border: '1px solid #2a2a2a', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#f97316'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: '#2a1000', color: '#f97316', padding: '3px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {blog.category}
                </span>
                <span style={{ color: '#444', fontSize: '0.8rem' }}>
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                {blog.title}
              </h2>
              <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7 }}>{blog.excerpt}</p>
              <div style={{ color: '#444', fontSize: '0.8rem', marginTop: '1.25rem' }}>By {blog.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}