const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

// @route			Get api/tasks
// @desc			Get user's tasks
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
		res.json(tasks);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error: Unable loading user tasks!');
	}
});

// @route			Post api/tasks
// @desc			Create a task
// @access		Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required!')
				.not()
				.isEmpty(),
			check('category', 'Category is required!')
				.not()
				.isEmpty(),
			check('rate', 'Rate is required!')
				.not()
				.isEmpty(),
			check('duration', 'Duration is required!')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ erros: errors.array() });
		}

		const { category, title, rate, duration } = req.body;

		try {
			const newTask = new Task({
				category,
				title,
				rate,
				duration,
				user: req.user.id
			});

			const task = await newTask.save();
			res.json(task);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Unable to Create the Task!');
		}
	}
);

module.exports = router;
