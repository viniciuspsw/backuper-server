const router = require('express').Router();
const projectsController = require('../controllers/projects');
const backupsController = require('../controllers/backups');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', projectsController.list);
router.post('/', projectsController.store);
router.patch('/:id', projectsController.update);
router.delete('/:id', projectsController.destroy);

router.get('/:project/backups', backupsController.list);

module.exports = router;
