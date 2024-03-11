// routes/index.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username: req.body.username });

      if (existingUser) {
          // User with the given username already exists
          return res.status(400).send('Username is already taken');
      }

      // Continue with user registration
      const user = new User({ username: req.body.username });
      await user.setPassword(req.body.password);
      await user.save();

      // User registered successfully
      res.redirect('/user/login');
  } catch (error) {
      // Handle errors, e.g., database error or registration error
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}), (req, res) => {});

// Logout
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Home route
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});


module.exports = router;