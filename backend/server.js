// 🔹 Core imports
const fs = require('fs');
const https = require('https');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 🔹 Route imports
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const seedEmployees = require('./seeds/seedEmployees');

dotenv.config();
const app = express();

//
// 🛡️ Security & Middleware
//
app.use(helmet()); // Secure HTTP headers
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

//
// 🚫 Rate limiting
//
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests, try later.'
});
app.use(limiter);

//
// 🍪 Session management (must be before CSRF)
//
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,  // HTTPS only
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

//
// 🔐 CSRF Protection
//
app.use(csrf({ cookie: true }));

// CSRF error handler
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') return res.status(403).json({ error: 'Invalid CSRF token' });
  next();
});

//
// 🧭 Routes (after session & CSRF)
//
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/employee', employeeRoutes);

//
// 💾 MongoDB connection + seeding
//
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    if (seedEmployees) {
      await seedEmployees();
      console.log("👨‍💼 Employee accounts seeded successfully");
    }
  })
  .catch(err => console.error("❌ DB connection failed:", err));

//
// 🔐 HTTPS setup
//
const options = {
  key: fs.readFileSync('./config/private.key'),
  cert: fs.readFileSync('./config/certificate.crt')
};

https.createServer(options, app).listen(process.env.PORT || 443, () => {
  console.log("✅ HTTPS server running on https://localhost");
});

// Optional HTTP fallback
// app.listen(5000, () => console.log("Server running on http://localhost:5000"));
