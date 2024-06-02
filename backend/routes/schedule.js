const express = require('express');
const jwt = require('jsonwebtoken');
const Schedule = require('../models/Schedule');

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.post('/schedule', authMiddleware, async (req, res) => {
    const { fullName, contactNumber, emailAddress, address, wasteType, instructions, pickupDate, pickupTime } = req.body;
    try {
        const schedule = new Schedule({
            userId: req.user.userId,
            fullName,
            contactNumber,
            emailAddress,
            address,
            wasteType,
            instructions,
            pickupDate,
            pickupTime
        });
        await schedule.save();
        res.status(201).json({ message: 'Pickup scheduled successfully' });
    } catch (error) {
        console.error('Error scheduling pickup:', error);
        res.status(500).json({ message: 'Error scheduling pickup' });
    }
});

module.exports = router;
