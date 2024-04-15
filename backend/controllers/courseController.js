// Importing mongoose for database operations
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

const { findUserByEmail } = require('../utils/db_utils');


const getCourses = async (req, res) => {
  const { email, role } = req.user;

  let userModel;

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
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await findUserByEmail(email, userModel, res);
    const courses = user.courses;

    res.status(200).json({courses});
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};


const addCourses = async (req, res) => {
  const { email, role } = req.user;
  const { courseName, courseDescription, teacherEmail } = req.body;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      const teacher = await findUserByEmail(teacherEmail, Teacher, res);

      // Check if the teacher already exists in the organization
      if (teacher && !teacher.organizationName.includes(user.organizationName)) {
        return res.status(400).json({ message: 'Teacher does not exist in your organization' });
      }

      // Check if the course already exists for the admin
      const existingCourse = await Course.findOne({
        courseName,
        organizationName: user.organizationName,
      });

      if (existingCourse) {
        return res.status(400).json({ message: 'Course already exists in your organization' });
      }

      // Create a new course with the teacher field populated
      const newCourse = new Course({
        courseName,
        courseDescription,
        organizationName: user.organizationName,
        teacher: teacher._id, // Populate the teacher field with the teacher's ObjectId
      });

      // Save the new course
      await newCourse.save();

      // Update admin's courses array with the new course
      user.courses.push(newCourse._id);
      await user.save();

      // Update teacher's courses array with the new course
      teacher.courses.push(newCourse._id);
      await teacher.save();

      // Update admin's teachers array
      if (!user.teachers.includes(teacher._id)) {
        user.teachers.push(teacher._id);
        await user.save();
      }

      res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const addCourseStudent = async (req, res) => {
  const { email, role } = req.user;
  const { courseId, studentEmail } = req.body;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);
      const student = await findUserByEmail(studentEmail, Student, res);

      // Check if the course exists
      const existingCourse = await Course.findOne({
        _id: courseId, // Change to search by _id
        organizationName: user.organizationName,
      });

      if (!existingCourse) {
        return res.status(400).json({ message: 'Course does not exist in your organization' });
      }

      // Check if the student already belongs to the course
      if (existingCourse.students.includes(student._id)) {
        return res.status(400).json({ message: 'Student already added to the course' });
      }

      // Check if the student belongs to the same organization as the course
      if (!student.organizationName.includes(existingCourse.organizationName)) {
        return res.status(400).json({ message: 'Student does not belong to this course organization' });
      }

      // Add the student to the course
      existingCourse.students.push(student._id);
      await existingCourse.save();

      // Update student's courses array with the new course
      student.courses.push(existingCourse._id);
      await student.save();

      // Update teacher's students array with the student
      const teacher = await Teacher.findById(existingCourse.teacher);
      teacher.students.push(student._id);
      await teacher.save();

      res.status(201).json({ message: 'Student added successfully', course: existingCourse });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error adding student to course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const getCourse = async (req, res) => {
  const { email, role } = req.user;
  const courseId = req.params.id;

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
    const user = await findUserByEmail(email, userModel, res);

    // Check if the course already exists for the user
    if (!user.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Course does not exist in your organization' });
    }

    // Assuming Course.findById returns the course object
    const course = await Course.findById(courseId);

    // Customize the response based on the user's role
    switch (role) {
      case 'admins':
        const { assignments, ...courseInfo } = course._doc;
        res.status(200).json({ courseInfo });
        break;
      case 'teachers':
        res.status(200).json({ course });
        break;
      case 'students':
        // Filter assignments relevant to the student
        const studentAssignments = course.assignments.filter(assignment => assignment.students.includes(user._id));
        const studentCourse = { ...course._doc, assignments: studentAssignments };
        res.status(200).json({ studentCourse });
        break;
      default:
        res.status(400).json({ message: 'You are not an admin, teacher, or student' });
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteCourse = async (req, res) => {
  const { email, role } = req.user;
  const courseId = req.params.id;

  try {
    if (role === 'admins') {
      const user = await findUserByEmail(email, Admin, res);

      // Check if the course exists for the user
      if (!user.courses.includes(courseId)) {
        return res.status(400).json({ message: 'Course does not exist in your organization' });
      }

      // Delete the course
      await Course.findByIdAndDelete(courseId);

      // Delete related assignments
      await Assignment.deleteMany({ course: courseId });

      // Update related entities (teachers and students)
      await Teacher.updateMany({ courses: courseId }, { $pull: { courses: courseId } });
      await Student.updateMany({ courses: courseId }, { $pull: { courses: courseId } });

      res.status(200).json({ message: 'Course and related assignments deleted successfully' });
    } else {
      res.status(400).json({ message: 'You are not an admin' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getCourses,
  addCourses,
  addCourseStudent,
  getCourse,
  deleteCourse
}
