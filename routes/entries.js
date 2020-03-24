const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Entry = require('../models/Entry');

router.get('/', (req, res) => {
	res.json('connect to entries endpoint!');
});

module.exports = router;
