const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'categories'
	},
	task: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'entries'
	},
	complete: {
		type: Boolean,
		default: false,
		required: true
	},
	memo: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('entry', EntrySchema);
