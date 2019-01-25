const { rpcSend } = require('./amqp-wrapper');

const checkAuth = ({ token }, ch) =>
	new Promise((resolve, reject) => {
		rpcSend({
			ch,
			queue: 'user_profile:main_orchestrator',
			data: { token },
		}).then((res) => {
			if (res.status === 200) resolve(res.data);
			else if (res.status === 400) reject(res);
			else resolve({ status: 500 });
		});
	});

module.exports = checkAuth;
