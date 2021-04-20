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

    <div class="chart-btn-container">
      <button class="chart-btn" @click="showLineChart">
        <i class="fas fa-chart-line stat-btn-icon"></i>
        Line Chart
      </button>
      <button class="chart-btn" @click="showPieChart">
        <i class="fas fa-chart-pie stat-btn-icon"></i>
        Pie Chart
      </button>
    </div>
    <LineChart v-if="isLineChart" />
    <PieChart v-else />

    <ChartButtons v-if="isLineChart" />
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
import ChartButtons from './ChartButtons';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default {
  name: 'Stats',
  components: {
    Loading,
    ChartButtons,
    LineChart,
    PieChart,
  },
  data() {
    return {
      isLineChart: true,
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
    showLineChart() {
      this.isLineChart = true;
    },
    showPieChart() {
      this.isLineChart = false;
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
