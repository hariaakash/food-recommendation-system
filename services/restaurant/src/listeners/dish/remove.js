const Dish = require('../../schemas/dish');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id }) =>
	new Promise((resolve) => {
		Dish.findById(_id)
			.then((dish) => {
				if (dish) {
					dish.remove();
					resolve({ status: 200, data: { msg: 'Dish removed from restaurant.' } });
				} else resolve({ status: 400, data: { msg: 'Dish not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_dish:remove_orchestrator',
		process,
	});
};

module.exports = method;
