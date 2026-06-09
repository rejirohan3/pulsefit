import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Add shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    ['/', 'Home'],
    ['/plans', 'Plans'],
    ['/gyms', 'Find a Gym'],
    ['/blog', 'Blog'],
    ['/about', 'About'],
  ];

  return (
    <>
      <style>{`
        .nav-link {
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 6px 0;
          position: relative;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #f97316;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #f97316; }
        .nav-link.active::after { width: 100%; }

        .join-btn {
          background: #f97316;
          color: #fff !important;
          padding: 9px 22px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }
        .join-btn:hover {
          background: #ea6c0a;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px #f9731644;
        }
        .join-btn::after { display: none !important; }

        .logout-btn {
          background: transparent;
          border: 1.5px solid #f97316;
          color: #f97316;
          padding: 8px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .logout-btn:hover {
          background: #f97316;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px #f9731644;
        }

        .admin-link {
          color: #f97316;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 6px;
          background: #f9731618;
          border: 1px solid #f9731633;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .admin-link:hover {
          background: #f9731628;
          transform: translateY(-1px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .hamburger:hover { background: #1a1a1a; }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          flex-direction: column;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: #0a0a0a;
          border-bottom: 1px solid #1a1a1a;
          padding: 1rem 1.5rem 1.5rem;
          gap: 0.25rem;
          z-index: 99;
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .mobile-menu.open {
          display: flex;
          transform: translateY(0);
          opacity: 1;
        }
        .mobile-nav-link {
          color: #888;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 12px 0;
          border-bottom: 1px solid #1a1a1a;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: block;
        }
        .mobile-nav-link:hover { color: #fff; padding-left: 6px; }
        .mobile-nav-link.active { color: #f97316; }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @media (min-width: 901px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── Main Navbar ── */}
      <nav style={{
        background: '#0a0a0a',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #1a1a1a',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        {/* Centered inner container */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ color: '#f97316', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px', transition: 'opacity 0.2s' }}>Pulse</span>
            <span style={{ color: '#fff',    fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px' }}>Fit</span>
          </Link>

          {/* Center — nav links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {navLinks.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right — auth buttons */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <a href="/admin" className="admin-link">⚙ Admin</a>
                )}
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                >
                  Login
                </Link>
                <Link to="/plans" className="join-btn">
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', background: menuOpen ? '#f97316' : '#fff' }} />
            <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', background: menuOpen ? '#f97316' : '#fff' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(([path, label]) => (
          <Link
            key={path}
            to={path}
            className={`mobile-nav-link ${isActive(path) ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="mobile-nav-link" style={{ color: '#f97316', fontWeight: 700 }}>
                ⚙ Admin Panel
              </Link>
            )}
            <Link to="/dashboard" className="mobile-nav-link">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                marginTop: '0.75rem', width: '100%',
                background: '#f97316', color: '#fff',
                border: 'none', padding: '13px', borderRadius: '10px',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-nav-link">Login</Link>
            <Link
              to="/plans"
              style={{
                marginTop: '0.75rem', display: 'block', textAlign: 'center',
                background: '#f97316', color: '#fff', padding: '13px',
                borderRadius: '10px', textDecoration: 'none',
                fontSize: '1rem', fontWeight: 700,
              }}
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </>
  );
}