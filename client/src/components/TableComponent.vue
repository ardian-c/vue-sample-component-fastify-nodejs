<template>
  <div class="table-component__table__wrapper" v-if="this.rows.length > 0">
    <div class="table-component__table__modals">
      <b-modal
      :ok-title="'Update'"
      :title="'Edit Data'"
      id="showEditModal" v-model="showEditModal">
          <div class="form-group" v-for="(col, idx) in allColumns" :key="'input-' + idx">
            <label :for="'mfield-' + idx" class="pull-left">{{ col.label }}</label>
            <input type="text" class="form-control form-control-sm"
            :disabled="(col.value == '_id' || col.value == 'id') ? true : false"
            :ref="col.value"
            :name="'mfield-' + col.value"
            :value="(clickedRow) ? clickedRow[col.value] : ''">
          </div>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right mr-10" variant="primary" @click="handleUpdateRecord">
            Update
          </b-btn>

          <b-btn size="sm"
          class="float-right"
          style="margin-right: 5px;"
          variant="default"
          @click="showEditModal=false">
            Close
          </b-btn>
        </div>
      </b-modal>

      <b-modal
      :ok-title="'Add'"
      :title="'Add New Data'"
      id="showAddModal" v-model="showAddModal">
          <div class="form-group" v-for="(col, idx) in allColumns" :key="'input-new-' + idx">
            <label
            v-if="col.value !== '_id'"
            :for="'mfield-' + idx"
            class="pull-left">{{ col.label }}</label>
            <input
            v-if="col.value !== '_id' && col.value !== 'date'"
            type="text"
            class="form-control form-control-sm"
            v-model="newRecord[col.value]"
            :name="'newfield-' + col.value">

            <date-picker
            :format="dateFormat"
            v-model="newRecord[col.value]"
            :config="{ format: dateFormat }"
            v-if="col.value === 'date'"
            ></date-picker>
          </div>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right mr-10" variant="primary" @click="handleAddNewRecord">
            Add
          </b-btn>

          <b-btn size="sm" class="float-right" style="margin-right: 5px;" variant="default" @click="showAddModal=false">
            Close
          </b-btn>
        </div>
      </b-modal>
    </div>
    <div class="table-component__table__custom__buttons">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group buttons-content">
            <button class="btn btn-sm btn-default" @click="clearFilters">Clear Filters</button>
            <download-excel
                style="background-color: #ddd;"
                class="btn btn-sm btn-default"
                :disabled="selectedRows.length == 0"
                :data="selectedRows">
                Download Data
            </download-excel>
            <button class="btn btn-sm btn-primary" @click="addRow">Add New Payment</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFilter" class="table-component__table__filter">
      <div class="row">
        <div class="col-md-8 custom-filter">
          <div class="row">
            <div class="col-md-5">
              <select name="searchOperator" v-model="searchColumn" class="form-control" id="firstCol" @change="advancedFilter">
                <option value=""></option>
                <option v-for="(col, idx) in allColumns" :key="'first-col-' + idx" :value="col.value">{{ col.label }}</option>
              </select>
            </div>
            <div class="col-md-2">
              <select class="form-control" v-model="searchOperator" name="operatorSelector" id="operatorSelector" @change="advancedFilter">
                <option value="=">{{ '=' }}</option>
                <option value=">">{{ '>' }}</option>
                <option value="<">{{ '<' }}</option>
                <option value=">=">{{ '>=' }}</option>
                <option value="<=">{{ '<=' }}</option>
                <option value="!=">{{ '!=' }}</option>
              </select>
            </div>
            <div class="col-md-5">
              <input
              type="text"
              name="searchValue"
              v-model="searchValue"
              @change="advancedFilter"
              class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-4 search-filter">
          <input type="text"
          class="form-control pull-right"
          v-model="searchKeyword"
          :class="filterInputClass"
          :placeholder="filterPlaceholder"/>
        </div>
      </div>
    </div>
    <table :class="fullTableClass">
      <thead :class="fullTableHeadClass">
        <tr>
          <th width="80px;">
            <p-check name="check-all"
            :checked="false"
            :value="allChecked"
            v-model="allChecked"></p-check>
          </th>
          <th
            scope="col"
            v-for="(col, idx) in allColumns"
            :key="idx"
            @click="sortTable(col)"
          >{{ col.label }}</th>
          <th width="80px;">
            Actions
          </th>
        </tr>
      </thead>

      <tbody :class="fullTableBodyClass">
        <tr
          v-for="(row, idx) in getRows"
          :key="idx"
          @click="handleTableRowClick(row)"
        >
        <td v-if="showAllSelection || showRowSelection">
          <p-check name="check"
          :id="'row-check-' + idx"
          v-model="selectedRows"
          :checked="checkRowIfSelected(row)" :value="row"></p-check>
        </td>
        <td
        v-for="(col, idx) in allColumns"
        :key="idx"
        >{{ row[col.value] }}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <a href="#" class="action-link action-view" @click="viewRow(row)">Edit</a>&nbsp;
            <a href="#" class="action-link action-delete" @click="deleteRow(row)">Delete</a>&nbsp;
          </div>
        </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showPagination" class="table-component__table__pagination">
      <nav aria-label="">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li
          class="page-item"
          v-for="i in numPages()"
          :key="'pagination-' + i"
          :class="[i == pagination.currentPage ? 'active' : '']"
          @click="changePage(i)"
          ><a class="page-link" href="#">{{i}}</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

import { containsObject, mergeClasses, settings } from '../utils';

