// user.js (models/user.js)

const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        unique: true
    },
    last_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    },
    organizationName: {
        type: String,
        required: function() {
            return this.role === 'admin'; // Required only if role is admin
        }
    }
});

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;