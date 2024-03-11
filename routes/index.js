// routes/index.js
const express = require('express');
const router = express.Router();

// Import measurement and user routes
const measurementRoutes = require('./measurements');
const userRoutes = require('./users');

// Use the measurement and user routes
router.use('/api', measurementRoutes);
router.use('/user', userRoutes);

// Home route
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});


module.exports = router;