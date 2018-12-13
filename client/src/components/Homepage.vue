<template>
  <div class="homepage-wrapper">
    <div class="container">
      <div class="col-xs-12 col-sm-12 col-md-12" v-if="originalData.length > 0">
        <table-component
          :rows="originalData"
          :cols="cols"
          :filterBy="'name'"
          :showAllSelection="true"
          :tableClass="getTableClass"
          :theadClass="getHeadClass"
          :tbodyClass="getTbodyClass"
          :perPage="10"
          v-on:table-component-row-added="handleComponentRowAdded"
          v-on:table-component-row-updated="handleComponentRowUpdated"
          v-on:table-component-row-clicked="handleComponentRowClicked"
    ></table-component>
      </div>
      <div v-else>
        <loading :active.sync="originalData.length == 0"
        :can-cancel="true"
        :is-full-page="true"></loading>
      </div>
    </div>
  </div>
</template>

<script>
/** eslint-disable */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Homepage',
  components: {
    Loading
  },

  computed: {
    getTableClass() {
      return 'table table-bordered table-hover table-responsive ';
    },
    getHeadClass() {
      return 'thead-light';
    },
    getTbodyClass() {
      return '';
    },

    ...mapGetters({
      originalData: 'payments/payments',
      query: 'payments/query',
      successMessage: 'payments/successMessage',
      failedMessage: 'payments/failedMessage',
    }),
  },

  watch: {
    successMessage(newVal, oldVal) {
      this.$toasted.show(newVal, { duration: 3000 });
      this.resetMessages();
    },

    failedMessage(newVal, oldVal) {
      this.$toasted.show(newVal, { duration: 3000 });
      this.resetMessages();
    },
  },

  data() {
    return {
      data: [{
        '_id': '5c0afce203067a79e0acc8d5',
        productId: '17019E51-E9B9-2E41-ECA4-3691F74BABA1',
        name: 'Denise Walsh',
        description: 'Mauris',
        date: '2017-07-18T17:53:37+02:00',
        amount: '946.99',
      }, {
        '_id': '5c0afce203067a79e0acc8d4',
        productId: 'C0DC95CC-E432-998F-05EB-8BC8D37F0FCF',
        name: 'Eve Bryan',
        description: 'id risus quis diam luctus lobortis. Class aptent taciti',
        date: '2018-12-07T16:08:35+01:00',
        amount: '594.32',
      }],
      cols: [{
        value: '_id',
        label: 'ID',
      }, {
        value: 'productId',
        label: 'Product ID',
      }, {
        value: 'name',
        label: 'Name',
      }, {
        value: 'description',
        label: 'Description',
      }, {
        value: 'date',
        label: 'Date',
      }, {
        value: 'amount',
        label: 'Amount',
      }],
    };
  },

  mounted() {
    this.getAllPayments();
  },

  methods: {
    async fetchData() {
      // run async call to get the data if needed.
    },

    ...mapActions({
      getAllPayments: 'payments/getAllPayments',
      addPayment: 'payments/addPayment',
      updatePayment: 'payments/updatePayment',
      successfulApiRequest: 'payments/successfulApiRequest',
      failedApiRequest: 'payments/failedApiRequest'
    }),

    resetMessages() {
      this.successfulApiRequest('');
      this.failedApiRequest('');
    },

    handleComponentRowAdded(e) {
      this.addPayment(e);
    },

    handleComponentRowUpdated(e) {
      this.updatePayment(e);
    },

    handleComponentRowClicked(e) {
      //
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
