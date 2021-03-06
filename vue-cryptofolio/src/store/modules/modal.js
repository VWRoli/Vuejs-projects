const state = {
  isModalOpen: false,
  activeCoin: '',
  displaySuccess: false,
  isEditAsset: false,
  isAddAsset: false,
};
const getters = {
  isModalOpen: (state) => state.isModalOpen,
  displaySuccess: (state) => state.displaySuccess,
  isEditAsset: (state) => state.isEditAsset,
  isAddAsset: (state) => state.isAddAsset,
  activeCoin: (state) => state.activeCoin,
};
const actions = {
  openModal({ commit }) {
    commit('OPEN_MODAL');
  },
  closeModal({ commit }) {
    commit('CLOSE_MODAL');
  },
  openSuccess({ commit }) {
    commit('OPEN_SUCCESS');
  },
  openEditAsset({ commit }) {
    commit('OPEN_EDIT_ASSET');
  },
  openAddAsset({ commit }) {
    commit('OPEN_ADD_ASSET');
  },
  setActiveCoin({ commit }, id) {
    commit('SET_ACTIVE_COIN', id);
  },
};
const mutations = {
  OPEN_MODAL: (state) => (state.isModalOpen = true),
  CLOSE_MODAL: (state) => {
    state.isModalOpen = false;
    state.displaySuccess = false;
    state.isEditAsset = false;
  },
  OPEN_SUCCESS: (state) => {
    state.displaySuccess = true;
    state.isEditAsset = false;
    state.isAddAsset = false;
  },
  OPEN_EDIT_ASSET: (state) => (state.isEditAsset = true),
  OPEN_ADD_ASSET: (state) => (state.isAddAsset = true),
  SET_ACTIVE_COIN: (state, id) => (state.activeCoin = id),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
