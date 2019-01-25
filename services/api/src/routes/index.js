const router = require('express').Router();

const user = require('./user');
const restaurant = require('./restaurant');

router.use('/user', user);
router.use('/restaurant', restaurant);

router.use('/*', (req, res) =>
	res.status(404).json({
		msg: 'You are lost for sure.',
	})
);

module.exports = router;
