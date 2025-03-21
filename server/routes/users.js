const express = require('express');
const router = express.Router();

// User routes
router.get('/', (req, res) => {
    res.json({ message: 'Users route working' });
});

module.exports = router; 