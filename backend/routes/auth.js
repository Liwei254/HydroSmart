const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginUser');
const { registerUser } = require('../controllers/registerController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

module.exports = router;
