import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { planId } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [plan, setPlan]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  // Fake card form state — looks real, does nothing
  const [card, setCard] = useState({
    name: '', number: '', expiry: '', cvv: ''
  });

  useEffect(() => {
    api.get('/plans').then(res => {
      const found = res.data.find(p => p._id === planId);
      if (found) setPlan(found);
    });
  }, [planId]);

  // Format card number with spaces: 4111 1111 1111 1111
  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  // Format expiry as MM/YY
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1 — create fake order
      await api.post('/payment/create-order', { planId });

      // Small delay to make it feel real
      await new Promise(r => setTimeout(r, 1500));

      // Step 2 — activate subscription (no real verification needed)
      await api.post('/payment/verify', { planId });

      await refreshUser();
      setSuccess(true);

      // Redirect to profile setup after 2 seconds
      setTimeout(() => navigate('/profile-setup'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  if (!plan) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      Loading...
    </div>
  );

  const inp = {
    background: '#111', border: '1px solid #2a2a2a', color: '#fff',
    padding: '13px 14px', borderRadius: '8px', fontSize: '0.95rem',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  // Success screen
  if (success) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: '#4ade80', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem' }}>Payment Successful!</h2>
        <p style={{ color: '#888' }}>Redirecting you to complete your profile...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

        {/* Left — Order summary */}
        <div style={{ background: '#1a1a1a', borderRadius: '18px', padding: '2rem', border: '1px solid #2a2a2a', alignSelf: 'start' }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1.5rem' }}>Order Summary</h2>

          {/* Plan badge */}
          <div style={{ background: '#111', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #f9731622' }}>
            <div style={{ color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 2, marginBottom: '4px' }}>Selected Plan</div>
            <div style={{ color: '#f97316', fontSize: '1.8rem', fontWeight: 900 }}>{plan.tag}</div>
            <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>{plan.duration} days membership</div>
          </div>

          {/* Line items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              ['Membership fee', `₹${plan.price.toLocaleString()}`],
              ['GST (18%)',      `₹${Math.round(plan.price * 0.18).toLocaleString()}`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{label}</span>
                <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{val}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>Total</span>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem' }}>
                ₹{Math.round(plan.price * 1.18).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {plan.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}>
                <span style={{ color: '#f97316' }}>✓</span> {f}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#111', borderRadius: '8px', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['🔒 SSL Secured', '💳 Safe Checkout', '✅ Instant Access'].map(b => (
              <span key={b} style={{ color: '#555', fontSize: '0.78rem' }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Right — Payment form */}
        <div style={{ background: '#1a1a1a', borderRadius: '18px', padding: '2rem', border: '1px solid #2a2a2a' }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.25rem' }}>Payment Details</h2>
          <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Demo mode — no real payment processed</p>

          {/* Payment method tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {['💳 Card', '🏦 UPI', '🏧 NetBanking'].map((m, i) => (
              <div key={m} style={{
                background: i === 0 ? '#f97316' : '#111',
                color: i === 0 ? '#fff' : '#555',
                padding: '8px 14px', borderRadius: '8px',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${i === 0 ? '#f97316' : '#2a2a2a'}`,
              }}>
                {m}
              </div>
            ))}
          </div>

          {error && (
            <div style={{ background: '#2a0a0a', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div>
              <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Cardholder Name</label>
              <input
                type="text" placeholder="Rahul Sharma"
                value={card.name}
                onChange={e => setCard({ ...card, name: e.target.value })}
                required style={inp}
              />
            </div>

            <div>
              <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Card Number</label>
              <input
                type="text" placeholder="4111 1111 1111 1111"
                value={card.number}
                onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                required style={inp}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>Expiry Date</label>
                <input
                  type="text" placeholder="MM/YY"
                  value={card.expiry}
                  onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                  required style={inp}
                />
              </div>
              <div>
                <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>CVV</label>
                <input
                  type="password" placeholder="•••"
                  value={card.cvv}
                  onChange={e => setCard({ ...card, cvv: e.target.value.slice(0, 4) })}
                  required style={inp}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              background: loading ? '#444' : '#f97316',
              color: '#fff', border: 'none', padding: '16px',
              borderRadius: '10px', fontSize: '1.05rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}>
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Processing...
                </>
              ) : (
                `Pay ₹${Math.round(plan.price * 1.18).toLocaleString()}`
              )}
            </button>

          </form>

          <p style={{ color: '#333', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem' }}>
            🔒 This is a portfolio demo. No real payment is charged.
          </p>
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}