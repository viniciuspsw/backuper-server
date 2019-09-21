const router = require('express').Router();
const projectsRoutes = require('./projects');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/projects', projectsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

module.exports = router;
