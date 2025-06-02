<template>
  <main class="flex bg-gray-100 min-h-screen w-full">
    <CryptoSelector v-model="selectedCoinId" />

    <div class="flex-1 p-4">
      <div class="bg-white p-3 rounded-md shadow-md mb-4" style="display: flex; justify-content: space-between;">
        <div style="display: flex; gap: 15px; height: 44px;">
          <ChartTypeSelector v-model="selectedChartType" class="w-48" />
          <CurrencySelector v-model="selectedCurrency" class="w-32" />
        </div>

        <div>
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
const selectedChartType = ref<ChartType>('bar');
const selectedCurrency = ref('usd');

const cryptoChartConfig = computed<ChartConfig>(() => {
  const range = dateRangeOptions[selectedRange.value];
  return {
    title: `${selectedCoinId.value} en Tiempo Real`,
    dataSource: `https://api.coingecko.com/api/v3/coins/${selectedCoinId.value}/market_chart?vs_currency=${selectedCurrency.value}&days=${range.days}`,
    labelType: range.labelType,
    refreshInterval: 5000,
    chartType: selectedChartType.value,
  };
});
</script>
