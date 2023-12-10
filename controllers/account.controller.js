// backend/controllers/account.controller.js
const Account = require('../models/account.model');

// Get account transactions
exports.getAccountTransactions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const account = await Account.findOne({ userId });
    res.json(account.transactions);
    console.log(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBalance = async (req, res) => {
  const userId = req.params.userId;

  try {
    const account = await Account.findOne({ userId});
    res.json({ balance: account.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deposit = async (req, res) => {
  const userId = req.params.userId;
  const { amount } = req.body;

  try {
    // Implement deposit logic
    const account = await Account.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount }, $push: { transactions: { type: 'deposit', amount } } },
      { new: true }
    );

    res.json(account.transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.withdrawal = async (req, res) => {
  const userId = req.params.userId;
  const { amount } = req.body;

  try {
    // Implement withdrawal logic
    const account = await Account.findOneAndUpdate(
      { userId, balance: { $gte: amount } },
      { $inc: { balance: -amount }, $push: { transactions: { type: 'withdrawal', amount } } },
      { new: true }
    );

    if (!account) {
      return res.status(400).json({ message: 'Insufficient funds1' });
    }

    res.json(account.transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBankerTransactions = async (req, res) => {
  //const userId = req.params.userId;

  try {
    const account = await Account.find();
    console.log(account);
    
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};