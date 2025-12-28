import type { BarOption, Column, Fields, LineOption } from './types/types';

export const STORAGE_KEY = 'sales-table-columns';
export const ROWS_INCREMENT = 10;
export const asc = 'asc';
export const desc = 'desc';
export const index = 'index';

export const COLUMNS: Column[] = [
  { key: index, label: 'Nr', sortable: false },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'channel_name', label: 'Name', sortable: true },
  { key: 'order_status_id', label: 'Status', sortable: true },
  { key: 'sum_sales', label: 'Sales', sortable: true },
  { key: 'count_orders', label: 'Orders', sortable: true },
];

export const FIELDS: Fields[] = [
  { label: 'Date', value: 'date' },
  { label: 'Name', value: 'channel_name' },
  { label: 'Status', value: 'order_status_id' },
  { label: 'Sales', value: 'sum_sales' },
  { label: 'Orders', value: 'count_orders' },
];

export const CHANNEL_MAP: Record<string, string> = {
  '[allegro-pl]': 'Allegro',
  '[shoper_rest]': 'Shoper',
  '[shopify_v2]': 'Shopify',
  '[presta]': 'Presta',
  '[ebay de]': 'eBay',
};

export const BLUE = '#3b82f6';
export const COLORS = [
  '#22c55e', // intensywna zieleń
  BLUE,
  '#f59e0b', // mocny pomarańcz
  '#ef4444', // intensywna czerwień
  '#8b5cf6', // fioletowy / purpurowy
  '#ec4899', // róż
];

export const LINE_OPTIONS: readonly LineOption[] = [
  { key: 'count_orders', id: 'Orders By Date' },
  { key: 'sum_sales', id: 'Sales By Date' },
];

export const BAR_OPTIONS: readonly BarOption[] = [
  { key: 'sum_sales', label: 'Sum Sales' },
  { key: 'count_orders', label: 'Count Orders' },
];

export const LINE_COMMON_PROPS = {
  margin: { top: 20, right: 40, bottom: 50, left: 60 },
  xScale: { type: 'point' as const },
  yScale: { type: 'linear' as const, min: 0, max: 'auto' as const },
  curve: 'monotoneX' as const,
  enablePoints: false,
  useMesh: true,
  axisLeft: { tickValues: 5 },
};

export const BAR_COMMON_PROPS = {
  margin: { top: 20, right: 40, bottom: 50, left: 60 },
  padding: 0.3,
  axisLeft: { tickValues: 5 },
  enableLabel: false,
};
