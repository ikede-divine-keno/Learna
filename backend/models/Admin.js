// Importing Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Defining a Mongoose schema for the Admin collection
const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // First name of the admin (required)
  lastName: { type: String, required: true }, // Last name of the admin (required)
  email: { type: String, required: true, unique: true }, // Email of the admin (required, unique)
  organizationName: { type: String, required: true }, // Organization name of the admin (required)
  password: { type: String, required: true }, // Password of the admin (required)
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }], // Array of teacher references
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // Array of student references
});

// Exporting the Admin model using the adminSchema
module.exports = mongoose.model('Admin', adminSchema);
