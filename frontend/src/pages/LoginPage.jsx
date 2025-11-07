import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function LoginPage() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // ✅ Fixed: correct API route + ensure session cookie is stored
      const res = await api.post(
        '/api/auth/login',
        { accountNumber, password },
        { withCredentials: true }
      );

      // ✅ Ensure backend sends role in response
      const role = res.data?.role;

      if (role === 'customer') {
        navigate('/customer');
      } else if (role === 'employee') {
        navigate('/employee');
      } else {
        alert('Invalid role or account type.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed — please check credentials or server connection.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>Access your Customer or Employee portal</p>

        <input
          style={styles.input}
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          type="password"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{ ...styles.button, backgroundColor: '#4CAF50' }}
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          style={{ ...styles.button, backgroundColor: '#2196F3' }}
          onClick={() => navigate('/register')}
        >
          Register as Customer
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
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: '30px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    margin: '8px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
