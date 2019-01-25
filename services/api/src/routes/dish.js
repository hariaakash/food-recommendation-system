const router = require('express').Router();

const dish = require('../controllers/dish');

router.get('/:_id', dish.main);
router.post('/', dish.create);
router.put('/:_id', dish.update);
router.delete('/:_id', dish.remove);

module.exports = router;
