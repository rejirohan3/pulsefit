import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#888', padding: '3rem 2rem 1.5rem', borderTop: '1px solid #1a1a1a' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem'
      }}>

        {/* Brand */}
        <div>
          <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: '0.75rem', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#f97316' }}>Pulse</span><span style={{ color: '#fff' }}>Fit</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
            One membership for all your fitness needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Quick Links</div>
          {[['/', 'Home'], ['/plans', 'Membership Plans'], ['/gyms', 'Find a Gym'], ['/blog', 'Blog']].map(([to, label]) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}>
              <Link to={to} style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}
                onMouseEnter={e => e.target.style.color = '#f97316'}
                onMouseLeave={e => e.target.style.color = '#888'}>
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Company */}
        <div>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Company</div>
          {[['/about', 'About Us'], ['/blog', 'Blog'], ['/gyms', 'Locations']].map(([to, label]) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}>
              <Link to={to} style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}
                onMouseEnter={e => e.target.style.color = '#f97316'}
                onMouseLeave={e => e.target.style.color = '#888'}>
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Contact</div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.9 }}>
            support@pulsefit.in<br />
            +91 98765 43210<br />
            Delhi NCR, India
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '2rem auto 0',
        borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem',
        fontSize: '0.8rem', textAlign: 'center'
      }}>
        © {new Date().getFullYear()} PulseFit. All rights reserved.
      </div>
    </footer>
  );
}