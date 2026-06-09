import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import Home           from './pages/Home';
import Plans          from './pages/Plans';
import Checkout       from './pages/Checkout';
import ProfileSetup   from './pages/ProfileSetup';
import Dashboard      from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import GymLocator     from './pages/GymLocator';
import Blog           from './pages/Blog';
import About          from './pages/About';
import Login          from './pages/Login';
import Register       from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* ── Public pages (anyone can visit) ──────────────────── */}
          <Route path="/"        element={<Home />} />
          <Route path="/plans"   element={<Plans />} />
          <Route path="/gyms"    element={<GymLocator />} />
          <Route path="/blog"    element={<Blog />} />
          <Route path="/about"   element={<About />} />
          <Route path="/login"   element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Protected pages (must be logged in) ──────────────── */}
          <Route path="/checkout/:planId" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />
          <Route path="/profile-setup" element={
            <ProtectedRoute><ProfileSetup /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          {/* ── Admin-only page ───────────────────────────────────── */}
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}