const express = require('express');
const router = express.Router();
const { protect } = require('../auth/middleware');

router.post('/create-payment', protect, (req, res) => {
    res.json({ message: 'Create payment route working' });
});

router.post('/webhook', (req, res) => {
    res.json({ message: 'Webhook route working' });
});

module.exports = router; 