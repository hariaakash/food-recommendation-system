const nanoid = require('nanoid');

const { Schema, model } = require('mongoose');

const authKeySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	token: { type: String, default: nanoid },
	createdAt: {
		type: Date,
		expires: 60, // In seconds
		default: Date.now,
	},
});

module.exports = model('AuthKey', authKeySchema);
