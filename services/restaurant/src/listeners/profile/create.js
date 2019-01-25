const bcrypt = require('bcryptjs');

const User = require('../../schemas/user');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const process = ({ email, password }) =>
	new Promise((resolve) => {
		bcrypt
			.hash(password, 10)
			.then((hash) => {
				const user = new User();
				user.email = email;
				user.conf.hashPassword = hash;
				user.save().then(() => resolve({ status: 200, data: { msg: 'User created.' } }));
			})
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'user_profile:create_orchestrator',
		process,
	});
};

module.exports = method;
