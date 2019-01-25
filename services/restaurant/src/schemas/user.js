const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true },
	authKey: [{ type: Schema.Types.ObjectId, ref: 'AuthKey' }],
	conf: {
		hashPassword: { type: String },
		blocked: { type: Boolean, default: false },
	},
	info: {
		registered_at: { type: Date, default: Date.now },
	},
});

module.exports = model('User', userSchema);
