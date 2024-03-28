/**
 * Importing Express framework for Node.js.
 * @module express
 */
const express = require('express');

/**
 * Importing middleware for JWT token authentication.
 * @module authMiddleware
 * @property {Function} authenticateToken - Middleware function for JWT token authentication.
 */
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * Importing controller function for handling user-related operations.
 * @module userController
 * @property {Function} user - Controller function for retrieving user information.
 */
const { user, getTeachers } = require('../controllers/userController');

/**
 * Creates an instance of Express router for defining API routes.
 * @type {Object}
 * @const router
 * @property {Function} get - Defines a route for handling GET requests.
 */
const router = express.Router();

// Define a route for handling GET requests at the root path '/'
router.get('/', authenticateToken, user);
// router.get('/

/**
 * Exporting the router instance to make it accessible from other modules.
 * @exports router
 */
module.exports = router;
