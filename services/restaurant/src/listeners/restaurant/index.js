const list = require('./list');
const main = require('./main');
const create = require('./create');
// const update = require('./update');
const remove = require('./remove');

const listeners = (ch) => {
	list(ch);
	main(ch);
	create(ch);
	// update(ch);
	remove(ch);
};

module.exports = listeners;
