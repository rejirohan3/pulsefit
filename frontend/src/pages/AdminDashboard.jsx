import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AdminDashboard() {
  const [tab,     setTab]     = useState('members');
  const [members, setMembers] = useState([]);
  const [plans,   setPlans]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg,     setMsg]     = useState('');
  const [newPlan, setNewPlan] = useState({
    name: '', tag: '', price: '', duration: 30,
    description: '', features: '', color: '#f97316',
  });

  useEffect(() => {
    Promise.all([api.get('/users/members'), api.get('/plans')])
      .then(([m, p]) => { setMembers(m.data); setPlans(p.data); setLoading(false); });
  }, []);

  const createPlan = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const features = newPlan.features.split('\n').filter(Boolean);
      await api.post('/plans', { ...newPlan, price: Number(newPlan.price), features });
      const res = await api.get('/plans');
      setPlans(res.data);
      setMsg('✅ Plan created successfully!');
      setNewPlan({ name: '', tag: '', price: '', duration: 30, description: '', features: '', color: '#f97316' });
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error'));
    }
  };

  const deactivatePlan = async (id) => {
    if (!window.confirm('Deactivate this plan? Users can no longer buy it.')) return;
    await api.delete(`/plans/${id}`);
    setPlans(plans.filter(p => p._id !== id));
  };

  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      Loading...
    </div>
  );

  const inp = {
    background: '#0f0f0f', border: '1px solid #2a2a2a', color: '#fff',
    padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  };

  // Estimated revenue: sum of plan prices for all active members
  const revenue = members.reduce((sum, m) => {
    const price = m.subscription?.planId?.price || 0;
    return sum + price;
  }, 0);

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '2.5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2rem', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Manage members, plans, and revenue</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            ['Active Members', members.length,          '#f97316'],
            ['Active Plans',   plans.length,            '#8b5cf6'],
            ['Est. Revenue',   `₹${revenue.toLocaleString()}`, '#14b8a6'],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background: '#1a1a1a', borderRadius: '14px', padding: '1.5rem', border: '1px solid #2a2a2a' }}>
              <div style={{ color, fontSize: '2rem', fontWeight: 900 }}>{val}</div>
              <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[['members', 'Members'], ['plans', 'Plans'], ['add-plan', 'Add Plan']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              background: tab === id ? '#f97316' : '#1a1a1a',
              color:      tab === id ? '#fff'    : '#888',
              border: 'none', padding: '10px 22px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Members table ── */}
        {tab === 'members' && (
          <div style={{ background: '#1a1a1a', borderRadius: '14px', overflow: 'auto', border: '1px solid #2a2a2a' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#111' }}>
                  {['Name', 'Email', 'Phone', 'Plan', 'Status', 'Start', 'Expires'].map(h => (
                    <th key={h} style={{ color: '#555', padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m._id} style={{ borderTop: '1px solid #222', background: i % 2 === 0 ? '#1a1a1a' : '#161616' }}>
                    <td style={{ padding: '13px 16px', color: '#fff',  fontSize: '0.9rem',  fontWeight: 600 }}>{m.name}</td>
                    <td style={{ padding: '13px 16px', color: '#888',  fontSize: '0.85rem' }}>{m.email}</td>
                    <td style={{ padding: '13px 16px', color: '#888',  fontSize: '0.85rem' }}>{m.phone || '—'}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: '#2a1000', color: '#f97316', padding: '3px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                        {m.subscription?.planName || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: '#0a2a0a', color: '#4ade80', padding: '3px 12px', borderRadius: '20px', fontSize: '0.78rem' }}>
                        {m.subscription?.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#888', fontSize: '0.83rem' }}>
                      {m.subscription?.startDate ? new Date(m.subscription.startDate).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td style={{ padding: '13px 16px', color: '#888', fontSize: '0.83rem' }}>
                      {m.subscription?.endDate ? new Date(m.subscription.endDate).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && (
              <p style={{ color: '#444', textAlign: 'center', padding: '4rem', fontSize: '0.95rem' }}>
                No active members yet. Share your plans page!
              </p>
            )}
          </div>
        )}

        {/* ── Plans list ── */}
        {tab === 'plans' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {plans.map(plan => (
              <div key={plan._id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ color: plan.color || '#f97316', fontWeight: 900, fontSize: '1.3rem' }}>{plan.tag}</div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>₹{plan.price}</div>
                    <div style={{ color: '#555', fontSize: '0.8rem' }}>{plan.duration} days</div>
                  </div>
                  <button onClick={() => deactivatePlan(plan._id)} style={{
                    background: '#2a0a0a', color: '#ef4444', border: 'none',
                    padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem',
                  }}>
                    Deactivate
                  </button>
                </div>
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{plan.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Add Plan form ── */}
        {tab === 'add-plan' && (
          <div style={{ background: '#1a1a1a', borderRadius: '14px', padding: '2rem', border: '1px solid #2a2a2a', maxWidth: '500px' }}>
            <h3 style={{ color: '#fff', marginBottom: '0.25rem', fontWeight: 800 }}>Create New Plan</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>This will immediately appear on the Plans page</p>

            {msg && (
              <div style={{
                background: msg.startsWith('✅') ? '#0a2a0a' : '#2a0a0a',
                color:      msg.startsWith('✅') ? '#4ade80' : '#ef4444',
                border: `1px solid ${msg.startsWith('✅') ? '#4ade80' : '#ef4444'}`,
                borderRadius: '8px', padding: '10px 14px', fontSize: '0.9rem', marginBottom: '1.25rem',
              }}>
                {msg}
              </div>
            )}

            <form onSubmit={createPlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                ['Plan Name (e.g. PulseFit ELITE)', 'name', 'text'],
                ['Tag (e.g. ELITE)',                'tag',  'text'],
                ['Price (₹)',                       'price','number'],
                ['Duration (days)',                 'duration','number'],
                ['Short Description',               'description','text'],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>{label}</label>
                  <input type={type} value={newPlan[key]}
                    onChange={e => setNewPlan({ ...newPlan, [key]: e.target.value })}
                    required style={inp} />
                </div>
              ))}

              <div>
                <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>
                  Features (one per line)
                </label>
                <textarea value={newPlan.features}
                  onChange={e => setNewPlan({ ...newPlan, features: e.target.value })}
                  rows={4} placeholder={"Unlimited gym visits\nAll group classes\nAt-home app access"}
                  style={{ ...inp, resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Badge Colour</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="color" value={newPlan.color}
                    onChange={e => setNewPlan({ ...newPlan, color: e.target.value })}
                    style={{ width: '52px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{newPlan.color}</span>
                </div>
              </div>

              <button type="submit" style={{
                background: '#f97316', color: '#fff', border: 'none',
                padding: '14px', borderRadius: '10px', fontWeight: 700,
                fontSize: '1rem', cursor: 'pointer', marginTop: '0.25rem',
              }}>
                Create Plan
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}