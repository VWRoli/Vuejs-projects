<template>
  <section id="asset-list">
    <!--  <h3 className="no-results">
      We couldn't find your coin, please try again.
    </h3> -->
    <Loading v-if="isLoading" />
    <ListItem :key="coin.id" v-for="coin in coins" :coin="coin" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from '../ListItem';
import Loading from '../Loading';

export default {
  name: 'AssetList',
  components: {
    ListItem,
    Loading,
  },
  data() {
    return {
      coins: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchCoins() {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.searchQuery}&order=market_cap_desc&per_page=30&page=1&`
      );
      const data = await res.json();
      this.isLoading = false;
      return data;
    },
  },
  computed: mapGetters(['searchQuery']),
  async created() {
    this.coins = await this.fetchCoins();
  },
  async updated() {
    this.coins = await this.fetchCoins();
  },
};
</script>

<style></style>
