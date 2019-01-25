const main = require('./main');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');

const methods = {
	main,
	create,
	update,
	remove,
};

module.exports = methods;
