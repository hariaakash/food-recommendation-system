const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const checkAuth = require('../../helpers/checkAuth');

const removeDish = ({ _id }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_dish:remove_orchestrator',
			data: { _id },
		}).then((res) => {
			if (res.status === 200) resolve(res);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const removeDishFromRestaurant = ({ _id }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_restaurant:removeDish_orchestrator',
			data: { _id },
		}).then((res) => {
			if (res.status === 200) resolve(res);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const process = ({ _id, token }, ch) =>
	new Promise((resolve) => {
		checkAuth({ token }, ch)
			.then((user) => removeDishFromRestaurant({ _id }, ch))
			.then(() => removeDish({ _id }, ch))
			.then(resolve)
			.catch((err) => {
				if ([200, 400].includes(err.status)) resolve(err);
				else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
			});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_dish:remove_api',
		process,
	});
};

module.exports = method;
