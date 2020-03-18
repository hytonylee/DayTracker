const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Login
router.get('/login', (req, res) => {
	res.send('Login');
});

// Register
router.get('/register', (req, res) => {
	res.send('Register');
});

module.exports = router;
