const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL, update 'MONGODB_URL' in (.env) file
const uri = process.env.MONGODB_URL;

mongoose.connect(uri);
const db = mongoose.connection;

// Event handling for successful connection
db.on('connected', () => {
  console.log(`Connected to MongoDB at ${uri}`);
});

// Event handling for connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Event handling for disconnection
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Gracefully close MongoDB connection on process termination
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

module.exports = db;
