import { useAuth } from '../context/AuthContext';
import { Link }    from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const sub      = user?.subscription;
  const active   = sub?.status === 'active';
  const daysLeft = active
    ? Math.max(0, Math.ceil((new Date(sub.endDate) - new Date()) / 86400000))
    : 0;

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Greeting */}
        <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>
          Hey, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Here's your membership overview</p>

        {/* ── Membership card ── */}
        <div style={{
          background: active ? '#130d00' : '#1a1a1a',
          border: `2px solid ${active ? '#f97316' : '#2a2a2a'}`,
          borderRadius: '18px', padding: '2rem', marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 2, marginBottom: '4px' }}>
                Membership
              </div>
              <div style={{ color: active ? '#f97316' : '#555', fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>
                {active ? sub.planName : 'No Active Plan'}
              </div>
            </div>
            <span style={{
              background: active ? '#f97316' : '#2a2a2a',
              color: '#fff', padding: '6px 18px', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: 600,
            }}>
              {active ? '● Active' : 'Inactive'}
            </span>
          </div>

          {/* Dates + days left */}
          {active && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                ['Start Date', new Date(sub.startDate).toLocaleDateString('en-IN')],
                ['End Date',   new Date(sub.endDate).toLocaleDateString('en-IN')],
                ['Days Left',  daysLeft],
              ].map(([label, val]) => (
                <div key={label} style={{ background: '#0f0f0f', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {!active && (
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/plans" style={{
                background: '#f97316', color: '#fff', padding: '12px 28px',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
              }}>
                Browse Plans
              </Link>
            </div>
          )}
        </div>

        {/* ── Profile card ── */}
        <div style={{ background: '#1a1a1a', borderRadius: '18px', padding: '2rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontWeight: 700 }}>Your Profile</h3>
            <Link to="/profile-setup" style={{ color: '#f97316', fontSize: '0.85rem', textDecoration: 'none' }}>
              Edit →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {[
              ['Name',     user?.name],
              ['Email',    user?.email],
              ['Phone',    user?.phone    || '—'],
              ['Address',  user?.address  || '—'],
              ['PIN Code', user?.pinCode  || '—'],
              ['Age',      user?.age      || '—'],
              ['Gender',   user?.gender   || '—'],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ color: '#444', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '4px' }}>{label}</div>
                <div style={{ color: '#ddd', fontSize: '0.95rem', wordBreak: 'break-word' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}