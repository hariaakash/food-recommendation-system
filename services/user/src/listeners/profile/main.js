const jwt = require('jsonwebtoken');

const User = require('../../schemas/user');

const { rpcConsume } = require('../../helpers/amqp-wrapper');

const jwtSecret = process.env.JWT_SECRET || 'LADADADADAH';

const processData = ({ token }) =>
	new Promise((resolve) => {
		try {
			const { email, _id } = jwt.verify(token, jwtSecret);
			User.findById(_id).then((user) => {
				if (user) resolve({ status: 200, data: { email, _id } });
				else resolve({ status: 400, data: { msg: 'User not found.' } });
			});
		} catch (err) {
			if (err.name === 'TokenExpiredError')
				resolve({ status: 400, data: { msg: 'Token expired.' } });
			else if (err.name === 'JsonWebTokenError')
				resolve({ status: 400, data: { msg: 'Invalid token.' } });
			else resolve({ status: 500 });
		}
	});

const method = (ch) => {
	rpcConsume({
		ch,
		queue: 'user_profile:main_orchestrator',
		process: processData,
	});
};

module.exports = method;
