<template>
  <main class="p-4 bg-gray-100 min-h-screen w-full">
    <div class="flex items-center space-x-2 mb-4 bg-white p-2 rounded-md shadow-sm">
      <button
        v-for="(label, key) in ranges"
        :key="key"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition',
          selectedRange === key ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100',
        ]"
        @click="setRange(key)"
      >
        {{ label }}
      </button>
    </div>

    <ChartWidget :config="btcChartConfig" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ChartWidget from '../modules/chart-widget/ui/ChartWidget.vue';
import type { ChartConfig } from '../modules/chart-widget/domain/ChartConfig';

const selectedRange = ref<'1H' | '7D' | '1M' | '1Y' | 'all'>('1H');

const ranges = {
  '1H': '1H',
  '7D': '7D',
  '1M': '1M',
  '1Y': '1Y',
};

const daysMap: { [key: string]: any } = {
  '1H': {
    days: '1',
    labelType: 'hour',
  },
  '7D': {
    days: '7&interval=daily',
    labelType: 'short',
  },
  '1M': {
    days: '30&interval=daily',
    labelType: 'short',
  },
  '1Y': {
    days: '365&interval=daily',
    labelType: 'short',
  },
};

const btcChartConfig = computed<ChartConfig>(() => ({
  title: 'Bitcoin en Tiempo Real',
  dataSource: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${
    daysMap[selectedRange.value].days
  }`,
  labelType: daysMap[selectedRange.value].labelType,
  refreshInterval: 5000,
}));

function setRange(key: keyof typeof ranges) {
  selectedRange.value = key;
}
</script>
