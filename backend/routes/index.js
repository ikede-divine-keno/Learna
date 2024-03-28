// Importing the Express framework for Node.js
const express = require('express');

// Importing the statsController from the controllers directory
const statsController = require('../controllers/index');

// Creating an Express router instance
const router = express.Router();

// Defining a route for handling GET requests at the root URL '/'
// The statsController will be called when this route is accessed
router.get('/', statsController);

// Exporting the router to make it accessible from other modules
module.exports = router;
