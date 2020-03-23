const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @routes 			api/users
// @desc	 			Get users
// @access 			Public
router.get('/', async (req, res) => {
	try {
		const users = await User.find().sort({
			date: -1
		});
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error: unable to load user data');
	}
});

// @route  			POST api/users
// @desc	 			Register a user
// @access 			Public
router.post(
	'/',
	[
		check('name', 'Please add a name!')
			.not()
			.isEmpty(),
		check('email', 'Please include valid email address!').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists!' });
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				// config.get('jwtSecret0' || 'jwtSecret1' || 'jwtSecreet2')
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!');
		}
	}
);

// @route				POST api/user/:id
// @desc				Update Account Info
// @access			Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, password } = req.body;
	const salt = await bcrypt.gentSalt(10);

	// Build user obj
	const userFields = {};
	if (name) userFields.name = name;
	if (email) userFields.email = email;
	if (password) userFields.password = await bcrypt.hash(password, salt);

	try {
		let user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ msg: 'User Not Found' });

		use = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: userFields },
			{ new: true }
		);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error!');
	}
});

module.exports = router;
