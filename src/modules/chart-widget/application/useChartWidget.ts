import { ref, onMounted, watch, onUnmounted, type Ref } from 'vue';
import type { ChartConfig } from '../domain/ChartConfig';
import type { ChartPoint } from '../domain/ChartPoint';
import { fetchChartPoints } from '../infrastructure/ChartApi';

export function useChartWidget(configRef: Ref<ChartConfig>) {
  const points = ref<ChartPoint[]>([]);
  let intervalId: number | undefined;

  const loadData = async () => {
    const data = await fetchChartPoints(configRef.value.dataSource, configRef.value.labelType);
    points.value = data;
  };

  const setupInterval = () => {
    if (intervalId) clearInterval(intervalId);
    if (configRef.value.refreshInterval) {
      intervalId = window.setInterval(loadData, configRef.value.refreshInterval);
    }
  };

  onMounted(() => {
    loadData();
    setupInterval();
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  watch(
    () => configRef.value.dataSource,
    () => {
      loadData();
      setupInterval();
    }
  );

  return { points, loadData };
}
