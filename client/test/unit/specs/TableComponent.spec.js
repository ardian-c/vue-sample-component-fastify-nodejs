import Vuex from "vuex";
import { mount, createLocalVue } from '@vue/test-utils';
import TableComponent from '@/components/TableComponent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  getPaymentsData: jest.fn()
};

describe('TableComponent.vue', () => {
  let store;
  // @TODO testing Vuex
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        payments: {
          namespaced: true,
          actions,
          getters: {
            payments: () => 100
          }
        }
      }
    });
  });

  test('should render content correctly', () => {
    const wrapper = mount(TableComponent);
    console.log('wrapper: ', wrapper);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('correctly sets date format', () => {
    const wrapper = mount(TableComponent);
    expect(wrapper.vm.dateFormat).toBe("YYYY-MM-DD hh:mm:ss");
  });
});
