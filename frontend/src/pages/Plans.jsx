import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

// Skeleton card shown while loading
function SkeletonCard() {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '18px', padding: '2rem',
      border: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', gap: '1rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ height: '14px', width: '60px', background: '#2a2a2a', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '36px', width: '120px', background: '#2a2a2a', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
      </div>
      <div style={{ height: '40px', width: '140px', background: '#2a2a2a', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '16px', width: '100%', background: '#2a2a2a', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: '16px', width: '85%', background: '#2a2a2a', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ height: '14px', width: '80%', background: '#2a2a2a', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
      <div style={{ height: '48px', width: '100%', background: '#2a2a2a', borderRadius: '10px', marginTop: 'auto', animation: 'pulse 1.5s infinite' }} />
    </div>
  );
}

export default function Plans() {
  const [plans, setPlans]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const { user }  = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    api.get('/plans')
      .then(res => { setPlans(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load plans. Please refresh.'); setLoading(false); });
  }, []);

  const handleBuy = (planId) => {
    if (!user) return navigate('/register');
    navigate(`/checkout/${planId}`);
  };

  const tagColor = { ELITE: '#f97316', PRO: '#8b5cf6', SELECT: '#14b8a6' };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '4rem 2rem' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          Choose Your <span style={{ color: '#f97316' }}>Plan</span>
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem', fontSize: '1rem' }}>
          One membership for all your fitness needs
        </p>

        {/* Loading skeleton */}
        {loading && (
          <>
            <p style={{ color: '#555', textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem' }}>
              ⏳ Loading plans — this may take up to 30 seconds on first load...
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </>
        )}

        {/* Error state */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <p style={{ color: '#ef4444', marginBottom: '1.5rem' }}>{error}</p>
            <button
              onClick={() => { setLoading(true); setError(''); api.get('/plans').then(res => { setPlans(res.data); setLoading(false); }).catch(() => { setError('Still failing. Try again.'); setLoading(false); }); }}
              style={{ background: '#f97316', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
              Try Again
            </button>
          </div>
        )}

        {/* Plans */}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {plans.map(plan => {
              const color = tagColor[plan.tag] || plan.color || '#f97316';
              return (
                <div key={plan._id}
                  style={{
                    background: '#1a1a1a', borderRadius: '18px', padding: '2rem',
                    border: `2px solid ${color}44`,
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div>
                    <div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 3, marginBottom: '4px' }}>pulsefit</div>
                    <div style={{ color, fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>{plan.tag}</div>
                  </div>
                  <div style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 800 }}>
                    ₹{plan.price.toLocaleString()}
                    <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: 400 }}> / {plan.duration} days</span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.65 }}>{plan.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBuy(plan._id)}
                    style={{ background: color, color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginTop: 'auto', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Get {plan.tag} — ₹{plan.price.toLocaleString()}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}