const { body, validationResult } = require('express-validator');

//
// 🔹 Login validation
//
const loginValidationRules = [
  body('accountNumber')
    .trim()
    .notEmpty()
    .withMessage('Account number is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

//
// 🔹 Customer registration input validation
//
const customerInputValidation = (req, res, next) => {
  const namePattern = /^[a-zA-Z\s]+$/;
  const idPattern = /^[0-9]{8,13}$/;
  const accountPattern = /^[0-9]{10,20}$/;

  const { fullName, idNumber, accountNumber } = req.body;

  if (!namePattern.test(fullName) || !idPattern.test(idNumber) || !accountPattern.test(accountNumber)) {
    return res.status(400).json({ error: "Invalid input format." });
  }
  next();
};

//
// 🔹 Validation result checker
//
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = {
  loginValidationRules,
  validate,
  customerInputValidation
};
