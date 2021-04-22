<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';

import store from '../../../store';
import VChart from 'vue-echarts';
import { ref, defineComponent } from 'vue';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default defineComponent({
  name: 'LineChart',
  components: {
    VChart,
  },

  setup: () => {
    const option = ref({
      xAxis: {
        type: 'category',
        data: [...store.state.assets.chartData.map((data) => data.day)],
      },
      yAxis: {},
      series: [
        {
          type: 'line',
          name: '2015',
          data: [...store.state.assets.chartData.map((data) => data.price)],
        },
      ],
    });

    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
