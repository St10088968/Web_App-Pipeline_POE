const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, provider, recipientAccount, swiftCode } = req.body;
    const payment = new Payment({
      customerId: req.session.userId,
      amount,
      currency,
      provider,
      recipientAccount,
      swiftCode
    });
    await payment.save();
    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
