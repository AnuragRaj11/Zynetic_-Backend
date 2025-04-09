const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

module.exports = router;
