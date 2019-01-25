const Joi = require('joi');

const { rpcSend } = require('../../helpers/amqp-wrapper');

const schema = Joi.object().keys({
	token: Joi.string()
		.regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/, 'Authentication Token')
		.required(),
	_id: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/, 'Object ID')
		.required(),
});

const request = (req, res) => {
	schema
		.validate({ ...req.params, token: req.headers['x-auth-token'] }, { abortEarly: false })
		.then((vData) => {
			rpcSend({
				ch: req.ch,
				queue: 'orchestrator_restaurant:remove_api',
				data: vData,
			}).then(({ status, data }) => res.status(status).json(data));
		})
		.catch((vError) =>
			res.status(400).json({
				msg: 'Validation Error',
				data: vError.details.map((d) => d.message),
			})
		);
};

module.exports = request;
