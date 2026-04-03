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
        const txs = await transactionService.getUserTransactions(
            req.user.id,
            req.query
        );

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
exports.update = async (req, res, next) => {
    try {
        const tx = await transactionService.updateTransaction(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!tx) return res.status(404).json({ message: "Transaction not found" });

        res.json(tx);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const tx = await transactionService.deleteTransaction(
            req.params.id,
            req.user.id
        );

        if (!tx) return res.status(404).json({ message: "Transaction not found" });

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};
exports.getSummary = async (req, res, next) => {
    try {
        const summary = await transactionService.getSummary(req.user.id);
        res.json(summary);
    } catch (err) {
        next(err);
    }
};