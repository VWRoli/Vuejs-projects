import { createStore } from 'vuex';
import assets from './modules/assets';
import modal from './modules/modal';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    assets,
    modal,
  },
});
