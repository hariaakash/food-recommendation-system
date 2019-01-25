const bcrypt = require('bcryptjs');

const User = require('../../schemas/user');
const AuthKey = require('../../schemas/authKey');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const checkPassword = ({ user, password }) =>
	new Promise((resolve) => {
		if (user)
			bcrypt.compare(password, user.conf.hashPassword).then((status) => {
				if (status) {
					const authKey = new AuthKey();
					authKey.user = user._id;
					authKey.save().then((newAuthKey) => {
						user.authKey.push(newAuthKey._id);
						user.save();
						resolve({
							status: 200,
							data: {
								authKey: newAuthKey.token,
								msg: 'Successfully authenticated using email.',
							},
						});
					});
				} else resolve({ status: 400, data: { msg: 'Password is incorrect.' } });
			});
		else resolve({ status: 400, data: { msg: 'User not registered.' } });
	});

const process = ({ email, password }) =>
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
		process,
	});
};

module.exports = method;
