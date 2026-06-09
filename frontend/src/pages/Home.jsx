import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    { icon: '🏋️', title: 'World-Class Equipment',  desc: 'Latest machines and free weights at every location' },
    { icon: '👥', title: 'Expert Trainers',         desc: 'Certified personal trainers to guide your journey' },
    { icon: '📍', title: '50+ Locations',            desc: 'Find a PulseFit gym near you across India' },
    { icon: '📱', title: 'Digital Membership',       desc: 'Manage your membership from your phone, anytime' },
  ];

  return (
    <div style={{ background: '#0f0f0f', color: '#fff' }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{
        padding: '7rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #1a0800 0%, #0f0f0f 100%)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ color: '#f97316', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            One Membership · Infinite Possibilities
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.08, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            Your fitness journey<br />
            <span style={{ color: '#f97316' }}>starts here.</span>
          </h1>
          <p style={{ color: '#888', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            Join thousands of members across India. Access gyms, group classes, and at-home workouts — all with one membership.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/plans" style={{
              background: '#f97316', color: '#fff', padding: '16px 40px',
              borderRadius: '12px', textDecoration: 'none', fontWeight: 800, fontSize: '1.05rem',
            }}>
              View Plans
            </Link>
            <Link to="/gyms" style={{
              background: 'transparent', color: '#fff', padding: '16px 40px',
              borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
              border: '1px solid #333', fontSize: '1.05rem',
            }}>
              Find a Gym
            </Link>
          </div>
        </div>
      </section>

      {/* ── Plan preview ──────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', marginBottom: '0.5rem' }}>
          Choose your plan
        </h2>
        <p style={{ color: '#888', marginBottom: '2.5rem' }}>Flexible memberships for every goal</p>

        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '960px', margin: '0 auto 2.5rem' }}>
          {[
            ['ELITE',  '#f97316', 'Unlimited access to all gyms & classes'],
            ['PRO',    '#8b5cf6', 'Access to all PRO gyms & at-home workouts'],
            ['SELECT', '#14b8a6', 'Single centre + at-home workouts'],
          ].map(([tag, color, desc]) => (
            <div key={tag} style={{
              background: '#1a1a1a',
              border: `1px solid #2a2a2a`,
              borderTop: `4px solid ${color}`,
              borderRadius: '16px',
              padding: '1.75rem 2rem',
              flex: '1 1 240px',
              textAlign: 'left',
            }}>
              <div style={{ color, fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tag}</div>
              <p style={{ color: '#888', fontSize: '0.88rem', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <Link to="/plans" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
          See pricing & features →
        </Link>
      </section>

      {/* ── Why PulseFit ──────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#111' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
            Why PulseFit?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#1a1a1a', borderRadius: '14px', padding: '1.75rem', border: '1px solid #2a2a2a' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>
          Ready to transform?
        </h2>
        <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Join PulseFit today. Cancel anytime.
        </p>
        <Link to="/register" style={{
          background: '#f97316', color: '#fff',
          padding: '18px 48px', borderRadius: '12px',
          textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem',
        }}>
          Get Started Free
        </Link>
      </section>
    </div>
  );
}