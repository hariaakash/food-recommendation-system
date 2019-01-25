const user = require('./user/');
const restaurant = require('./restaurant/');
const dish = require('./dish/');

const tasks = (ch) => {
	user(ch);
	restaurant(ch);
	dish(ch);
};

module.exports = tasks;
