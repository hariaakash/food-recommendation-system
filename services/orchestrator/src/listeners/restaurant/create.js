const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const checkAuth = require('../../helpers/checkAuth');

const createRestaurant = ({ name, address }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_restaurant:create_orchestrator',
			data: { name, address },
		}).then((res) => {
			if (res.status === 200) resolve(res);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

const process = ({ name, address, token }, ch) =>
	new Promise((resolve) => {
		checkAuth({ token }, ch)
			.then((user) => createRestaurant({ name, address }, ch))
			.then(resolve)
			.catch((err) => {
				if ([200, 400].includes(err.status)) resolve(err);
				else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
			});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_restaurant:create_api',
		process,
	});
};

module.exports = method;
