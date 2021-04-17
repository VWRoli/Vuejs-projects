const state = {
  assets: [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      current_price: 61142,
      market_cap: 1143296851075,
      market_cap_rank: 1,
      fully_diluted_valuation: 1284954726917,
      total_volume: 76215053216,
      high_24h: 62460,
      low_24h: 60675,
      price_change_24h: 412.29,
      price_change_percentage_24h: 0.67889,
      market_cap_change_24h: 10842160567,
      market_cap_change_percentage_24h: 0.9574,
      circulating_supply: 18684887,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 64805,
      ath_change_percentage: -5.58281,
      ath_date: '2021-04-14T11:54:46.763Z',
      atl: 67.81,
      atl_change_percentage: 90134.03844,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2021-04-17T12:05:07.552Z',
      holdings: 0.0615,
    },
    {
      id: 'litecoin',
      symbol: 'ltc',
      name: 'Litecoin',
      image:
        'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580',
      current_price: 310.23,
      market_cap: 20756563477,
      market_cap_rank: 10,
      fully_diluted_valuation: null,
      total_volume: 15999792954,
      high_24h: 333.19,
      low_24h: 268.6,
      price_change_24h: 33.56,
      price_change_percentage_24h: 12.13165,
      market_cap_change_24h: 2286186544,
      market_cap_change_percentage_24h: 12.37758,
      circulating_supply: 66752414.5153875,
      total_supply: 84000000,
      max_supply: null,
      ath: 360.66,
      ath_change_percentage: -13.7839,
      ath_date: '2017-12-18T00:00:00.000Z',
      atl: 1.15,
      atl_change_percentage: 26966.04276,
      atl_date: '2015-01-14T00:00:00.000Z',
      roi: null,
      last_updated: '2021-04-17T12:06:15.014Z',
      holdings: 13,
    },
    {
      id: 'stellar',
      symbol: 'xlm',
      name: 'Stellar',
      image:
        'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157',
      current_price: 0.608204,
      market_cap: 13927506967,
      market_cap_rank: 14,
      fully_diluted_valuation: null,
      total_volume: 1937702372,
      high_24h: 0.640896,
      low_24h: 0.571603,
      price_change_24h: 0.0104842,
      price_change_percentage_24h: 1.75403,
      market_cap_change_24h: 271516993,
      market_cap_change_percentage_24h: 1.98826,
      circulating_supply: 22881768222.5731,
      total_supply: 50000000000,
      max_supply: null,
      ath: 0.875563,
      ath_change_percentage: -30.48214,
      ath_date: '2018-01-03T00:00:00.000Z',
      atl: 0.00047612,
      atl_change_percentage: 127739.2704,
      atl_date: '2015-03-05T00:00:00.000Z',
      roi: null,
      last_updated: '2021-04-17T12:05:33.579Z',
      holdings: 10000,
    },
  ],

  defaultCurrency: 'usd',
  isLoading: false,
  isError: false,
};
const getters = {
  allAssets: (state) => state.assets,
  defaultCurrency: (state) => state.defaultCurrency,
};
const actions = {
  clearAssets({ commit }) {
    commit('CLEAR_ASSETS');
  },
  removeAsset({ commit }, id) {
    commit('REMOVE_ASSET', id);
  },
};
const mutations = {
  CLEAR_ASSETS: (state) => (state.assets = []),
  REMOVE_ASSET: (state, id) =>
    (state.assets = state.assets.filter((asset) => asset.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
