import { describe, it, expect } from 'vitest';
import { buildLineData, buildBarData } from '~/utils/charts.utils';
import type { Sale } from '~/types/types';
import type { LineSeries, BarData } from '~/types/charts.types';

describe('buildLineData', () => {
  it('aggregates sales data by date', () => {
    const salesData: Sale[] = [
      {
        date: '2024-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 10,
        count_orders: 2,
      },
      {
        date: '2024-01-01',
        channel_name: 'B',
        order_status_id: 2,
        sum_sales: 5,
        count_orders: 1,
      },
      {
        date: '2024-01-02',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 7,
        count_orders: 3,
      },
    ];

    const result: LineSeries[] = buildLineData(salesData, 'sum_sales', 'Revenue');

    expect(result).toEqual([
      {
        id: 'Revenue',
        data: [
          { x: '2024-01-01', y: 15 },
          { x: '2024-01-02', y: 7 },
        ],
      },
    ]);
  });

  it('returns empty data when salesData is empty', () => {
    const result: LineSeries[] = buildLineData([], 'sum_sales', 'Revenue');
    expect(result).toEqual([{ id: 'Revenue', data: [] }]);
  });

  it('works for different metric keys', () => {
    const salesData: Sale[] = [
      {
        date: '2024-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 10,
        count_orders: 2,
      },
      {
        date: '2024-01-01',
        channel_name: 'B',
        order_status_id: 2,
        sum_sales: 5,
        count_orders: 1,
      },
    ];

    const result: LineSeries[] = buildLineData(salesData, 'count_orders', 'Orders');

    expect(result).toEqual([
      {
        id: 'Orders',
        data: [{ x: '2024-01-01', y: 3 }],
      },
    ]);
  });
});

describe('buildBarData', () => {
  it('aggregates sales data by normalized channel and sorts descending', () => {
    const salesData: Sale[] = [
      {
        date: '2024-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 10,
        count_orders: 2,
      },
      {
        date: '2024-01-01',
        channel_name: 'facebook_ads',
        order_status_id: 2,
        sum_sales: 5,
        count_orders: 1,
      },
      {
        date: '2024-01-02',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 7,
        count_orders: 3,
      },
    ];

    const result: readonly BarData[] = buildBarData(salesData, 'sum_sales', 'Revenue');

    expect(result).toEqual([
      { channel: 'A', Revenue: 17 },
      { channel: 'facebook_ads', Revenue: 5 },
    ]);
  });

  it('replaces unknown normalized channel with original value if not in map', () => {
    const salesData: Sale[] = [
      {
        date: '2024-01-01',
        channel_name: 'UnknownChannel',
        order_status_id: 1,
        sum_sales: 10,
        count_orders: 2,
      },
    ];

    const result: readonly BarData[] = buildBarData(salesData, 'sum_sales', 'Revenue');

    expect(result).toEqual([{ channel: 'UnknownChannel', Revenue: 10 }]);
  });

  it('aggregates using different metric key', () => {
    const salesData: Sale[] = [
      {
        date: '2024-01-01',
        channel_name: 'A',
        order_status_id: 1,
        sum_sales: 10,
        count_orders: 2,
      },
      {
        date: '2024-01-01',
        channel_name: 'B',
        order_status_id: 2,
        sum_sales: 5,
        count_orders: 1,
      },
    ];

    const result: readonly BarData[] = buildBarData(salesData, 'count_orders', 'Orders');

    expect(result).toEqual([
      { channel: 'A', Orders: 2 },
      { channel: 'B', Orders: 1 },
    ]);
  });

  it('returns empty array when salesData is empty', () => {
    const result: readonly BarData[] = buildBarData([], 'sum_sales', 'Revenue');
    expect(result).toEqual([]);
  });
});
