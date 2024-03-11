// routes/index.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Measurement = require('../models/measurement');

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
      res.redirect('/login');
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

// routes/index.js




// CRUD operations for 'Measurement' model
// routes/index.js

// ... (existing code)

// CRUD operations for 'Measurement' model
router.get('/measurements', async (req, res) => {
  try {
      const measurements = await Measurement.find({});
      res.render('measurements/index', { measurements });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/measurements/new', (req, res) => {
  res.render('measurements/new');
});


//Create new measurement// Inside your POST route for creating a new 'Measurement'
router.post('/measurements', (req, res) => {
  // Ensure required fields are provided in the request body
  if (!req.body.measurement.place || !req.body.measurement.date || !req.body.measurement.value || !req.body.measurement.type) {
    return res.status(400).send('All fields are required');
  }

  // Create the 'Measurement'
  Measurement.create(req.body.measurement)
    .then(newMeasurement => {
      res.redirect('/measurements');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});




// Read......!!
router.get('/measurements/:id', async (req, res) => {
  try {
      const foundMeasurement = await Measurement.findById(req.params.id);
      res.render('measurements/show', { measurement: foundMeasurement });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Edit......!!
router.get('/measurements/:id/edit', async (req, res) => {
  try {
      // Ensure req.params.id is properly handled
      const foundMeasurement = await Measurement.findById(req.params.id);
      res.render('measurements/edit', { measurement: foundMeasurement });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//Update
router.put('/measurements/:id', async (req, res) => {
  try {
      await Measurement.findByIdAndUpdate(req.params.id, req.body.measurement);
      res.redirect('/measurements/' + req.params.id);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//Delete 
router.delete('/measurements/:id', async (req, res) => {
  try {
      await Measurement.findByIdAndRemove(req.params.id);
      res.redirect('/measurements');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
})
module.exports = router;