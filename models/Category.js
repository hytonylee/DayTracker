const mongoose = require('mongoose');

const CategoryScehma = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		unique: true,
		required: true
	},
	icon: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('category', CategoryScehma);
