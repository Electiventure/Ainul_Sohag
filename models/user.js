// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the 'User' schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Plugin Passport-Local Mongoose to simplify username/password management
userSchema.plugin(passportLocalMongoose);

// Create the 'User' model based on the schema
const User = mongoose.model('User', userSchema);

// Export the 'User' model for use in other parts of the application
module.exports = User;
