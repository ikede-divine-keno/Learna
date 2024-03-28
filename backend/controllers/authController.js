// Importing bcrypt for password hashing
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Importing models for database operations
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Function to create and return a new instance of a specified model
const model = (modelName, firstName, lastName, email, password, organizationName) => {
  if (modelName === 'Admin') {
    return new Admin({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      organizationName: organizationName
    });
  } else {
    return new modelName({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }
};

// Controller function for user signup
const signUp = async (req, res) => {
  // Checking if the user with the provided email already exists
  if (await Admin.findOne({ email: req.body.email }) ||
    await Teacher.findOne({ email: req.body.email }) ||
    await Student.findOne({ email: req.body.email })) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Determining the user role and creating a new user instance accordingly
    if (req.body.role.toLowerCase() === 'admin') {
      const admin = model(
        'Admin',
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword,
        req.body.organizationName
      );
      await admin.save(); // Saving the new admin instance to the database
      res.status(201).json({ message: 'Admin created successfully' });
    } else if (req.body.role.toLowerCase() === 'teacher') {
      const teacher = model(
        Teacher,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword
      );
      await teacher.save(); // Saving the new teacher instance to the database
      res.status(201).json({ message: 'Teacher created successfully' });
    } else {
      const student = model(
        Student,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword
      );
      await student.save(); // Saving the new student instance to the database
      res.status(201).json({ message: 'Student created successfully' });
    }
  } catch (err) {
    // Handling errors and sending a 500 (Internal Server Error) response
    res.status(500).json({ message: err.message });
  }
};

// Controller function for user signIn
const signIn = async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email }) ||
      await Teacher.findOne({ email: req.body.email }) ||
      await Student.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Setting the JWT token for the 
    const role = user.collection.name;
    const userEmail = { email: user.email, role: role };
    const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });

    // Prepare the user object without sensitive information
    const { password, __v, ...userInfo } = user._doc;
    userInfo.role = role;

    res.status(200).json({
      message: 'User authenticated successfully',
      user: userInfo,
      accessToken: token,
    });
  } catch (err) {
    // Handling errors and sending a 500 (Internal Server Error) response
    res.status(500).json({ message: err.message });
  }
};

// Exporting the signUp function to make it accessible from other modules
module.exports = {
  signUp,
  signIn
};
