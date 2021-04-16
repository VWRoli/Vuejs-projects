const state = {
  assets: [
    { id: 'bitcoin', holdings: 1 },
    { id: 'ethereum', holdings: 5 },
    { id: 'stellar', holdings: 1258 },
  ],
  coinInfo: [],
  defaultCurrency: 'usd',
};
const getters = {
  allCoinInfo: (state) => state.coinInfo,
  defaultCurrency: (state) => state.defaultCurrency,
};
const actions = {
  async fetchCoinInfo({ commit }) {
    //todo url formatter
    const urlFormatter = (url, array) => {
      const urlPart = array
        .map((item) => {
          return `${item.id}%2C%20`;
        })
        .join('');

      return `${url}${urlPart}`;
    };
    const formattedUrl = urlFormatter(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.defaultCurrency}&ids=`,
      state.assets
    );

    const response = await fetch(`${formattedUrl}`);
    const coinInfo = await response.json();

    commit('setCoinInfo', coinInfo);
  },
};
const mutations = {
  setCoinInfo: (state, coins) => (state.coinInfo = coins),
  setTodos: (state, todos) => (state.todos = todos),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
