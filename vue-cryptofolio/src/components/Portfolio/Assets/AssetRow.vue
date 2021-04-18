<template>
  <tr>
    <td class="table-name">
      <img :src="correctCoin.image" :alt="correctCoin.name" />
      <p>
        {{ correctCoin.name }} <br />
        <span class="symbol">{{ correctCoin.symbol }}</span>
      </p>
    </td>
    <!-- PRICE -->
    <td>
      {{ this.priceFormatter(correctCoin.current_price, defaultCurrency) }}
    </td>
    <!-- PRICE CHANGE % -->
    <td
      :class="
        correctCoin.price_change_percentage_24h > 0 ? 'positive' : 'negative'
      "
      class="percentage-change-row"
    >
      {{ this.priceChangeFormatter(correctCoin.price_change_percentage_24h) }}
    </td>

    <!-- HOLDINGS -->
    <td class="holdings-row">
      {{
        this.priceFormatter(
          correctCoin.current_price * asset.holdings,
          defaultCurrency
        )
      }}
      <br />

      <span class="holdings">
        {{ asset.holdings?.toFixed(4) }}
        <span class="symbol">&nbsp;{{ correctCoin.symbol }}</span>
      </span>
    </td>
    <!--  PROFIT/LOSS  -->
    <td
      class="profit-row"
      :class="correctCoin.price_change_24h > 0 ? 'positive' : 'negative'"
    >
      {{
        priceFormatter(
          correctCoin.price_change_24h * asset.holdings,
          defaultCurrency
        )
      }}
    </td>
    <!-- ACTIONS -->

    <td class="actions-row">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit icons" title="Edit transaction"></i>
      </button>
      <button type="button" class="remove-btn" @click="removeAsset(asset.id)">
        <i class="far fa-minus-square icons" title="Remove transaction"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { priceFormatter, priceChangeFormatter } from '../../../helpers';

export default {
  name: 'AssetRow',
  data() {
    return {
      correctCoin: {},
    };
  },
  props: {
    asset: Object,
  },
  methods: {
    ...mapActions(['removeAsset']),

    priceFormatter(price, currency) {
      return priceFormatter(price, currency);
    },
    priceChangeFormatter(priceChange) {
      return priceChangeFormatter(priceChange);
    },
    async setCorrectCoin() {
      this.correctCoin = await this.allCoinsInfo.filter(
        (coin) => coin.id === this.asset.id
      );
      console.log(this.correctCoin);
    },
  },
  computed: mapGetters(['defaultCurrency', 'allAssets', 'allCoinsInfo']),
  created() {
    this.setCorrectCoin();
  },
};
</script>
