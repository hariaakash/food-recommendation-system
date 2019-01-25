const mongoose = require('mongoose');

const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Restaurant.findById(_id)
			.then((restaurant) => {
				if (restaurant) {
					const id = mongoose.Types.ObjectId();
					restaurant.dishes.push(id);
					restaurant
						.save()
						.then(() => resolve({ status: 200, data: { _id: id } }))
						.catch((err) => resolve({ status: 500 }));
				} else resolve({ status: 400, data: { msg: 'Restaurant not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:addDish_orchestrator',
		process,
	});
};

module.exports = method;
