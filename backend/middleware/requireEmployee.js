// backend/middleware/requireEmployee.js
module.exports = function requireEmployee(req, res, next) {
  if (!req.session || req.session.role !== 'employee') {
    return res.status(403).json({ error: 'Forbidden: employees only' });
  }
  next();
};
