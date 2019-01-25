const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true },
	conf: {
		hashPassword: { type: String },
	},
	info: {
		registered_at: { type: Date, default: Date.now },
	},
});

module.exports = model('User', userSchema);
