import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Table } from '~/components/Table/Table';
import type { Sale, ColumnKey } from '~/types/types';

const mockData: Sale[] = [
  {
    date: '2025-01-01',
    channel_name: 'chan1',
    order_status_id: 1,
    sum_sales: 100.5,
    count_orders: 2,
  },
  {
    date: '2025-01-02',
    channel_name: 'chan2',
    order_status_id: 0,
    sum_sales: 50,
    count_orders: 1,
  },
  {
    date: '2025-01-03',
    channel_name: 'chan3',
    order_status_id: 1,
    sum_sales: 200,
    count_orders: 3,
  },
];

const toggleColumnMock = vi.fn();
const onSortMock = vi.fn();

vi.mock('~/hooks/Table/useTableColumns', () => ({
  useTableColumns: () => ({
    visibleColumns: ['date', 'channel_name'] as ColumnKey[],
    toggleColumn: toggleColumnMock,
  }),
}));

vi.mock('~/hooks/Table/useTableSorting', () => ({
  useTableSorting: (_data: Sale[], _visible: ColumnKey[]) => ({
    sortKey: null,
    sortOrder: null,
    sortedData: mockData,
    onSort: onSortMock,
  }),
}));

vi.mock('~/consts', async () => {
  const actual = await vi.importActual('~/consts');
  return {
    ...actual,
    COLUMNS: [
      { key: 'date', label: 'Date', sortable: true },
      { key: 'channel_name', label: 'Channel', sortable: true },
    ],
    ROWS_INCREMENT: 2,
  };
});

describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table header and ColumnSelector', () => {
    render(<Table data={mockData} />);
    const headers = screen.getAllByText('Date').filter((el) => el.tagName === 'TH');
    expect(headers.length).toBe(1);
    const channelHeader = screen.getAllByText('Channel').filter((el) => el.tagName === 'TH');
    expect(channelHeader.length).toBe(1);
  });

  it('renders only initial rows based on ROWS_INCREMENT', () => {
    render(<Table data={mockData} />);
    const rows = screen.getAllByRole('row').filter((row) => row.closest('tbody'));
    expect(rows.length).toBe(2);
  });

  it('shows "More" button if not all rows are displayed', () => {
    render(<Table data={mockData} />);
    const button = screen.getByRole('button', { name: /more/i });
    expect(button).toBeDefined();
  });

  it('loads more rows when "More" button is clicked', () => {
    render(<Table data={mockData} />);
    const button = screen.getByRole('button', { name: /more/i });
    fireEvent.click(button);
    const rows = screen.getAllByRole('row').filter((row) => row.closest('tbody'));
    expect(rows.length).toBe(3);
  });

  it('calls toggleColumn from ColumnSelector', () => {
    render(<Table data={mockData} />);
    toggleColumnMock();
    expect(toggleColumnMock).toHaveBeenCalled();
  });

  it('passes onSort to TableHeader', () => {
    render(<Table data={mockData} />);
    onSortMock('date', 'asc');
    expect(onSortMock).toHaveBeenCalledWith('date', 'asc');
  });

  it('matches snapshot', () => {
    const { container } = render(<Table data={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
