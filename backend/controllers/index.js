// Importing required models for database operations
const Admin = require('../models/Admin'); // Importing Admin model
const Teacher = require('../models/Teacher'); // Importing Teacher model
const Student = require('../models/Student'); // Importing Student model

// Controller function to retrieve statistics from the database
const statsController = async (req, res) => {
  try {
    // Using Promise.all to fetch counts of different types of users concurrently
    const [adminCount, teacherCount, studentCount] = await Promise.all([
      Admin.find().countDocuments(), // Counting documents in Admin collection
      Teacher.find().countDocuments(), // Counting documents in Teacher collection
      Student.find().countDocuments(), // Counting documents in Student collection
    ]);

    // Sending JSON response with the counts of different types of users
    res.json({ admin: adminCount, teacher: teacherCount, student: studentCount });
  } catch (err) {
    // Handling errors and sending a 500 (Internal Server Error) response
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Exporting the statsController function to make it accessible from other modules
module.exports = statsController;
