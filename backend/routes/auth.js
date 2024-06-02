const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importing the User model

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Login request received:', { email, password });

        // Use the User model to find a user by email in the users collection
        const user = await User.findOne({ email });
        console.log('User found:', user);

        // If the user does not exist, return an error
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored plain text password
        const isMatch = password === user.password;
        console.log('Password match:', isMatch);

        // If the passwords do not match, return an error
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

        // Return the token to the client
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
