var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/post', require('./post/postRoutes'));

module.exports = router;
