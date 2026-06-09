import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs once when the app starts
  // Checks if a saved token exists and loads the user from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/users/me')
        .then(res  => setUser(res.data))
        .catch(()  => localStorage.removeItem('token')) // expired token
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Called from Login.jsx
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user; // return so Login can check role
  };

  // Called from Register.jsx
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // Called from Navbar logout button
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Called after payment to sync subscription data into user state
  const refreshUser = async () => {
    const res = await api.get('/users/me');
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Use this in any component:  const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);   