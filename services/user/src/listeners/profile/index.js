const main = require('./main');
const exists = require('./exists');
const create = require('./create');
const authEmail = require('./authEmail');

const tasks = (ch) => {
	main(ch);
	exists(ch);
	create(ch);
	authEmail(ch);
};

module.exports = tasks;
