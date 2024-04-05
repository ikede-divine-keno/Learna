const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  assignmentDescription: { type: String, required: true },
  organizationName: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  grade: { type: Number, default: 0 },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
