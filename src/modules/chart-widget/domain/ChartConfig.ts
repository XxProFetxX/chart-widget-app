export type LabelType = 'hour' | 'date' | 'short';

export interface ChartConfig {
  title: string;
  dataSource: string;
  labelType?: LabelType;
  refreshInterval?: number;
  chartType?: 'line' | 'bar' | 'pie';
}
