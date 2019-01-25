const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Restaurant.findById(_id)
			.then((restaurant) => {
				if (restaurant) {
					restaurant.remove();
					resolve({ status: 200, data: { msg: 'Restaurant removed.' } });
				} else resolve({ status: 400, data: { msg: 'Restaurant not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:remove_orchestrator',
		process,
	});
};

module.exports = method;
