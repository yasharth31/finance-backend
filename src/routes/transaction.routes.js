const router = require('express').Router();
const controller = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

router.post('/', auth, controller.create);
router.get('/me', auth, controller.getMyTransactions);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

// Admin only
router.get('/', auth, role('admin'), controller.getAll);

module.exports = router;