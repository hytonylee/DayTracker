const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'categories'
	},
	title: {
		type: String,
		require: true
	},
	memo: {
		type: String,
		required: true
	},
	display: {
		type: String,
		required: true
	},
	duration: {
		type: String,
		enum: ['Daily', 'Weekly', 'Monthly'],
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('task', TaskSchema);
