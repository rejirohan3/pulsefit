import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      // Admin goes to /admin, everyone else to /dashboard
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
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
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Welcome back</h2>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Log in to your PulseFit account</p>
        </div>

        {error && (
          <div style={{ background: '#2a0a0a', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" placeholder="you@email.com" value={email}
              onChange={e => setEmail(e.target.value)} required style={inp} />
          </div>
          <div>
            <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} required style={inp} />
          </div>
          <button type="submit" disabled={loading} style={{
            background: loading ? '#444' : '#f97316', color: '#fff',
            border: 'none', padding: '14px', borderRadius: '10px',
            fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '0.5rem',
          }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p style={{ color: '#888', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}