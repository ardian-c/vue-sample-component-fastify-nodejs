// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import PrettyCheckbox from 'pretty-checkbox-vue';
import Toasted from "vue-toasted";
import JsonExcel from "vue-json-excel";
import datePicker from "vue-bootstrap-datetimepicker";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import App from './App';
import TableComponent from './components/TableComponent';

import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
Vue.use(PrettyCheckbox);
Vue.use(Toasted);
Vue.use(datePicker);

Vue.component("downloadExcel", JsonExcel);
Vue.component('table-component', TableComponent);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
