const Dish = require('../../schemas/dish');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ _id, name, price }) =>
	new Promise((resolve) => {
		Dish.findById(_id)
			.then((dish) => {
				if (dish) {
					dish.name = name;
					dish.price = price;
					dish.save().then(() => resolve({ status: 200, data: { msg: 'Dish updated' } }));
				} else resolve({ status: 400, data: { msg: 'Dish not found.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_dish:update_orchestrator',
		process,
	});
};

module.exports = method;
