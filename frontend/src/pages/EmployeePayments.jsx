// frontend/src/pages/EmployeePayments.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function EmployeePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employee/payments');
      setPayments(res.data.payments || []);
    } catch (err) {
      alert('Failed to load payments');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const toggleVerify = async (id, currentlyVerified) => {
    try {
      const url = `/employee/payments/${id}/${currentlyVerified ? 'unverify' : 'verify'}`;
      await api.patch(url);
      await fetchPayments();
    } catch (err) {
      alert('Action failed');
    }
  };

  const submitToSwift = async () => {
    try {
      setSubmitting(true);
      // Option A: submit all verified
      await api.post('/employee/submit', {});
      alert('Submitted to SWIFT (simulated)');
      await fetchPayments();
    } catch (err) {
      alert('Submit failed');
    } finally { setSubmitting(false); }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Account</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Recipient</th>
            <th>SWIFT</th>
            <th>Status</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && <tr><td colSpan="8">No payments</td></tr>}
          {payments.map(p => (
            <tr key={p._id}>
              <td>{p.customerId?.fullName || '—'}</td>
              <td>{p.customerId?.accountNumber || '—'}</td>
              <td>{p.amount}</td>
              <td>{p.currency}</td>
              <td>{p.recipientAccount}</td>
              <td>{p.swiftCode}</td>
              <td>{p.status}</td>
              <td>
                {p.status === 'submitted' ? 'Submitted' : (
                  <button onClick={() => toggleVerify(p._id, p.status === 'verified')}>
                    {p.status === 'verified' ? 'Unverify' : 'Verify'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button onClick={submitToSwift} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Verified to SWIFT'}
        </button>
      </div>
    </div>
  );
}
