// Importing mongoose for database operations
const Admin = require('../models/Admin');
const Student = require('../models/Student');

const { findUserByEmail } = require('../utils/db_utils');


const getStudents = async (req, res) => {
  const { email, role } = req.user;
  if (role === 'admins') {
    try {
      // Finding the user in the database using the selected userModel
      const user = await findUserByEmail(email, Admin, res);

      // Prepare the user object without sensitive information (e.g., password)
      const students = user._doc.students;

      // Send a 200 (OK) response with the user information in the JSON response
      res.status(200).json({ students });
    } catch (err) {
      // Handling errors and sending a 500 (Internal Server Error) response with the error message
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'You are not an admin' });
  }
}

const addStudents = async (req, res) => {
  const { email, role } = req.user;
  const { studentEmail } = req.body;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      const student = await findUserByEmail(studentEmail, Student, res);

      if (user.students.includes(student._id)) {
        return res.status(400).json({ message: 'Student already added' });
      }

      user.students.push(student._id);
      await user.save();

      student.organizationName.push(user.organizationName);
      await student.save();

      res.status(201).json({ message: 'Student added successfully' });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getStudent = async (req, res) => {
  const { email, role } = req.user;
  const studentId = req.params.id;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      if (!user.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student does not exist in your organization' });
      }
      const student = await Student.findById(studentId);
      const { password, __v, ...studentInfo } = student._doc;
      res.status(200).json({ studentInfo });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteStudent = async (req, res) => {
  const { email, role } = req.user;
  const studentId = req.query.id;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      if (!user.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student does not exist in your organization' });
      }
      const studentIndex = user.students.indexOf(studentId);
      user.students.splice(studentIndex, 1);
      await user.save();

      const organizationName = user.organizationName;
      const student = await Student.findById(studentId);
      student.organizationName.splice(student.organizationName.indexOf(organizationName), 1);
      await student.save();


      res.status(200).json({ message: 'Student removed successfully' });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getStudents,
  addStudents,
  getStudent,
  deleteStudent
}
