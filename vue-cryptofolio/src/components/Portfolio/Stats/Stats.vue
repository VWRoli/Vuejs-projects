<template>
  <section id="stats" v-if="!isLoading">
    <h2>Overview</h2>

    <div class="main-asset-value">
      {{ priceFormatter(totalValue, defaultCurrency) }}

      <span v-if="allAssets.length === 0">0%</span>

      <span v-else :class="totalValueChange > 0 ? 'positive' : 'negative'">
        <span :style="{ fontSize: '1.5rem', color: '#bbb' }">24h: </span>
        {{
          priceChangeFormatter(
            calcChangePercentage(totalValue, totalValueChange)
          )
        }}
      </span>
    </div>
    <Charts v-if="showCharts" />
    <div class="chart-placeholder" v-else>
      <button type="button" @click="displayCharts">Show Charts</button>
    </div>
  </section>
  <section id="stats" v-else>
    <h2>Overview</h2>
    <Loading />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  priceFormatter,
  priceChangeFormatter,
  calcChangePercentage,
} from '../../../helpers';
import Loading from '../../Loading';
import Charts from './Charts';

export default {
  name: 'Stats',
  components: {
    Charts,
    Loading,
  },
  data() {
    return {
      showCharts: false,
    };
  },
  methods: {
    priceFormatter(price, currency) {
      return priceFormatter(price, currency);
    },
    priceChangeFormatter(priceChange) {
      return priceChangeFormatter(priceChange);
    },
    calcChangePercentage(curValue, change) {
      return calcChangePercentage(curValue, change);
    },
    displayCharts() {
      this.showCharts = true;
    },
  },
  computed: mapGetters([
    'isLoading',
    'isError',
    'allAssets',
    'totalValueChange',
    'totalValue',
    'defaultCurrency',
  ]),
};
</script>
