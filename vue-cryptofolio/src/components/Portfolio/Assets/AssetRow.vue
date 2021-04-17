<template>
  <tr>
    <td class="table-name">
      <img :src="coin.image" :alt="coin.name" />
      <p>
        {{ coin.name }} <br />
        <span class="symbol">{{ coin.symbol }}</span>
      </p>
    </td>
    <!-- PRICE -->
    <td>{{ this.priceFormatter(coin.current_price, defaultCurrency) }}</td>
    <!-- PRICE CHANGE % -->
    <td
      :class="coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'"
      class="percentage-change-row"
    >
      {{ this.priceChangeFormatter(coin.price_change_percentage_24h) }}
    </td>

    <!-- HOLDINGS -->
    <td class="holdings-row">
      {{
        this.priceFormatter(coin.current_price * coin.holdings, defaultCurrency)
      }}
      <br />

      <span class="holdings">
        {{ coin.holdings?.toFixed(4) }}
        <span class="symbol">&nbsp;{{ coin.symbol }}</span>
      </span>
    </td>
    <!--  PROFIT/LOSS  -->
    <td
      class="profit-row"
      :class="coin.price_change_24h > 0 ? 'positive' : 'negative'"
    >
      {{
        priceFormatter(coin.price_change_24h * coin.holdings, defaultCurrency)
      }}
    </td>
    <!-- ACTIONS -->

    <td className="actions-row">
      <button type="button" className="edit-btn">
        <i class="fas fa-edit icons" title="Edit transaction"></i>
      </button>
      <button
        type="button"
        className="remove-btn"
        @click="removeAsset(coin.id)"
      >
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

  props: {
    coin: Object,
  },
  methods: {
    ...mapActions(['removeAsset']),

    priceFormatter(price, currency) {
      return priceFormatter(price, currency);
    },
    priceChangeFormatter(priceChange) {
      return priceChangeFormatter(priceChange);
    },
  },
  computed: mapGetters(['defaultCurrency', 'allAssets']),
};
</script>
