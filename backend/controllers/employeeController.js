// backend/controllers/employeeController.js
const mongoose = require('mongoose');
const Payment = require('../models/Payment');

// -------------------------
// AUTH & DASHBOARD HANDLERS
// -------------------------

// Show employee login page
exports.showLogin = (req, res) => {
  res.send('Employee login page');
};

// Handle login form submission
exports.login = (req, res) => {
  res.send('Employee login processing');
};

// Protected employee dashboard
exports.dashboard = (req, res) => {
  res.send('Employee dashboard');
};

// -------------------------
// PAYMENT HANDLERS
// -------------------------

// Get all pending or verified payments
exports.getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: { $in: ['pending', 'verified'] } })
      .populate('customerId', 'fullName accountNumber');
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify a payment
exports.verifyPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: 'Not found' });
    if (payment.status === 'submitted') {
      return res.status(400).json({ error: 'Already submitted' });
    }

    payment.status = 'verified';
    payment.verifiedBy = req.session?.userId || 'system';
    payment.verifiedAt = new Date();
    await payment.save();

    res.json({ message: 'Payment verified', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unverify a payment
exports.unverifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Not found' });
    if (payment.status === 'submitted') {
      return res.status(400).json({ error: 'Already submitted' });
    }

    payment.status = 'pending';
    payment.verifiedBy = null;
    payment.verifiedAt = null;
    await payment.save();

    res.json({ message: 'Payment unverified', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit verified payments to SWIFT (simulated)
exports.submitToSwift = async (req, res) => {
  try {
    const { paymentIds } = req.body;
    const filter = paymentIds?.length
      ? { _id: { $in: paymentIds }, status: 'verified' }
      : { status: 'verified' };

    const updated = await Payment.updateMany(filter, {
      $set: { status: 'submitted' }
    });

    res.json({
      message: 'Submitted to SWIFT (simulated)',
      modifiedCount: updated.modifiedCount || updated.nModified || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
