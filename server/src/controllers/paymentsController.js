const boom = require('boom');
const Payment = require('../models/Payment');

exports.getPayments = async(req, res) => {
  try {
    const payments = await Payment.find();
    return payments;
  } catch(err) {
    throw boom.boomify(err);
  }
}

exports.getSinglePayment = async(req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findById(id);
    return payment;
  } catch(err) {
    throw boom.boomify(err);
  }
}

exports.addPayment = async(req, res) => {
  try {
    const payment = new Payment(req.body);
    return payment.save();
  } catch(err) {
    throw boom.boomify(err);
  }
}

exports.updatePayment = async(req, res) => {
  try {
    const id = req.params.id;
    const payment = req.body;
    const { ... updateData } = payment;
    const update = await Payment.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch(err) {
    throw boom.boomify(err);
  }
}

exports.deletePayment = async(req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByIdAndRemove(id);
    return payment;
  } catch(err) {
    throw boom.boomify(err);
  }
}