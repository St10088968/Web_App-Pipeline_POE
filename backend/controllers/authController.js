const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, idNumber, accountNumber, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    console.log('Login attempt:', req.body);

    // Find user by account number
    const user = await User.findOne({ accountNumber });
    console.log('Found user:', user); // Moved outside the role check

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    // Only allow employees or customers
    if (user.role !== 'employee' && user.role !== 'customer') {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    // Set session
    req.session.userId = user._id;
    req.session.role = user.role;

    res.json({ message: "Login successful", role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

