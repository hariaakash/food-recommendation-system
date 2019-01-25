const router = require('express').Router();

const user = require('./user');
const restaurant = require('./restaurant');
const dish = require('./dish');

router.use('/user', user);
router.use('/restaurant', restaurant);
router.use('/dish', dish);

router.use('/*', (req, res) =>
	res.status(404).json({
		msg: 'You are lost for sure.',
	})
);

module.exports = router;
