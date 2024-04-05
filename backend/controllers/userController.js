// Importing mongoose for database operations
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const { findUserByEmail } = require('../utils/db_utils');

/**
 * Retrieves user information based on their role and email.
 * @param {Object} req - The request object containing user information (req.user).
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} JSON response with user information or error message.
 */
const user = async (req, res) => {
  // Destructuring user information from the request object
  const { email, role } = req.user;
  let userModel;

  // Switch statement to determine the appropriate Mongoose model based on the user's role
  switch (role) {
    case 'admins':
      userModel = Admin;
      break;
    case 'teachers':
      userModel = Teacher;
      break;
    case 'students':
      userModel = Student;
      break;
    default:
      // Return a 400 (Bad Request) response if the role is invalid
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Finding the user in the database using the selected userModel
    const user = await findUserByEmail(email, userModel, res);

    // Prepare the user object without sensitive information (e.g., password)
    const { password, __v, ...userInfo } = user._doc;
    userInfo.role = role;

    // Send a 200 (OK) response with the user information in the JSON response
    res.status(200).json({ user: userInfo });
  } catch (err) {
    // Handling errors and sending a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: err.message });
  }
};

// Exporting the user function to make it accessible from other modules
module.exports = {
  user
};

