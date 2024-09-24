const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const { ValidationError } = require('sequelize');

//Initialize the Express application:
const app = express();

//Connect the `morgan` middleware for logging information about requests and
//responses:
app.use(morgan('dev'));

//Add the `cookie-parser` middleware for parsing cookies and the `express.json`
//middleware for parsing JSON bodies of requests with `Content-Type` of
//`"application/json"`.
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  // backend/app.js
const routes = require('./routes');

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Error formatter (original)
// app.use((err, _req, res, _next) => {
//   res.status(err.status || 500);
//   console.error(err);
//   res.json({
//     title: err.title || 'Server Error',
//     message: err.message,
//     errors: err.errors,
//     stack: isProduction ? null : err.stack
//   });
// });

//-------------------------------------------------
//  "username": "username must be unique"


// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  let response = {
    message: err.message || 'Server Error',
    errors: err.errors || {},
    stack: isProduction ? null: err.ctack
  };

  if (err.name === 'SequelizeUniqueConstraintError') {
    response.message = 'User already exists';

    if (response.errors.email === "email must be unique" || response.errors.username === "username must be unique") {
    
      response.errors.email = "User with that email already exists";
      response.errors.username = "User with that username already exists";
    }
  }

 

    if (response.errors.email === "Please provide a valid email.") {   
      response.message = "Bad Request";
      response.errors.email = "Invalid email";
    }
    if (response.errors.lastName === "User.lastName cannot be null") { 
      response.message = "Bad Request";   
      response.errors.lastName = "Last Name is required";
    }
    if (response.errors.username === "Please provide a username with at least 4 characters.") {    
      response.message = "Bad Request";
      response.errors.username = "Username is required";
    }
    if (response.errors.firstName === "User.firstName cannot be null") {    
      response.message = "Bad Request";
      response.errors.firstName = "First Name is required";
    }
   

  res.json(response);

})

//-----------------------------------------------------------------------
  

















module.exports = app;