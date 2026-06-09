export default function About() {
  const stats = [
    ['50+',    'Gym Locations'],
    ['10,000+','Active Members'],
    ['200+',   'Expert Trainers'],
    ['5',      'Cities'],
  ];

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '4rem 2rem', color: '#fff' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <h1 style={{ fontWeight: 900, fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
          About <span style={{ color: '#f97316' }}>PulseFit</span>
        </h1>
        <p style={{ color: '#888', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '620px' }}>
          PulseFit was founded with a single mission — to make world-class fitness accessible to everyone in India.
          We believe that staying healthy shouldn't be complicated or expensive.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
          {stats.map(([num, label]) => (
            <div key={label} style={{ background: '#1a1a1a', borderRadius: '14px', padding: '1.5rem', textAlign: 'center', border: '1px solid #2a2a2a' }}>
              <div style={{ color: '#f97316', fontSize: '2.4rem', fontWeight: 900 }}>{num}</div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Our Mission</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '2.5rem' }}>
          To provide premium fitness facilities at accessible prices, backed by technology that makes managing your health simple and enjoyable. We're building the largest fitness network in India — one city at a time.
        </p>

        {/* Contact */}
        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Contact Us</h2>
        <div style={{ background: '#1a1a1a', borderRadius: '14px', padding: '1.5rem', border: '1px solid #2a2a2a' }}>
          {[
            ['📧 Email',   'support@pulsefit.in'],
            ['📞 Phone',   '+91 98765 43210'],
            ['📍 Address', 'PulseFit HQ, Connaught Place, New Delhi – 110001'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <span style={{ color: '#555', minWidth: '100px' }}>{label}</span>
              <span style={{ color: '#ccc' }}>{val}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}