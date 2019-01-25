const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Restaurant.findById(_id)
			.populate('dishes')
			.then((restaurant) => {
				if (restaurant)
					resolve({
						status: 200,
						data: {
							_id: restaurant._id,
							name: restaurant.name,
							address: restaurant.address,
							dishes: restaurant.dishes,
						},
					});
				else resolve({ status: 400, data: { msg: 'Restaurant not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:main_orchestrator',
		process,
	});
};

module.exports = method;
