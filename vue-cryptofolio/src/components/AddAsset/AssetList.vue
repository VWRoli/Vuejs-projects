<template>
  <section id="asset-list">
    <!--  <h3 className="no-results">
      We couldn't find your coin, please try again.
    </h3> -->

    <div v-if="!isLoading && !isError">
      <ListItem :key="coin.id" v-for="coin in coins" :coin="coin" />
    </div>
    <Error v-else-if="isError" />
    <Loading v-else />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from '../ListItem';
import Loading from '../Loading';
import Error from '../Error';

export default {
  name: 'AssetList',
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
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.searchQuery}&order=market_cap_desc&per_page=30&page=1&`
        );
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
  computed: mapGetters(['searchQuery']),
  async created() {
    this.coins = await this.fetchCoins();
  },
  async updated() {
    this.coins = await this.fetchCoins();
  },
};
</script>
