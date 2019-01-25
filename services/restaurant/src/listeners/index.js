const restaurant = require('./restaurant/');
const dish = require('./dish/');

const tasks = (ch) => {
	restaurant(ch);
	dish(ch);
};

module.exports = tasks;
