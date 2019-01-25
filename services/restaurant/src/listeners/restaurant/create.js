const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ name, address }) =>
	new Promise((resolve) => {
		const restaurant = new Restaurant();
		restaurant.name = name;
		restaurant.address = address;
		restaurant
			.save()
			.then(() => resolve({ status: 200, data: { msg: 'Restaurant created.' } }))
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:create_orchestrator',
		process,
	});
};

module.exports = method;
