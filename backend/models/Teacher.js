// Importing Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Defining a Mongoose schema for the Teacher collection
const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First name of the teacher (required)
  lastName: { type: String, required: true }, // Last name of the teacher (required)
  email: { type: String, required: true, unique: true }, // Email of the teacher (required, unique)
  password: { type: String, required: true }, // Password of the teacher (required)
  organizationName: [{ type: String }], // Organization name(s) of the teacher (array of strings)
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Array of student references
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course references
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }] // Array of assignment references
});

// Exporting the Teacher model using the teacherSchema
module.exports = mongoose.model('Teacher', teacherSchema);
