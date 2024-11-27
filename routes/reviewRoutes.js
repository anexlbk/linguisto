const express = require('express');
const router = express.Router();
const { protect } = require('../auth/middleware');

router.post('/', protect, (req, res) => {
    res.json({ message: 'Create review route working' });
});

router.get('/translator/:id', (req, res) => {
    res.json({ message: 'Get translator reviews working' });
});

module.exports = router; 