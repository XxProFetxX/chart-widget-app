import axios from 'axios';
import type { ChartPoint } from '../domain/ChartPoint';
import type { LabelType } from '../domain/ChartConfig';

function formatLabel(date: Date, labelType: LabelType): string {
  switch (labelType) {
    case 'hour':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case 'date':
    case 'short':
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    default:
      return date.toLocaleString();
  }
}

function getLastHourData(prices: [number, number][]): [number, number][] {
  const oneHourAgo = Date.now() - 3600000;
  return prices.filter(([timestamp]) => timestamp >= oneHourAgo);
}

export async function fetchChartPoints(endpoint: string, labelType: LabelType = 'date'): Promise<ChartPoint[]> {
  const response = await axios.get(endpoint);
  let prices: [number, number][] = response.data.prices;

  if (labelType === 'hour') {
    prices = getLastHourData(prices);
  }

  return prices.map(([timestamp, value]) => {
    const date = new Date(timestamp);
    return {
      time: formatLabel(date, labelType),
      value,
    };
  });
}
