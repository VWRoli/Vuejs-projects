const state = {
  assets: JSON.parse(localStorage.getItem('coinAssets')) || [],
  coinsInfo: [],
  defaultCurrency: 'usd',
  isLoading: false,
  isError: false,
  searchQuery: '',
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  chartDays: '7',
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

      //?Get API urls for chart
      const chartUrls = state.assets.map(
        (item) =>
          `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=${state.defaultCurrency}&days=${state.chartDays}`
      );
      //Fetch chart data
      const chartRes = await Promise.all(
        chartUrls.map((url) => fetch(url).catch((error) => error))
      );
      const chartData = await Promise.all(
        chartRes.map((response) =>
          response.json ? response.json().catch((error) => error) : response
        )
      );

      //todo Format chart data
      //////////////////////////
      //////////////////////////
      //////////////////////////
      const chartDataFormatter = (data, assets) => {
        //Get prices from chart data array, because it has market and voluma data too

        const priceData = data.map((item) => {
          return item.prices;
        });

        //Calculate prices of holdings
        const holdingPrices = priceData.map((array, i) => {
          const currentHoldings = assets[i].holdings;
          return array.map((item) => currentHoldings * item[1]);
        });

        if (!priceData[0]) return;

        //Get timestamps for chart
        const timeStamps = priceData[0].map((stamp) => stamp[0]);

        //Get and add the total price values
        const totalPrices = holdingPrices
          .map((array) => array.map((el) => el))
          .reduce((acc, curr) => acc.map((el, i) => el + curr[i]));

        //Createing a data Object for the chart
        const chartDataObj = timeStamps.map((el, i) => {
          //Configuration
          const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            weekday: 'long',
          };

          //Locale
          const locale = navigator.language;
          //Formatting the date
          const formattedDate = new Intl.DateTimeFormat(locale, options).format(
            new Date(el)
          );

          return { day: formattedDate, price: totalPrices[i] };
        });

        return chartDataObj;
      };
      //////////////////////////
      //////////////////////////
      //////////////////////////
      commit('SET_CHART_DATA', chartDataFormatter(chartData, state.assets));
      console.log(state.chartData);
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
  CLEAR_ASSETS: (state) => {
    state.assets = [];
    localStorage.setItem('coinAssets', JSON.stringify([]));
  },
  REMOVE_ASSET: (state, id) => {
    (state.assets = state.assets.filter((asset) => asset.id !== id)),
      localStorage.setItem('coinAssets', JSON.stringify([...state.assets]));
  },
  SET_LOADING: (state) => (state.isLoading = true),
  DISABLE_LOADING: (state) => (state.isLoading = false),
  SET_ERROR: (state) => (state.isError = true),
  EDIT_COIN: (state, coin) => {
    const deleteCoin = state.assets.filter((asset) => asset.id !== coin.id);
    state.assets = [...deleteCoin, coin];
    localStorage.setItem('coinAssets', JSON.stringify([...state.assets]));
  },
  ADD_ASSET: (state, asset) => {
    state.assets = [...state.assets, asset];
    localStorage.setItem('coinAssets', JSON.stringify([...state.assets]));
  },
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
  SET_CHART_DATA: (state, chartData) => (state.chartData = chartData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
