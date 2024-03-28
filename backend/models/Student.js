// Importing Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Defining a Mongoose schema for the Student collection
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First name of the student (required)
  lastName: { type: String, required: true }, // Last name of the student (required)
  email: { type: String, required: true, unique: true }, // Email of the student (required, unique)
  password: { type: String, required: true }, // Password of the student (required)
  organizationName: [{ type: String }], // Organization name(s) of the student (array of strings)
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course references
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }] // Array of assignment references
});

// Exporting the Student model using the studentSchema
module.exports = mongoose.model('Student', studentSchema);
