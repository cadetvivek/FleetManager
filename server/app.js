// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicleRoutes'); // Adjust path as per your structure
const userRoutes = require('./routes/users'); // Now this will work

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);

// Optional: Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

module.exports = app;