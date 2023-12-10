// backend/models/account.model.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Account', accountSchema);
