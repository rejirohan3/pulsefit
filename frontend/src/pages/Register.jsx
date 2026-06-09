import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/plans'); // after register → pick a plan
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const inp = {
    background: '#111', border: '1px solid #2a2a2a', color: '#fff',
    padding: '13px 14px', borderRadius: '8px', fontSize: '0.95rem',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '2.5rem', maxWidth: '420px', width: '100%', border: '1px solid #2a2a2a' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Create account</h2>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Join PulseFit — it's free to sign up</p>
        </div>

        {error && (
          <div style={{ background: '#2a0a0a', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Full Name</label>
            <input type="text" placeholder="Rahul Sharma" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required style={inp} />
          </div>
          <div>
            <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" placeholder="you@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required style={inp} />
          </div>
          <div>
            <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" placeholder="Min 6 characters" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} style={inp} />
          </div>
          <button type="submit" disabled={loading} style={{
            background: loading ? '#444' : '#f97316', color: '#fff',
            border: 'none', padding: '14px', borderRadius: '10px',
            fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '0.5rem',
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ color: '#888', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}