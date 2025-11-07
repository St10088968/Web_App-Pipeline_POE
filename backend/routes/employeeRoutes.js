const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireEmployee = require('../middleware/requireEmployee');
const { loginValidationRules, validate } = require('../middleware/validation');
const controller = require('../controllers/employeeController');

//
// 🔹 Public Employee Routes
//
router.get('/login', controller.showLogin);
router.post('/login', loginValidationRules, validate, controller.login);

//
// 🔹 Protected Employee Routes (require auth + employee role)
//
router.use(requireAuth, requireEmployee);

router.get('/payments', controller.getPendingPayments);
router.patch('/payments/:id/verify', controller.verifyPayment);
router.patch('/payments/:id/unverify', controller.unverifyPayment);
router.post('/submit', controller.submitToSwift);

// Dashboard (authentication required)
router.get('/dashboard', requireAuth, controller.dashboard);

module.exports = router;
