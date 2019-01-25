const { rpcSend, rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ token }, ch) =>
	new Promise((resolve) => {
		rpcSend({
			ch,
			queue: 'user_profile:main_orchestrator',
			data: { token },
		}).then((res) => {
			if (res.status === 200 || res.status === 400) resolve(res);
			else resolve({ status: 500, data: { msg: 'Internal Server Error' } });
		});
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'orchestrator_user:main_api',
		process,
	});
};

module.exports = method;
