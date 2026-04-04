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

exports.getMyTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {
            user: req.user.id
        };

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        if (startDate || endDate) {
            filter.date = {};

            if (startDate) {
                filter.date.$gte = new Date(startDate);
            }

            if (endDate) {
                filter.date.$lte = new Date(endDate);
            }
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
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
const Transaction = require('../models/transaction.model');

exports.getSummary = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all transactions of user
        const transactions = await Transaction.find({ user: userId });

        let totalIncome = 0;
        let totalExpense = 0;

        // Calculate totals
        transactions.forEach((t) => {
            if (t.type === 'income') {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        // Monthly trends
        const monthlyData = {};

        transactions.forEach((t) => {
            const month = new Date(t.date).toISOString().slice(0, 7); // YYYY-MM

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    income: 0,
                    expense: 0
                };
            }

            if (t.type === 'income') {
                monthlyData[month].income += t.amount;
            } else {
                monthlyData[month].expense += t.amount;
            }
        });

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance,
                monthlyTrends: monthlyData
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};