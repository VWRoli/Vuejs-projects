const state = {
  assets: [{ id: 'bitcoin', holdings: 1 }],
  coinsInfo: [],
  defaultCurrency: 'usd',
  isLoading: false,
  isError: false,
  searchQuery: '',
  totalValue: 0,
  totalValueChange: 0,
};
const getters = {
  allAssets: (state) => state.assets,
  allCoinsInfo: (state) => state.coinsInfo,
  defaultCurrency: (state) => state.defaultCurrency,
  isLoading: (state) => state.isLoading,
  isError: (state) => state.isError,
  searchQuery: (state) => state.searchQuery,
  totalValue: (state) => state.totalValue,
  totalValueChange: (state) => state.totalValueChange,
};
const actions = {
  async fetchCoinsInfo({ commit }, currencyType) {
    try {
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

      if (!response.ok) throw new Error(`${response.status} Coin not found`);

      const coinInfo = await response.json();

      commit('SET_COINS_INFO', coinInfo);
      commit('GET_TOTALS');
      commit('GET_TOTAL_CHANGE');
      commit('DISABLE_LOADING');
    } catch (error) {
      commit('DISABLE_LOADING');
      commit('SET_ERROR');
      console.log(error);
    }
  },
  clearAssets({ commit }) {
    commit('CLEAR_ASSETS');
    commit('GET_TOTALS');
    commit('GET_TOTAL_CHANGE');
  },
  removeAsset({ commit }, id) {
    commit('REMOVE_ASSET', id);
    commit('GET_TOTALS');
    commit('GET_TOTAL_CHANGE');
  },
  editAsset({ commit }, coin, holdings) {
    commit('EDIT_COIN', coin, holdings);
    commit('GET_TOTALS');
    commit('GET_TOTAL_CHANGE');
  },
  addAsset({ commit }, asset) {
    commit('ADD_ASSET', asset);
  },
  setDefaultCurrency({ commit }, currencyType) {
    commit('SET_DEFAULT_CURRENCY', currencyType);
  },
  setSearchQuery({ commit }, query) {
    commit('SET_QUERY', query);
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
  EDIT_COIN: (state, coin) => {
    const deleteCoin = state.assets.filter((asset) => asset.id !== coin.id);
    state.assets = [...deleteCoin, coin];
  },
  ADD_ASSET: (state, asset) => (state.assets = [...state.assets, asset]),
  SET_DEFAULT_CURRENCY: (state, currencyType) =>
    (state.defaultCurrency = currencyType),
  SET_QUERY: (state, query) => (state.searchQuery = query),
  GET_TOTALS: (state) => {
    //Get the current value for the whole portfolio
    const currentAssetValue = state.assets
      .map((asset) => {
        const [correctCoin] = state.coinsInfo.filter(
          (coin) => coin.id === asset.id
        );
        return asset.holdings * correctCoin?.current_price;
      })
      .reduce((acc, cur) => acc + cur, 0);
    state.totalValue = currentAssetValue;
  },
  GET_TOTAL_CHANGE: (state) => {
    //Get the 24h price change for the whole portfolio
    const assetValueChange = state.assets
      .map((asset) => {
        const [correctCoin] = state.coinsInfo.filter(
          (coin) => coin.id === asset.id
        );

        return asset.holdings * correctCoin?.price_change_24h;
      })
      .reduce((acc, cur) => acc + cur, 0);
    state.totalValueChange = assetValueChange;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
