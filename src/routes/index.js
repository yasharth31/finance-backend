const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/transactions', require('./transaction.routes'));

module.exports = router;