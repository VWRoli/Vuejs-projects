<template>
  <ListItem :key="coin.id" v-for="coin in coins" :coin="coin" />
</template>

<script>
import ListItem from '../ListItem';
const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1`;

export default {
  name: 'HomeList',
  components: {
    ListItem,
  },
  data() {
    return {
      coins: [],
    };
  },
  methods: {
    async fetchCoins() {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.coins = await this.fetchCoins();
  },
};
</script>
