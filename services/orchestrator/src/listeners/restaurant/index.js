const main = require('./main');
const list = require('./list');
const create = require('./create');
const remove = require('./remove');

const listeners = (ch) => {
	main(ch);
	list(ch);
	create(ch);
	remove(ch);
};

module.exports = listeners;
