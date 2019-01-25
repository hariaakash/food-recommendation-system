const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const checkAuth = require('../../helpers/checkAuth');

const getRestaurants = (ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'restaurant_restaurant:list_orchestrator',
			data: {},
		}).then((res) => {
			if ([200, 400].includes(res.status)) resolve(res);
			else reject(res);
		});
	});

const process = ({ token }, ch) =>
	new Promise((resolve) => {
		checkAuth({ token }, ch)
			.then((user) => getRestaurants(ch))
			.then(resolve)
			.catch((err) => {
				if ([200, 400].includes(err.status)) resolve(err);
				else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
			});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_restaurant:list_api',
		process,
	});
};

module.exports = method;
