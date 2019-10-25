const router = require('express').Router();
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

// router.use(authMiddleware);

router.get('/', usersController.list);
router.post('/', usersController.store);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
