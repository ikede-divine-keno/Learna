// Importing Express framework for Node.js
const express = require('express');

// Importing the signUp function from the authController
const authController = require('../controllers/authController');

// Creating an Express router instance
const router = express.Router();

// Defining a route for handling POST requests at the '/signup' endpoint
// The signUp function from the authController will be called when this route is accessed
router.post('/signup', authController.signUp);

// Defining a route for handling POST requests at the '/signin' endpoint
router.post('/signin', authController.signIn);

// Exporting the router to make it accessible from other modules
module.exports = router;
