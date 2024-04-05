// Importing mongoose for database operations
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');

const { findUserByEmail } = require('../utils/db_utils');


const getTeachers = async (req, res) => {
  const { email, role } = req.user;
  if (role === 'admins') {
    try {
      // Finding the user in the database using the selected userModel
      const user = await findUserByEmail(email, Admin, res);

      // Prepare the user object without sensitive information (e.g., password)
      const teachers = user._doc.teachers;

      // Send a 200 (OK) response with the user information in the JSON response
      res.status(200).json({ teachers });
    } catch (err) {
      // Handling errors and sending a 500 (Internal Server Error) response with the error message
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'You are not an admin' });
  }
}

const addTeachers = async (req, res) => {
  const { email, role } = req.user;
  const { teacherEmail } = req.body;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      const teacher = await findUserByEmail(teacherEmail, Teacher, res);

      if (user.teachers.includes(teacher._id)) {
        return res.status(400).json({ message: 'Teacher already added' });
      }

      user.teachers.push(teacher._id);
      await user.save();

      teacher.organizationName.push(user.organizationName);
      await teacher.save();

      res.status(201).json({ message: 'Teacher added successfully' });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getTeacher = async (req, res) => {
  const { email, role } = req.user;
  const teacherId = req.params.id;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      if (!user.teachers.includes(teacherId)) {
        return res.status(400).json({ message: 'Teacher does not exist in your organization' });
      }
      const teacher = await Teacher.findById(teacherId);
      const { password, __v, ...teacherInfo } = teacher._doc;
      res.status(200).json({ teacherInfo });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteTeacher = async (req, res) => {
  const { email, role } = req.user;
  const teacherId = req.query.id;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      if (!user.teachers.includes(teacherId)) {
        return res.status(400).json({ message: 'Teacher does not exist in your organization' });
      }
      const teacherIndex = user.teachers.indexOf(teacherId);
      user.teachers.splice(teacherIndex, 1);
      await user.save();

      const organizationName = user.organizationName;
      const teacher = await Teacher.findById(teacherId);
      teacher.organizationName.splice(teacher.organizationName.indexOf(organizationName), 1);
      await teacher.save();


      res.status(200).json({ message: 'Teacher removed successfully' });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getTeachers,
  addTeachers,
  getTeacher,
  deleteTeacher
}
