<template>
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
</template>

<script>
import ChartButtons from './ChartButtons';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default {
  components: {
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
    showLineChart() {
      this.isLineChart = true;
    },
    showPieChart() {
      this.isLineChart = false;
    },
  },
};
</script>

<style></style>
