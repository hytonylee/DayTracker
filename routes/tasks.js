const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

// Get all tasks

// Get a User's tasks
router.get('/', (req, res) => {
	res.send('Welcome to the browser!');
});

// Get a User's Single task

// Update a User's task

// Delete a User's task

module.exports = router;
