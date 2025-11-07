import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerPortal() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome Customer</h1>
      <button onClick={() => navigate('/payment')}>Make a Payment</button>
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
}
