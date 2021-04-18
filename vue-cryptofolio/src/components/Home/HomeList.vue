<template>
  <div v-if="!isLoading && !isError">
    <ListItem :key="coin.id" v-for="coin in coins" :coin="coin" />
  </div>
  <Error v-else-if="isError" />
  <Loading v-else />
</template>

<script>
import ListItem from '../ListItem';
import Loading from '../Loading';
import Error from '../Error';
const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1`;

export default {
  name: 'HomeList',
  components: {
    ListItem,
    Loading,
    Error,
  },
  data() {
    return {
      coins: [],
      isLoading: true,
      isError: false,
    };
  },
  methods: {
    async fetchCoins() {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`${res.status} Coin not found`);

        const data = await res.json();
        this.isLoading = false;

        return data;
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
      }
    },
  },
  async created() {
    this.coins = await this.fetchCoins();
  },
};
</script>
