// backend/seeds/seedEmployees.js
const mongoose = require('mongoose');
const Employee = require('../models/Employee'); // Adjust path if needed
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Your User model

require('dotenv').config();

const seedEmployees = async () => {
  try {
    // Check if the employee already exists
    const existing = await Employee.findOne({ email: 'admin@example.com' });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await Employee.create({
        displayName: 'Admin User',      // REQUIRED
        username: 'admin',             // REQUIRED
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'employee'
      });
      console.log('✅ Employee seeded');
    }
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
};

module.exports = seedEmployees;
