const paymentsController = require('../controllers/paymentsController');

const routes = [
  {
    method: 'GET',
    url: '/api/v1/payments',
    handler: paymentsController.getPayments
  },

  {
    method: 'GET',
    url: '/api/v1/payments/:id',
    handler: paymentsController.getSinglePayment
  },

  {
    method: 'POST',
    url: '/api/v1/payments',
    handler: paymentsController.addPayment
  },

  {
    method: 'PUT',
    url: '/api/v1/payments/:id',
    handler: paymentsController.updatePayment
  },

  {
    method: 'DELETE',
    url: '/api/v1/payments/:id',
    handler: paymentsController.deletePayment
  }
];

module.exports = routes;