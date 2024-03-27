// Importing required modules for creating an Express application
const express = require('express'); // Express framework for Node.js

// Middlewares
// for parsing JSON and URL-encoded data
const bodyParser = require('body-parser'); 
// for enabling Cross-Origin Resource Sharing (CORS)
const cors = require('cors');

// Creating an Express application
const app = express();

// Using CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Using bodyParser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Using bodyParser middleware to parse incoming URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Exporting the Express application to make it accessible from other modules
module.exports = app;
