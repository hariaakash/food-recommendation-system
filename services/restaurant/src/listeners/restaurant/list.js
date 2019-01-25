const Restaurant = require('../../schemas/restaurant');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = () =>
	new Promise((resolve) => {
		Restaurant.find({})
			.populate('dishes')
			.then((restaurants) => {
				if (restaurants)
					resolve({
						status: 200,
						data: restaurants.map((x) => ({
							_id: x._id,
							name: x.name,
							address: x.address,
							dishes: x.dishes,
						})),
					});
				else resolve({ status: 400, data: { msg: 'Restaurant not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_restaurant:list_orchestrator',
		process,
	});
};

module.exports = method;
