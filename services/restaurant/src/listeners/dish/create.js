const Dish = require('../../schemas/dish');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ name, price, restaurantId, dishId }) =>
	new Promise((resolve) => {
		const dish = new Dish();
		dish._id = dishId;
		dish.name = name;
		dish.price = price;
		dish.restaurant = restaurantId;
		dish.save()
			.then(() => resolve({ status: 200, data: { msg: 'Dish added.' } }))
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'restaurant_dish:create_orchestrator',
		process,
	});
};

module.exports = method;
