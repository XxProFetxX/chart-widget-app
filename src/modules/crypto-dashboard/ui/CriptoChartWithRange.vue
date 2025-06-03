<template>
  <main class="flex bg-gray-100 min-h-screen w-full">
    <div class="flex-1">
      <div
        class="bg-white p-4 rounded-md shadow-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex flex-col sm:flex-row gap-4 md:items-center">
          <CryptoSelector v-model="selectedCoinId" class="w-full sm:w-auto" />
          <ChartTypeSelector v-model="selectedChartType" class="w-full sm:w-48" />
          <CurrencySelector v-model="selectedCurrency" class="w-full sm:w-32" />
        </div>

        <div class="w-full md:w-auto">
          <DateRangeSelector v-model="selectedRange" class="w-full" />
        </div>
      </div>

      <ChartWidget :config="cryptoChartConfig" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CryptoSelector from './CryptoSelector.vue';
import DateRangeSelector from './DateRangeSelector.vue';
import ChartTypeSelector from '../../chart-widget/ui/ChartTypeSelector.vue';
import CurrencySelector from './CurrencySelector.vue';
import ChartWidget from '../../chart-widget/ui/ChartWidget.vue';
import type { ChartConfig } from '../../chart-widget/domain/ChartConfig';
import { dateRangeOptions, type DateRangeKey } from '../domain/DateRange';
import type { ChartType } from '../../chart-widget/domain/ChartType';

const selectedRange = ref<DateRangeKey>('1H');
const selectedCoinId = ref('bitcoin');
const selectedChartType = ref<ChartType>('line');
const selectedCurrency = ref('usd');

const cryptoChartConfig = computed<ChartConfig>(() => {
  const range = dateRangeOptions[selectedRange.value];
  return {
    title: `${selectedCoinId.value} en Tiempo Real`,
    dataSource: `https://api.coingecko.com/api/v3/coins/${selectedCoinId.value}/market_chart?vs_currency=${selectedCurrency.value}&days=${range.days}`,
    labelType: range.labelType,
    refreshInterval: 5000,
    chartType: selectedChartType.value,
    yAxisLabel: selectedCurrency.value.toUpperCase(),
    xAxisLabel: 'Tiempo',
  };
});
</script>
