const express = require('express');
const router = express.Router();

// Import controllers
const { register, login } = require('../controllers/authController');
const validateRegistrationUser=require('../middleware/auth');

router.post('/register',validateRegistrationUser, register);
router.post('/login', login);

module.exports = router;
