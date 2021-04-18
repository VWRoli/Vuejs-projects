<template>
  <section id="asset-list">
    <!--  <h3 className="no-results">
      We couldn't find your coin, please try again.
    </h3> -->
    <Loading v-if="isLoading" />
    <ListItem :key="coin.id" v-for="coin in coins" :coin="coin" />
  </section>
  <!-- <section id='asset-list'>
      {noResults ? (
        <h3 className='no-results'>
          We couldn't find your coin, please try again.
        </h3>
      ) : (
        coins.map((coin) => {
          const owned = ownedCoins.some((item) => item.id === coin.id);
          return <ListItem key={coin.id} coin={coin} owned={owned} />;
        })
      )}
    </section> -->
</template>

<script>
import ListItem from '../ListItem';
import Loading from '../Loading';

const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1`;

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
      const res = await fetch(BASE_URL);
      const data = await res.json();
      this.isLoading = false;
      return data;
    },
  },
  async created() {
    this.coins = await this.fetchCoins();
  },
};
</script>

<style></style>
