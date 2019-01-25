const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const checkAuth = require('../../helpers/checkAuth');

const getRestaurant = (data, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_dish:main_orchestrator',
			data,
		}).then((res) => {
			if (res.status === 200) resolve(res);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const process = ({ _id, token }, ch) =>
	new Promise((resolve) => {
		checkAuth({ token }, ch)
			.then((user) => getRestaurant({ _id }, ch))
			.then(resolve)
			.catch((err) => {
				if ([200, 400].includes(err.status)) resolve(err);
				else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
			});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_dish:main_api',
		process,
	});
};

module.exports = method;
