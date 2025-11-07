import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // basic client-side validation
  const validate = () => {
    const namePattern = /^[a-zA-Z\s]{2,50}$/;
    const idPattern = /^[0-9]{8,13}$/;
    const accountPattern = /^[0-9]{6,20}$/;
    if (!namePattern.test(form.fullName)) {
      alert('Full name must be alphabetic (2-50 chars).');
      return false;
    }
    if (!idPattern.test(form.idNumber)) {
      alert('ID number must be 8-13 digits.');
      return false;
    }
    if (!accountPattern.test(form.accountNumber)) {
      alert('Account number must be 6-20 digits.');
      return false;
    }
    if (form.password.length < 8) {
      alert('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // 1) fetch CSRF token (backend must expose this route)
      const csrfRes = await api.get('/auth/csrf-token', { withCredentials: true });
      const csrfToken = csrfRes.data?.csrfToken;

      // 2) send registration with CSRF header and include credentials
      const res = await api.post(
        '/auth/register',
        { ...form, role: 'customer' },
        {
          headers: { 'X-CSRF-Token': csrfToken },
          withCredentials: true
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert('Registration successful');
        navigate('/');
      } else {
        // show server message if available
        const data = res.data || {};
        alert(data.error || data.message || 'Registration failed');
      }
    } catch (err) {
      // show helpful error messages
      if (err.response) {
        // server responded
        console.error('Server error:', err.response.data);
        alert(err.response.data.error || err.response.data.message || 'Registration failed (server)');
      } else {
        // network or other error
        console.error('Request error:', err);
        alert('Registration failed — network or server unreachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register as a New Customer</h2>
        <p style={styles.subtitle}>Fill in your details to create a new account</p>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="idNumber"
          placeholder="ID Number"
          value={form.idNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="accountNumber"
          placeholder="Account Number"
          value={form.accountNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          style={{ ...styles.button, backgroundColor: '#4CAF50' }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#2196F3' }}
          onClick={() => navigate('/')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    width: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: '25px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s all',
  },
};
