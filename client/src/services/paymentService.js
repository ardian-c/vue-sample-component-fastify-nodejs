import qs from 'qs';
import Api from '@/services/api';

export default {
  getAllPayments() {
    return Api().get(`payments`);
  },

  getSinglePayment(id) {
    return Api().get(`payments/${id}`);
  },

  addPayment(row) {
    return Api().post(`payments`, qs.parse(row));
  },

  updatePayment(row) {
    return Api().put(`payments/${row._id}`, qs.parse(row));
  },

  deletePayment(id) {
    return Api().delete(`payments/${id}`);
  },
};
