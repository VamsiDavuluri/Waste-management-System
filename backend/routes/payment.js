const express = require('express');
const jwt = require('jsonwebtoken');
const Payment = require('../models/Payment');

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

router.post('/pay', authMiddleware, async (req, res) => {
    const { name, cardNumber, expiryDate, cvv, amount } = req.body;
    try {
        const payment = new Payment({
            userId: req.user.userId,
            name,
            cardNumber,
            expiryDate,
            cvv,
            amount
        });
        await payment.save();
        res.status(201).json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

module.exports = router;
