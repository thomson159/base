import type { asc, desc, index } from '../consts';

export type UseData = Readonly<
  {
    data: readonly Sale[];
    chartData: readonly Sale[];
    loading: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    filters: Filters;
    setFilters: (next: Partial<Filters>) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
  } & Metrics
>;

export type Sale = {
  date: string;
  channel_name: string;
  order_status_id: number;
  sum_sales: number;
  count_orders: number;
};

export type SaleJson = {
  channel_type: string;
} & Sale;

export type Filters = {
  readonly channelName?: string;
  readonly minDate?: string;
  readonly maxDate?: string;
  readonly channelNames?: readonly string[];
};

export type Metrics = Readonly<{
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}>;

export type Sort = { field: keyof Sale; order: SortOrder };
export type Column = { key: ColumnKey; label: string; sortable?: boolean };
export type SortKey = keyof Sale | null;
export type SortOrder = typeof asc | typeof desc;
export type ColumnKey = keyof Sale | typeof index;
export type Fields = { label: string; value: keyof Sale };
export type MetricKey = 'sum_sales' | 'count_orders';

export type LineOption = {
  key: MetricKey;
  id: string;
};

export type BarOption = {
  key: MetricKey;
  label: string;
};
