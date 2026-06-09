import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function ProfileSetup() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    pinCode: '',
    age: '',
    gender: '',
    emergencyContact: '',
  });

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.put('/users/profile', form);
      await refreshUser();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Try again.');
    }
    setLoading(false);
  };

  const inp = {
    background: '#111',
    border: '1px solid #2a2a2a',
    color: '#fff',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const label = {
    color: '#888',
    fontSize: '0.82rem',
    display: 'block',
    marginBottom: '5px',
  };

  return (
    <div style={{
      background: '#0f0f0f', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{
        background: '#1a1a1a', borderRadius: '18px',
        padding: '2.5rem', maxWidth: '520px',
        width: '100%', border: '1px solid #2a2a2a'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.4rem' }}>
            Payment Successful!
          </h2>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Complete your profile to activate your membership
          </p>
        </div>

        {error && (
          <div style={{
            background: '#2a0a0a', border: '1px solid #ef4444',
            borderRadius: '8px', padding: '10px 14px',
            color: '#ef4444', fontSize: '0.9rem', marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Full Name */}
          <div>
            <label style={label}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Rahul Sharma"
              style={inp}
            />
          </div>

          {/* Phone */}
          <div>
            <label style={label}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
              placeholder="9876543210"
              style={inp}
            />
          </div>

          {/* Address */}
          <div>
            <label style={label}>Full Address <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={onChange}
              required
              placeholder="123, Main Street, Delhi"
              style={inp}
            />
          </div>

          {/* PIN Code */}
          <div>
            <label style={label}>PIN Code <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              name="pinCode"
              value={form.pinCode}
              onChange={onChange}
              required
              placeholder="110001"
              style={inp}
            />
          </div>

          {/* Age */}
          <div>
            <label style={label}>Age <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={onChange}
              required
              placeholder="25"
              style={inp}
            />
          </div>

          {/* Gender */}
          <div>
            <label style={label}>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={onChange}
              style={{ ...inp, cursor: 'pointer' }}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Emergency Contact */}
          <div>
            <label style={label}>Emergency Contact Number</label>
            <input
              type="tel"
              name="emergencyContact"
              value={form.emergencyContact}
              onChange={onChange}
              placeholder="9876543210"
              style={inp}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#444' : '#f97316',
              color: '#fff', border: 'none',
              padding: '15px', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
            }}
          >
            {loading ? 'Saving...' : 'Save & Go to Dashboard →'}
          </button>

        </form>
      </div>
    </div>
  );
}