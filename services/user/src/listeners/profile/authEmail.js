const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../schemas/user');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const jwtSecret = process.env.JWT_SECRET || 'LADADADADAH';

const checkPassword = ({ user, password }) =>
	new Promise((resolve) => {
		if (user)
			bcrypt.compare(password, user.conf.hashPassword).then((status) => {
				if (status)
					resolve({
						status: 200,
						data: {
							token: jwt.sign({ email: user.email, _id: user._id }, jwtSecret, {
								expiresIn: '1d',
							}),
							msg: 'Successfully authenticated using email.',
						},
					});
				else resolve({ status: 400, data: { msg: 'Password is incorrect.' } });
			});
		else resolve({ status: 400, data: { msg: 'User not registered.' } });
	});

const processData = ({ email, password }) =>
	new Promise((resolve) => {
		User.findOne({
			email,
		})
			.then((user) => checkPassword({ user, password }))
			.then(resolve)
			.catch((err) => resolve({ status: 500 }));
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'user_profile:authEmail_orchestrator',
		process: processData,
	});
};

module.exports = method;
