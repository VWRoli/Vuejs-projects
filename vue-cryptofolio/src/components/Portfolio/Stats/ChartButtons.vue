<template>
  <div className="graph-btn-container">
    <button
      v-for="button in buttons"
      :button="button"
      :key="button.label"
      class="chart-btn"
    >
      {{ button.label }}
    </button>
  </div>
</template>

<script>
import { calcYtd } from '../../../helpers';
export default {
  name: 'ChartButtons',
  data() {
    return {
      buttons: [
        { label: '1d', days: '1' },
        { label: '7d', days: '7' },
        { label: '30d', days: '30' },
        { label: '90d', days: '90' },
        { label: 'YTD', days: calcYtd() },
      ],
    };
  },
  methods: {
    calcYtd() {
      return calcYtd();
    },
  },
};
</script>
