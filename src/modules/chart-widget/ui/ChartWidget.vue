<template>
  <div class="bg-white rounded p-4 shadow w-full">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold">
        {{ config.title }}
      </h2>
    </div>

    <div class="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <component class="absolute inset-0" :is="chartComponent" :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { useChartWidget } from '../application/useChartWidget';
import type { ChartConfig } from '../domain/ChartConfig';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps<{ config: ChartConfig }>();
const configRef = toRef(props, 'config');

const { points } = useChartWidget(configRef);

const chartData = computed(() => ({
  labels: points.value.map(p => p.time),
  datasets: [
    {
      label: props.config.title,
      borderColor: '#4B9CD3',
      backgroundColor: 'rgba(75, 156, 211, 0.2)',
      tension: 0.4,
      fill: true,
      data: points.value.map(p => p.value),
    },
  ],
}));

const chartComponent = computed(() => {
  switch (props.config.chartType) {
    case 'line':
      return Line;
    case 'bar':
      return Bar;
  }
});

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: props.config.xAxisLabel || 'Tiempo',
      },
      ticks: {
        maxRotation: 60,
        minRotation: 30,
        autoSkip: true,
        // maxTicksLimit: 6,
      },
    },
    y: {
      title: {
        display: true,
        text: props.config.yAxisLabel || 'Valor',
      },
    },
  },
}));
</script>

<style scoped>
.bar-chart-container {
  position: relative;
  width: 100%;
  height: 700px;
}
</style>
