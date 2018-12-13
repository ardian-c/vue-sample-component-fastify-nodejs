/* eslint-disable */
import paymentService from '../../../services/paymentService';

export const addPayment = async({ commit, dispatch }, payload) => {
  commit('setPaymentsLoading', true);
  try {
    const res = await paymentService.addPayment(payload);
    commit('addPayment', res);
    dispatch("successfulApiRequest", "Payment added successfully.");
  } catch (err) {
    console.error(err);
    dispatch('failedApiRequest', 'Something went wrong!');
  }
  commit('setPaymentsLoading', false);
};

export const getAllPayments = async ({ commit, dispatch }, payload) => {
  commit('setPaymentsLoading', true);
  const res = await paymentService.getAllPayments(payload);
  commit('setPayments', res);
  commit('setPaymentsLoading', false);
};

export const getSinglePayment = async ({ commit, dispatch }, payload) => {
  commit('setPaymentsLoading', true);
  try {
    const res = await paymentService.getSinglePayment(payload);
    commit('setPayment', res);
  } catch (err) {
    console.error('Something went wrong: ', err);
  }
  commit('setPaymentsLoading', false);
};

export const updatePayment = async ({ commit, dispatch }, payload) => {
  commit("setPaymentsLoading", true);
  console.log('payload: ', payload);
  try {
    const res = await paymentService.updatePayment(payload);
    commit("setPayment", res);
    dispatch('successfulApiRequest', 'Payment updated successfully.');
  } catch(err) {
    console.error(err);
    dispatch('failedApiRequest', 'Something went wrong!');
  }
  commit("setPaymentsLoading", false);
};

export const successfulApiRequest = ({ commit }, payload) => {
  commit('setRequestSuccessMessage', payload);
};

export const failedApiRequest = ({ commit }, payload) => {
  commit('setRequestFailedMessage', payload);
};

export const deletePayment = async ({ commit, dispatch }, payload) => {
  commit("setPaymentsLoading", true);
  try {
    const res = await paymentService.deletePayment(payload);
    commit("setPayment", res);
  } catch (err) {
    console.error('Something went wrong: ', err);
  }
  commit("setPaymentsLoading", false);
};
