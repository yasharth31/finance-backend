const transactionService = require('../services/transaction.service');

exports.create = async (req, res, next) => {
    try {
        const data = { ...req.body, user: req.user.id };
        const tx = await transactionService.createTransaction(data);
        res.json(tx);
    } catch (err) {
        next(err);
    }
};

exports.getMyTransactions = async (req, res, next) => {
    try {
        const txs = await transactionService.getUserTransactions(req.user.id);
        res.json(txs);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const txs = await transactionService.getAllTransactions();
        res.json(txs);
    } catch (err) {
        next(err);
    }
};