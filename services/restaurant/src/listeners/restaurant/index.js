const list = require('./list');
const main = require('./main');
const create = require('./create');
const addDish = require('./addDish');
const removeDish = require('./removeDish');
const remove = require('./remove');

const listeners = (ch) => {
	list(ch);
	main(ch);
	create(ch);
	addDish(ch);
	removeDish(ch);
	remove(ch);
};

module.exports = listeners;
