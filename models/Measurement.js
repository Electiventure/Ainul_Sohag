// models\Measurement.js
const mongoose = require('mongoose');

// Define the 'Measurement' schema
const measurementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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


const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
