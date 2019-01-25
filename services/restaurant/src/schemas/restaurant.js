const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
	name: { type: String, required: true },
	address: String,
	dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
});

module.exports = model('Restaurant', restaurantSchema);
