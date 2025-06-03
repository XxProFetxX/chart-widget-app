export type DateRangeKey = '1H' | '7D' | '1M' | '1Y';

export interface DateRangeOption {
  label: string;
  days: string;
  labelType: 'hour' | 'short';
  description?: string;
}

export const dateRangeOptions: Record<DateRangeKey, DateRangeOption> = {
  '1H': { label: '1H', days: '1', labelType: 'hour', description: 'Última hora' },
  '7D': { label: '7D', days: '7&interval=daily', labelType: 'short', description: 'Últimos 7 días' },
  '1M': { label: '1M', days: '30&interval=daily', labelType: 'short', description: 'Último mes' },
  '1Y': { label: '1Y', days: '365&interval=daily', labelType: 'short', description: 'Último año' },
};
