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