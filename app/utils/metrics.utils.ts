import type { Sale, Metrics } from '~/types/types';

export const calculateMetrics = (data: readonly Sale[]): Metrics => {
  const totalRevenue: number = data.reduce((sum, s) => sum + s.sum_sales, 0);
  const totalOrders: number = data.reduce((sum, s) => sum + s.count_orders, 0);

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue: totalOrders !== 0 ? totalRevenue / totalOrders : 0,
  };
};
