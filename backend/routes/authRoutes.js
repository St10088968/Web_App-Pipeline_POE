const express = require('express');
const router = express.Router();
const { loginValidationRules, validate, customerInputValidation } = require('../middleware/validation');
const controller = require('../controllers/authController');

// 🔹 CSRF token route
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// 🔹 Register new customer
router.post('/register', customerInputValidation, validate, controller.register);

// 🔹 Login route
router.post('/login', loginValidationRules, validate, controller.login);

module.exports = router;
