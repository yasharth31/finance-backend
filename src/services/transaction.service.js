const Transaction = require('../models/transaction.model');

exports.createTransaction = (data) => {
    return Transaction.create(data);
};

exports.getUserTransactions = (userId, query) => {
    let filter = { user: userId };

    // Filter by type
    if (query.type) {
        filter.type = query.type;
    }

    // Filter by category
    if (query.category) {
        filter.category = query.category;
    }

    // Filter by date range
    if (query.startDate && query.endDate) {
        filter.createdAt = {
            $gte: new Date(query.startDate),
            $lte: new Date(query.endDate)
        };
    }

    return Transaction.find(filter);
};

exports.getAllTransactions = () => {
    return Transaction.find().populate('user');
};
exports.updateTransaction = (id, userId, data) => {
    return Transaction.findOneAndUpdate(
        { _id: id, user: userId },
        data,
        { new: true }
    );
};

exports.deleteTransaction = (id, userId) => {
    return Transaction.findOneAndDelete({
        _id: id,
        user: userId
    });
};
exports.getSummary = async (userId) => {
    const transactions = await Transaction.find({ user: userId });

    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
        if (tx.type === 'income') {
            income += tx.amount;
        } else {
            expense += tx.amount;
        }
    });

    return {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
    };
};