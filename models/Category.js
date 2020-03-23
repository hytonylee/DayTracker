const monogoose = require('mongoose');

const CategoryScehma = monogoose.Schema({
	user: {
		type: monogoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
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
