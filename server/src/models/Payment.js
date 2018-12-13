const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
  productId: String,
  name: String,
  description: String,
  date: { type: Date, default: Date.now },
  amount: Number
});

module.exports = mongoose.model('Payment', paymentsSchema);