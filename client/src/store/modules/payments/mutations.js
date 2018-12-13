export const setPayments = (state, payments) => {
  state.payments = payments.data;
};

export const addPayment = (state, payment) => {
  state.payments.unshift(payment.data);
};

export const setPayment = (state, payment) => {
  const existingPayment = state.payments.find(p => p._id === payment.data._id);
  Object.assign(existingPayment, payment.data);
};

export const setPaymentsLoading = (state, status) => {
  state.isLoading = status;
};

export const setRequestSuccessMessage = (state, message) => {
  state.successMessage = message;
};

export const setRequestFailedMessage = (state, message) => {
  state.failedMessage = message;
};
