const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const authRoutes = require('./auth');
const postRoutes = require('./post');

// Routes
router.use('/users', userRoutes); 
router.use('/auth', authRoutes); 
router.use('/post', postRoutes); 

module.exports = router;
