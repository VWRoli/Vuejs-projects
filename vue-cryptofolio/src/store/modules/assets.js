const state = {
  assets: [
    { id: 'bitcoin', holdings: 1 },
    { id: 'ethereum', holdings: 5 },
    { id: 'stellar', holdings: 1258 },
  ],
};
const getters = {
  allAssets: (state) => state.assets,
};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
