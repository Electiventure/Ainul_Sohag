// routes/index.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Thing = require('../models/thing');

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




// CRUD operations for 'Thing' model
// routes/index.js

// ... (existing code)

// CRUD operations for 'Thing' model
router.get('/things', async (req, res) => {
  try {
      const things = await Thing.find({});
      res.render('things/index', { things });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/things/new', (req, res) => {
  res.render('things/new');
});


//Create new thing// Inside your POST route for creating a new 'Thing'
router.post('/things', (req, res) => {
  // Ensure required fields are provided in the request body
  if (!req.body.thing.place || !req.body.thing.date || !req.body.thing.value || !req.body.thing.type) {
    return res.status(400).send('All fields are required');
  }

  // Create the 'Thing'
  Thing.create(req.body.thing)
    .then(newThing => {
      res.redirect('/things');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});




// Read......!!
router.get('/things/:id', async (req, res) => {
  try {
      const foundThing = await Thing.findById(req.params.id);
      res.render('things/show', { thing: foundThing });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

// Edit......!!
router.get('/things/:id/edit', async (req, res) => {
  try {
      // Ensure req.params.id is properly handled
      const foundThing = await Thing.findById(req.params.id);
      res.render('things/edit', { thing: foundThing });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//Update
router.put('/things/:id', async (req, res) => {
  try {
      await Thing.findByIdAndUpdate(req.params.id, req.body.thing);
      res.redirect('/things/' + req.params.id);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//Delete 
router.delete('/things/:id', async (req, res) => {
  try {
      await Thing.findByIdAndRemove(req.params.id);
      res.redirect('/things');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
})
module.exports = router;