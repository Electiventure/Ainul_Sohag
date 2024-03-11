// app.js
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars').create({ /* your configuration options here */ });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/user'); // Create this model for user authentication

const app = express();

// dotenv
require('dotenv').config();

// MongoDB connection
require("./config/mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Method Override Middleware
app.use(methodOverride('_method'));

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Include the 'Thing' model
const Thing = require('./models/thing'); // Corrected lowercase 'thing' here

// Routes setup (to be implemented later)
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

//Express Static Middleware
app.use(express.static('public'));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
