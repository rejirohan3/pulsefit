import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function GymLocator() {
  const [gyms,    setGyms]    = useState([]);
  const [search,  setSearch]  = useState('');
  const [loading, setLoading] = useState(true);

  const fetchGyms = async (city = '') => {
    setLoading(true);
    try {
      const res = await api.get(`/gyms${city ? `?city=${city}` : ''}`);
      setGyms(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGyms(); }, []);

  const onSearch = (e) => { e.preventDefault(); fetchGyms(search.trim()); };

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          Find a <span style={{ color: '#f97316' }}>PulseFit Gym</span>
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem' }}>
          Search by city to locate your nearest centre
        </p>

        {/* Search bar */}
        <form onSubmit={onSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: '520px', margin: '0 auto 3rem' }}>
          <input
            type="text"
            placeholder="e.g. Delhi, Mumbai, Bangalore..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: '#1a1a1a', border: '1px solid #2a2a2a',
              color: '#fff', padding: '14px 18px', borderRadius: '10px',
              fontSize: '0.95rem', outline: 'none',
            }}
          />
          <button type="submit" style={{
            background: '#f97316', color: '#fff', border: 'none',
            padding: '14px 28px', borderRadius: '10px', fontWeight: 700,
            cursor: 'pointer', fontSize: '0.95rem', whiteSpace: 'nowrap',
          }}>
            Search
          </button>
        </form>

        {loading && (
          <p style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>Searching...</p>
        )}

        {!loading && gyms.length === 0 && (
          <p style={{ color: '#444', textAlign: 'center', padding: '4rem' }}>
            No gyms found for that city. Try "Delhi" or "Mumbai".
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {gyms.map(gym => (
            <div key={gym._id}
              style={{
                background: '#1a1a1a', borderRadius: '14px', padding: '1.5rem',
                border: '1px solid #2a2a2a', transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0, paddingRight: '1rem' }}>{gym.name}</h3>
                <span style={{ background: '#0d2600', color: '#4ade80', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  Open
                </span>
              </div>

              <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                📍 {gym.address}, {gym.city}, {gym.state} — {gym.pinCode}
              </p>
              {gym.phone && (
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>📞 {gym.phone}</p>
              )}
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>🕐 {gym.timings}</p>

              {gym.amenities?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {gym.amenities.map(a => (
                    <span key={a} style={{
                      background: '#111', color: '#777', padding: '3px 10px',
                      borderRadius: '20px', fontSize: '0.75rem',
                    }}>
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}