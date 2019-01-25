const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const checkAuth = require('../../helpers/checkAuth');

const createDish = ({ name, price, restaurantId, dishId }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_dish:create_orchestrator',
			data: { name, price, restaurantId, dishId },
		}).then((res) => {
			if (res.status === 200) resolve(res);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const addDishToRestaurant = ({ _id }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_restaurant:addDish_orchestrator',
			data: { _id },
		}).then((res) => {
			if (res.status === 200) resolve(res.data);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const process = ({ name, price, restaurantId, token }, ch) =>
	new Promise((resolve) => {
		checkAuth({ token }, ch)
			.then((user) => addDishToRestaurant({ _id: restaurantId }, ch))
			.then((dish) => createDish({ name, price, restaurantId, dishId: dish._id }, ch))
			.then(resolve)
			.catch((err) => {
				if ([200, 400].includes(err.status)) resolve(err);
				else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
			});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_dish:create_api',
		process,
	});
};

module.exports = method;
