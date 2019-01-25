const Dish = require('../../schemas/dish');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Dish.findById(_id)
			.populate('restaurant')
			.then((dish) => {
				if (dish)
					resolve({
						status: 200,
						data: {
							_id: dish._id,
							name: dish.name,
							price: dish.price,
							restaurant: dish.restaurant.name,
						},
					});
				else resolve({ status: 400, data: { msg: 'Dish not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_dish:main_orchestrator',
		process,
	});
};

module.exports = method;
