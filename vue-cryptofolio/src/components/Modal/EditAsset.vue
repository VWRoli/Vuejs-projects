<template>
  <div id="add-new-asset">
    <h1>Edit Asset</h1>

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
      <div className="your-data">
        <h3>
          Your Holdings:
          <span>
            {{ this.holdings }} <span>{{ coin.symbol }}</span>
          </span>
        </h3>
        <h3>
          Your Asset Value:
          <span>
            {{
              priceFormatter(
                coin.current_price * this.holdings,
                defaultCurrency
              )
            }}
          </span>
        </h3>
      </div>
      <form>
        <label for="holdings">Quantity: </label>
        <input
          type="number"
          name="holdings"
          id="holdings"
          :value="this.holdings"
        />

        <button type="submit" class="primary-btn">Edit Asset</button>
      </form>
    </section>
    <Error v-else-if="isError" />
    <Loading v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    async fetchCoin() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.defaultCurrency}&ids=bitcoin`
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
  },
  computed: mapGetters(['defaultCurrency']),
  async created() {
    this.coin = await this.fetchCoin();
  },
};
</script>
