const { Schema, model } = require('mongoose');

const dishSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
});

module.exports = model('Dish', dishSchema);
