// routes/measurements.js
const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');
const passport = require('passport');

// Middleware to ensure authentication
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login'); // Redirect to login page if not authenticated
};

// Create a new measurement
router.post('/measurements', isLoggedIn, async (req, res) => {
  try {
    const newMeasurement = new Measurement({
      place: req.body.place,
      date: req.body.date,
      value: req.body.value,
      type: req.body.type,
      user: req.user._id, // Associate the measurement with the user's ObjectId
    });

    const savedMeasurement = await newMeasurement.save();
    res.status(201).json(savedMeasurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all measurements for the logged-in user
router.get('/measurements', isLoggedIn, async (req, res) => {
  try {
    const measurements = await Measurement.find({ user: req.user._id });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific measurement by ID for the logged-in user
router.get('/measurements/:id', isLoggedIn, async (req, res) => {
  try {
    const measurement = await Measurement.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!measurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a measurement by ID for the logged-in user
router.put('/measurements/:id', isLoggedIn, async (req, res) => {
  try {
    const updatedMeasurement = await Measurement.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        $set: {
          place: req.body.place,
          date: req.body.date,
          value: req.body.value,
          type: req.body.type,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedMeasurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    res.json(updatedMeasurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a measurement by ID for the logged-in user
router.delete('/measurements/:id', isLoggedIn, async (req, res) => {
  try {
    const deletedMeasurement = await Measurement.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedMeasurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    res.json({ message: 'Measurement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
