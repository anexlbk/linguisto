const express = require('express');
const router = express.Router();
const { protect } = require('../auth/middleware');

router.get('/', (req, res) => {
    res.json({ message: 'Jobs route working' });
});

router.post('/', protect, (req, res) => {
    res.json({ message: 'Create job route working' });
});

module.exports = router; 