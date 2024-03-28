// signup.js (routes/signup.js)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// POST route for user registration
router.post('/api/signup', async (req, res) => {
    try {
        // Extract user data from request body
        const { firstName, lastName, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        // If admin role is selected, add organization name to user object
        if (role === 'admin') {
            const { organizationName } = req.body;
            // Check if organization name is provided
            if (!organizationName) {
                return res.status(400).json({ message: 'Organization Name is required for Admin role.' });
            }
            user.organizationName = organizationName;
        }

        // Save user to the database
        await user.save();

        // Send response
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;