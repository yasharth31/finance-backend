const Transaction = require('../models/transaction.model');

exports.createTransaction = (data) => {
    return Transaction.create(data);
};

exports.getUserTransactions = (userId) => {
    return Transaction.find({ user: userId });
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