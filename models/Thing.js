// models/thing.js
const mongoose = require('mongoose');

// Define the 'Thing' schema
const thingSchema = new mongoose.Schema({
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

// Create the 'Thing' model based on the schema
const Thing = mongoose.model('Thing', thingSchema);

// Export the 'Thing' model for use in other parts of the application
module.exports = Thing;
