// models\Measurement.js
const mongoose = require('mongoose');

// Define the 'Measurement' schema
const measurementSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    min: -500.0,
    max: 500.0,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the 'Measurement' model based on the schema
const Measurement = mongoose.model('Measurement', measurementSchema);

// Export the 'Measurement' model for use in other parts of the application
module.exports = Measurement;
