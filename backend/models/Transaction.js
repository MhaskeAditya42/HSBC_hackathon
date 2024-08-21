const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  step: Number,
  customer: String,
  age: Number,
  gender: {
    type: String,
    enum: ['M', 'F', 'O'],
  },
  zipcodeOri: String,
  merchant: String,
  zipMerchant: String,
  category: String,
  amount: Number,
  fraud: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
