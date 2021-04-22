<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import store from '../../../store';
import { ref, defineComponent } from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
]);

export default defineComponent({
  name: 'PieChart',
  components: {
    VChart,
  },
  setup: () => {
    //Create Pie chart data
    const calcPieChartData = (assets, info) => {
      return assets.map((asset) => {
        const [currentCoin] = info.filter((item) => asset.id === item.id);

        const totalValue = currentCoin.current_price * asset.holdings;
        return { name: asset.id, value: totalValue };
      });
    };

    const option = ref({
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            ...calcPieChartData(
              store.state.assets.assets,
              store.state.assets.coinsInfo
            ),
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
