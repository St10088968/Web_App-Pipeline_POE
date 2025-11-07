// frontend/src/pages/EmployeePortal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeePayments from './EmployeePayments';

export default function EmployeePortal() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h1>Employee Portal</h1>
      <p>Review customer payments below. Verify SWIFT codes, then submit to SWIFT.</p>
      <EmployeePayments />
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
}
