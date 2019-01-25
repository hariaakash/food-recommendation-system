const AuthKey = require('../../schemas/authKey');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ authKey }) =>
	new Promise((resolve) => {
		AuthKey.findOne({
			token: authKey,
		})
			.populate('user')
			.then((userAuthKey) => {
				if (userAuthKey) resolve({ status: 200, data: { email: userAuthKey.user.email } });
				else resolve({ status: 400, data: { msg: 'Token expired.' } });
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'user_profile:main_orchestrator',
		process,
	});
};

module.exports = method;
