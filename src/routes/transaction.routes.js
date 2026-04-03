const router = require('express').Router();
const controller = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');

// CREATE Transaction (with validation)
router.post(
    '/',
    auth,
    [
        body('type')
            .isIn(['income', 'expense'])
            .withMessage('Type must be income or expense'),

        body('amount')
            .isNumeric()
            .withMessage('Amount must be a number'),

        body('category')
            .notEmpty()
            .withMessage('Category is required')
    ],
    validate,
    controller.create
);

// GET My Transactions
router.get('/me', auth, controller.getMyTransactions);

// UPDATE Transaction
router.put('/:id', auth, controller.update);

// DELETE Transaction
router.delete('/:id', auth, controller.delete);

// SUMMARY API
router.get('/summary', auth, controller.getSummary);

// Admin only
router.get('/', auth, role('admin'), controller.getAll);

module.exports = router;