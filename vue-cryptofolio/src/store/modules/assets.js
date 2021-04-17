const state = {
  assets: [
    {
      id: 'bitcoin',
      holdings: 0.0615,
    },
    {
      id: 'litecoin',
      holdings: 13,
    },
    {
      id: 'stellar',
      holdings: 10000,
    },
  ],
  coinsInfo: [],
  defaultCurrency: 'usd',
  isLoading: false,
  isError: false,
};
const getters = {
  allAssets: (state) => state.assets,
  allCoinsInfo: (state) => state.coinsInfo,
  defaultCurrency: (state) => state.defaultCurrency,
  isLoading: (state) => state.isLoading,
};
const actions = {
  async fetchCoinsInfo({ commit }, currencyType) {
    try {
      console.log('fetching');
      commit('SET_LOADING');
      //todo URL formatter
      const urlFormatter = (url, array) => {
        const urlPart = array
          .map((item) => {
            return `${item.id}%2C%20`;
          })
          .join('');

        return `${url}${urlPart}`;
      };
      const formattedUrl = urlFormatter(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyType}&ids=`,
        state.assets
      );

      const response = await fetch(`${formattedUrl}`);
      const coinInfo = await response.json();

      commit('SET_COINS_INFO', coinInfo);

      commit('DISABLE_LOADING');
    } catch (error) {
      commit('SET_ERROR');
    }
  },
  clearAssets({ commit }) {
    commit('CLEAR_ASSETS');
  },
  removeAsset({ commit }, id) {
    commit('REMOVE_ASSET', id);
  },
};
const mutations = {
  SET_COINS_INFO: (state, coins) => (state.coinsInfo = coins),
  CLEAR_ASSETS: (state) => (state.assets = []),
  REMOVE_ASSET: (state, id) =>
    (state.assets = state.assets.filter((asset) => asset.id !== id)),
  SET_LOADING: (state) => (state.isLoading = true),
  DISABLE_LOADING: (state) => (state.isLoading = false),
  SET_ERROR: (state) => (state.isError = true),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
