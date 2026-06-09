import axios from 'axios';

// Single axios instance used by every page
// baseURL points to your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// This interceptor runs before EVERY request automatically
// It reads the JWT token from localStorage and adds it to the header
// So you never have to manually add Authorization headers anywhere
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;