const Joi = require('joi');

const { rpcSend } = require('../../helpers/amqp-wrapper');

const schema = Joi.object().keys({
	token: Joi.string()
		.regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/, 'Authentication Token')
		.required(),
	name: Joi.string()
		.min(4)
		.max(32)
		.required(),
	address: Joi.string()
		.min(4)
		.max(64)
		.required(),
});

const request = (req, res) => {
	schema
		.validate({ ...req.body, token: req.headers['x-auth-token'] }, { abortEarly: false })
		.then((vData) => {
			rpcSend({
				ch: req.ch,
				queue: 'orchestrator_restaurant:create_api',
				data: vData,
			}).then(({ status, data }) => res.status(status).json(data));
		})
		.catch((vError) => {
			res.status(400).json({
				msg: 'Validation Error',
				data: vError.details.map((d) => d.message),
			});
		});
};

module.exports = request;
