// app.js
const express = require('express');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars').create({ /* your configuration options here */ });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const User = require('./models/User'); 

const app = express();

// dotenv
require('dotenv').config();

// MongoDB connection
require("./config/mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Method Override Middleware
app.use(methodOverride('_method'));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Handlebars setup
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// Routes setup (to be implemented later)
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

//Express Static Middleware
app.use(express.static('public'));

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Use the routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
