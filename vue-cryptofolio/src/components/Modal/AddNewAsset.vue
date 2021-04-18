<template>
  <div id="add-new-asset">
    <h1>Add New Asset</h1>

    <section v-if="!isLoading && !isError">
      <header>
        <img :src="coin.image" :alt="coin.name" />

        <h2>
          {{ coin.name }} <span>{{ coin.symbol }}</span>
        </h2>

        <p>
          24h:
          <span
            :class="
              coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'
            "
          >
            {{ priceChangeFormatter(coin.price_change_percentage_24h) }}
          </span>
        </p>
      </header>
      <h3>
        Current Price:
        <span>{{ priceFormatter(coin.current_price, defaultCurrency) }}</span>
      </h3>
      <form @submit="onSubmit">
        <label for="holdings">Quantity: </label>
        <input
          type="number"
          name="holdings"
          id="holdings"
          v-model="this.holdings"
        />

        <button type="submit" class="primary-btn">Add Asset</button>
      </form>
    </section>
    <Error v-else-if="isError" />
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { priceFormatter, priceChangeFormatter } from '../../helpers';
import Loading from '../Loading';
import Error from '../Error';

export default {
  name: 'AddNewAsset',
  components: {
    Loading,
    Error,
  },
  data() {
    return {
      isLoading: true,
      isError: false,
      coin: {},
      holdings: '',
    };
  },
  methods: {
    ...mapActions(['openSuccess', 'addAsset']),
    async fetchCoin() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.defaultCurrency}&ids=${this.activeCoin}`
        );
        if (!res.ok) throw new Error(`${res.status} Coin not found`);

        const [data] = await res.json();

        this.isLoading = false;

        return data;
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
      }
    },
    priceFormatter(price, currency) {
      return priceFormatter(price, currency);
    },
    priceChangeFormatter(priceChange) {
      return priceChangeFormatter(priceChange);
    },
    onSubmit(e) {
      e.preventDefault();
      const newAsset = { id: this.coin.id, holdings: +this.holdings };
      this.openSuccess();
      this.addAsset(newAsset);
    },
  },
  computed: mapGetters(['defaultCurrency', 'activeCoin']),
  async created() {
    this.coin = await this.fetchCoin();
  },
};
</script>
