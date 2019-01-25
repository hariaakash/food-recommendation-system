const router = require('express').Router();

const restaurant = require('../controllers/restaurant');

router.get('/list', restaurant.list);
router.get('/:_id', restaurant.main);
router.post('/', restaurant.create);
router.delete('/:_id', restaurant.remove);

module.exports = router;
