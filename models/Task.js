const mongoose = require('mongoose');
const Category = require('../models/Category');

const TaskSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	category: {
		type: String,
		default: Category.schema.path('title').path,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	memo: {
		type: String
	},
	rate: {
		type: Number,
		require: true
	},
	duration: {
		type: String,
		enum: ['Daily', 'Weekly', 'Monthly'],
		default: 'Daily',
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('task', TaskSchema);
