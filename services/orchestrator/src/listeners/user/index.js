const main = require('./main');
const create = require('./create');
const auth = require('./auth');

const listeners = (ch) => {
	main(ch);
	create(ch);
	auth(ch);
};

module.exports = listeners;
