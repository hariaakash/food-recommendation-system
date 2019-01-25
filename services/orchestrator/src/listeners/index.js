const user = require('./user/');
const restaurant = require('./restaurant/');

const tasks = (ch) => {
	user(ch);
	restaurant(ch);
};

module.exports = tasks;
