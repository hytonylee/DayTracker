const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

router.get('/', (req, res) => {
	res.send('Welcome to the browser!');
});

module.exports = router;
