const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

// @route   Get api/tasks
// @desc    Get all tasks of an user
// @access  Private
router.get('');
