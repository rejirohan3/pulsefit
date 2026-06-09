import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap any route with this to block non-logged-in users
// If not logged in → sends them to /login
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Still checking token on startup — don't redirect yet
  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '1rem' }}>
      Loading...
    </div>
  );

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in → show the page
  return children;
}

// Wrap any route with this to block non-admin users
// If not admin → sends them to /dashboard
export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '1rem' }}>
      Loading...
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
}