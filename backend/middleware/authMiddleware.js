/**
 * Importing the jsonwebtoken (JWT) library for token generation and verification.
 */
const jwt = require('jsonwebtoken');

/**
 * Loading environment variables from a .env file using the dotenv package.
 * This is used to securely store sensitive information like secret keys.
 */
require('dotenv').config();



/**
 * Middleware function to authenticate JWT tokens in incoming requests.
 * @param {Object} req - The request object containing headers with JWT token.
 * @param {Object} res - The response object to send back to the client.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Function} Calls the next middleware function if authentication is successful.
 */
const authenticateToken = (req, res, next) => {
  // Extracting the JWT token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // Checking if a token is provided in the request headers
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verifying the JWT token with the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Handling token verification errors (e.g., expired token)
      return res.status(403).json({ message: 'Token expired' });
    }
    
    // If token is valid, attaching the user object to the request for further processing
    req.user = user;
    next(); // Calling the next middleware function in the chain
  });
};

// Exporting the authenticateToken middleware for use in other modules
module.exports = {
  authenticateToken
};
