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

const { user } = require('../controllers/userController');
const { getTeachers, addTeachers, getTeacher, deleteTeacher } = require('../controllers/teacherController');
const { getStudents, addStudents, getStudent, deleteStudent } = require('../controllers/studentController');
const { getCourses, addCourses, getCourse, deleteCourse, addCourseStudent } = require('../controllers/courseController');


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

// Define a route for handling GET requests at the '/teachers' path
router.get('/teachers/:id', authenticateToken, getTeacher);
router.get('/teachers', authenticateToken, getTeachers);
router.post('/teachers', authenticateToken, addTeachers);
router.delete('/teachers', authenticateToken, deleteTeacher);

// Define a route for handling GET requests at the '/students' path
router.get('/students/:id', authenticateToken, getStudent);
router.get('/students', authenticateToken, getStudents);
router.post('/students', authenticateToken, addStudents);
router.delete('/students', authenticateToken, deleteStudent);

// Define a route for handling GET requests at the '/courses' path
router.get('/courses/:id', authenticateToken, getCourse);
router.get('/courses/:id/students', authenticateToken, addCourseStudent);
router.get('/courses', authenticateToken, getCourses);
router.post('/courses', authenticateToken, addCourses);
router.delete('/courses', authenticateToken, deleteCourse);

/**
 * Exporting the router instance to make it accessible from other modules.
 * @exports router
 */
module.exports = router;
