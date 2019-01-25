const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Restaurant.findOne({ dishes: _id })
			.then((restaurant) => {
				if (restaurant) {
					restaurant.dishes = restaurant.dishes.filter((x) => String(x) !== _id);
					restaurant
						.save()
						.then(() => resolve({ status: 200, data: { msg: 'Dish removed.' } }))
						.catch((err) => resolve({ status: 500 }));
				} else resolve({ status: 400, data: { msg: 'Dish not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:removeDish_orchestrator',
		process,
	});
};

module.exports = method;
