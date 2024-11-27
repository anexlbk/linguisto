const express = require('express');
const router = express.Router();

// Example user route
router.post('/login', (req, res) => {
  res.json({ message: 'Login route working!' });
});

module.exports = router;