import React, { useState } from 'react';
import { api } from '../services/api';

export default function PaymentPage() {
  const [form, setForm] = useState({
    amount: '',
    currency: 'ZAR',
    provider: 'SWIFT',
    recipientAccount: '',
    swiftCode: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post('/payments', form);
      alert('Payment Successful');
    } catch {
      alert('Payment Failed');
    }
  };

  return (
    <div>
      <h2>SWIFT Payment</h2>
      <input name="amount" placeholder="Amount" onChange={handleChange} />
      <select name="currency" onChange={handleChange}>
        <option value="ZAR">ZAR</option>
        <option value="USD">USD</option>
      </select>
      <input name="recipientAccount" placeholder="Recipient Account" onChange={handleChange} />
      <input name="swiftCode" placeholder="SWIFT Code" onChange={handleChange} />
      <button onClick={handleSubmit}>Pay Now</button>
    </div>
  );
}
