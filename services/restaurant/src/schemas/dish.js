const { Schema, model } = require('mongoose');

const dishSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
});

module.exports = model('Dish', dishSchema);
