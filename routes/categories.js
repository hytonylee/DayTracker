const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Category = require('../models/Category');

// @route     Get api/categories
// @desc      Get all categories
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		const categories = await Category.find({ user: req.user.id })
			.find()
			.sort({ date: -1 });
		res.json(categories);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error: Unable to load category data!');
	}
});

// @route   Post api/categories
// @desc    Create a category
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required!')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, icon } = req.body;

		try {
			const newCategory = new Category({
				title,
				icon,
				user: req.user.id
			});

			const category = await newCategory.save();
			res.json({ message: 'Category Save Success!' } + category);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Unable to Save the Category!');
		}
	}
);

// @route			Put api/categories/:id
// @desc			Update a category
// @access		Private
router.put('/:id', auth, async (req, res) => {
	const { title, icon } = req.body;
	const categoryFields = {};
	if (title) categoryFields.title = title;
	if (icon) categoryFields.icon = icon;

	try {
		let category = await Category.findById(req.params.id);
		if (!category) return res.json({ msg: 'Category Not Found!' });

		category = await Category.findByIdAndUpdate(
			req.params.id,
			{ $set: categoryFields },
			{ new: true }
		);
		res.json(category);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Category Update Error!');
	}
});

module.exports = router;
