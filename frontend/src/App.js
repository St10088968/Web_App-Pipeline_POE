// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🔹 Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerPortal from './pages/CustomerPortal';
import PaymentPage from './pages/PaymentPage';
import EmployeePortal from './pages/EmployeePortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/employee" element={<EmployeePortal />} /> {/* ✅ Added EmployeePortal route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
