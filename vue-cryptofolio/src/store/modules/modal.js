const state = {
  isModalOpen: false,
  activeCoin: '',
  displaySuccess: false,
  isEditAsset: false,
};
const getters = {
  isModalOpen: (state) => state.isModalOpen,
  displaySuccess: (state) => state.displaySuccess,
  isEditAsset: (state) => state.isEditAsset,
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
};
const mutations = {
  OPEN_MODAL: (state) => (state.isModalOpen = true),
  CLOSE_MODAL: (state) => {
    state.isModalOpen = false;
    state.displaySuccess = false;
    state.isEditAsset = false;
  },
  OPEN_SUCCESS: (state) => (state.displaySuccess = true),
  OPEN_EDIT_ASSET: (state) => (state.isEditAsset = true),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
