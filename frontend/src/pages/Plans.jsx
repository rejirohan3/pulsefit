import { useEffect, useState } from 'react';
import { useNavigate }         from 'react-router-dom';
import api                     from '../utils/api';
import { useAuth }             from '../context/AuthContext';

export default function Plans() {
  const [plans, setPlans]     = useState([]);
  const [loading, setLoading] = useState(true);
  const { user }  = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    api.get('/plans').then(res => {
      setPlans(res.data);
      setLoading(false);
    });
  }, []);

  const handleBuy = (planId) => {
    if (!user) return navigate('/register'); // not logged in → register first
    navigate(`/checkout/${planId}`);
  };

  const tagColor = { ELITE: '#f97316', PRO: '#8b5cf6', SELECT: '#14b8a6' };

  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      Loading plans...
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h1 style={{ color: '#fff', textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          Choose Your <span style={{ color: '#f97316' }}>Plan</span>
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '3.5rem', fontSize: '1.05rem' }}>
          One membership for all your fitness needs
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {plans.map(plan => {
            const color = tagColor[plan.tag] || plan.color || '#f97316';
            return (
              <div key={plan._id}
                style={{
                  background: '#1a1a1a', borderRadius: '18px', padding: '2rem',
                  border: `2px solid ${color}44`,
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Tag */}
                <div>
                  <div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 3, marginBottom: '4px' }}>pulsefit</div>
                  <div style={{ color, fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>{plan.tag}</div>
                </div>

                {/* Price */}
                <div style={{ color: '#fff', fontSize: '2.4rem', fontWeight: 800 }}>
                  ₹{plan.price.toLocaleString()}
                  <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: 400 }}> / {plan.duration} days</span>
                </div>

                {/* Description */}
                <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.65 }}>{plan.description}</p>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Buy button */}
                <button
                  onClick={() => handleBuy(plan._id)}
                  style={{
                    background: color, color: '#fff', border: 'none',
                    padding: '15px', borderRadius: '10px', fontSize: '1rem',
                    fontWeight: 700, cursor: 'pointer', marginTop: 'auto',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Get {plan.tag} — ₹{plan.price.toLocaleString()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}