const state = {
  isModalOpen: true,
  activeCoin: '',
  displaySuccess: true,
  isEditAsset: false,
};
const getters = {
  isModalOpen: (state) => state.isModalOpen,
  displaySuccess: (state) => state.displaySuccess,
  isEditAsset: (state) => state.isEditAsset,
};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