export default {
  props: {
    rows: { default: () => [], type: [Array] },
    cols: { default: () => [], type: [Array] },
    showFilter: { default: true },

    sortBy: { default: '', type: String },
    sortOrder: { default: '', type: String },

    tableClass: { default: () => settings.tableClass },
    theadClass: { default: () => settings.theadClass },
    tbodyClass: { default: () => settings.tbodyClass },

    filterBy: { default: '', type: String },
    filterInputClass: { default: () => settings.filterInputClass },
    filterPlaceholder: { default: () => settings.filterPlaceholder },
    filterNoResults: { default: () => settings.filterNoResults },

    showPagination: { default: true, type: Boolean },
    perPage: { default: 10, type: Number },

    showAllSelection: { default: false, type: Boolean },
    showRowSelection: { default: false, type: Boolean },
  },

  data() {
    return {
      allChecked: false,
      showAddModal: false,
      showEditModal: false,
      clickedRow: null,
      selectedRows: [],
      currentPage: 1,
      sortColumn: this.sortBy,
      ascending: false,
      allRows: this.rows,
      searchColumn: '',
      searchOperator: '',
      searchKeyword: '',
      searchValue: '',
      pagination: {
        currentPage: 1,
        perPage: this.perPage,
        total: this.rows.length,
      },
      dateFormat: 'YYYY-MM-DD hh:mm:ss',
      newRecord: {},
    };
  },

  watch: {
    selectedRows(newVal, oldVal) {
      if(this.selectedRows.length === this.allRows.length) {
        this.allChecked = true;
      }
    },

    allChecked(newVal, oldVal) {
      if(newVal === true) {
        this.allChecked = true;
        this.selectedRows = this.allRows;
      } else {
        this.allChecked = false;
        this.selectedRows = [];
      }
    },

    searchKeyword(newVal, oldVal) {
      if(newVal === '' || newVal.length <= 2) {
        this.allRows = this.rows;
      } else {
        const text = this.searchKeyword.split(' ');
        const rows = this.allRows.filter((item) => {
          return text.every((el) => {
            return item[this.filterBy].indexOf(el) > -1;
          });
        });
        this.allRows = rows;
      }
    },
  },

  computed: {
    fullTableHeadClass() {
      return mergeClasses('table-component__table__head', this.theadClass);
    },

    fullTableBodyClass() {
      return mergeClasses('table-component__table__body', this.tbodyClass);
    },

    fullTableClass() {
      return mergeClasses('table-component__table', this.tableClass);
    },

    getRows() {
      const first = (this.pagination.currentPage - 1) * this.pagination.perPage;
      const last = first + this.pagination.perPage;
      return this.allRows.slice(first, last);
    },

    allColumns() {
      if (this.cols.length === 0) {
        const c = [];
        Object.keys(this.allRows[0]).forEach((val) => {
          c.push({
            value: val,
            label: val.toUpperCase(),
          });
        });
        return c;
      }

      return this.cols;
    },
  },

  mounted() {

  },

  methods: {
    sortTable(col) {
      if(this.rows.length == 0) return;

      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      const tmpSort = this.ascending;

      this.allRows.sort((a, b) => {
        if (a[col.value] > b[col.value]) {
          return tmpSort ? 1 : -1;
        } else if (a[col.value] < b[col.value]) {
          return tmpSort ? -1 : 1;
        }
        return 0;
      });
    },

    numPages() {
      return Math.ceil(this.allRows.length / this.pagination.perPage);
    },

    changePage(page) {
      this.pagination.currentPage = page;
    },

    clearFilters() {
      this.searchKeyword = '';
      this.searchValue = '';
      this.searchOperator = '';
      this.searchColumn = '';

      this.advancedFilter();
    },

    advancedFilter() {
      this.searchKeyword = '';
      this.allRows = this.rows;
      if(this.searchValue === '' || this.searchOperator === '' || this.searchColumn === '') {
        return;
      }

      const tmp = [];

      switch(this.searchOperator) {
          case '=':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] === this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
          break;

          case '>':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] > this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
            break;

          case '<':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] < this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
            break;

          case '>=':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] >= this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
            break;

          case '<=':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] <= this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
            break;

          case '!=':
            this.allRows.filter((item) => {
              if(item[this.searchColumn] !== this.searchValue) {
                tmp.push(item);
                return true;
              }
              return false;
            });
            break;

          default: '='
      }

      this.allRows = tmp;
    },

    addRow() {
      this.showAddModal = true;
    },

    viewRow(row) {
      this.clickedRow = row;
      this.showEditModal = true;
    },

    editRow(row) {
      this.clickedRow = row;
      this.showEditModal = true;
    },

    deleteRow(row) {
      this.clickedRow = row;
    },

    checkRowIfSelected(row) {
      if(containsObject(this.selectedRows, row)) {
        return true;
      }
      return false;
    },

    getRefValues() {
      const tmp = [];
      for(let ref in this.$refs) {
        tmp[ref] = this.$refs[ref][0].value;
      }

      return tmp;
    },

    handleAddNewRecord() {
      this.$emit('table-component-row-added', this.newRecord);
      this.newRecord = {};
    },

    handleUpdateRecord() {
      let row = this.getRefValues();
      this.$emit('table-component-row-updated', row);
    },

    handleTableRowClick(row) {
      this.$emit('table-component-row-clicked', row);
    },
  },
};
</script>

<style>
.table-component__table__wrapper table thead, .table-component__table__wrapper table tbody tr {
  cursor: pointer;
}

.table-component__table__filter {
  margin-bottom: 10px;
}

.table-component__table__wrapper .buttons-content {
  float: right;
}

.table-component__table__wrapper a.action-link {
  font-size: 14px;
  color: #444444;
}

.table-component__table__wrapper a.action-delete:hover {
  color: #dc3545;
}
.table-component__table__modals label {
  float: left;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
</style>

