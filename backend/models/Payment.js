// backend/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true, default: 'SWIFT' },
  recipientAccount: { type: String, required: true },
  swiftCode: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified', 'submitted'], default: 'pending' },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  verifiedAt: { type: Date },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
