import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { Dashboard } from '~/components/Dashboard/Dashboard';
import type {
  ContainerProps,
  NavbarProps,
  PageSizeFilterProps,
  PaginationProps,
  FiltersProps,
  SortProps,
} from '~/types/components.types';
import type { UseDataResult } from '~/types/hooks.types';
import type { Sort } from '~/types/types';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const mockUseData: UseDataResult = {
  data: [
    {
      date: '2025-01-01',
      channel_name: 'chan1',
      order_status_id: 1,
      sum_sales: 100,
      count_orders: 2,
    },
  ],
  chartData: [],
  loading: false,
  page: 1,
  setPage: vi.fn(),
  pageSize: 10,
  setPageSize: vi.fn(),
  total: 1,
  totalPages: 1,
  filters: {},
  setFilters: vi.fn(),
  sort: undefined,
  setSort: vi.fn(),
  totalRevenue: 100,
  totalOrders: 2,
  avgOrderValue: 50,
};

vi.mock('~/hooks/Data/useData', () => ({
  useData: () => mockUseData,
}));

vi.mock('~/components/Dashboard/Navbar', () => ({
  Navbar: ({ onToggle, children }: NavbarProps) => (
    <div>
      <button onClick={onToggle}>toggle</button>
      {children}
    </div>
  ),
}));

vi.mock('~/components/Dashboard/Charts', () => ({
  default: () => <div data-testid="charts" />,
}));

vi.mock('~/components/Dashboard/Footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));

vi.mock('~/components/Dashboard/Container', () => ({
  Container: ({ children }: ContainerProps) => <div data-testid="container">{children}</div>,
}));

vi.mock('~/components/Filters/Filters', () => ({
  default: ({ onChange }: Pick<FiltersProps, 'onChange'>) => (
    <button data-testid="filters" onClick={() => onChange({ channelName: 'test' })} />
  ),
}));

vi.mock('~/components/Sort/Sort', () => ({
  default: ({ onChange }: SortProps) => (
    <button
      data-testid="sort"
      onClick={() =>
        onChange({
          field: 'date',
          order: 'asc',
        } satisfies Sort)
      }
    />
  ),
}));

vi.mock('~/components/Summary/Summary', () => ({
  Summary: () => <div data-testid="summary" />,
}));

vi.mock('~/components/Pagination/Pagination', () => ({
  Pagination: ({ onPageChange }: PaginationProps) => (
    <button data-testid="pagination" onClick={() => onPageChange(2)} />
  ),
}));

vi.mock('~/components/Filters/PageSizeFilter', () => ({
  PageSizeFilter: ({ onPageSizeChange }: PageSizeFilterProps) => (
    <button data-testid="pagesize" onClick={() => onPageSizeChange(25)} />
  ),
}));

vi.mock('~/components/Table/Table', () => ({
  default: () => <div data-testid="table" />,
}));

vi.mock('~/components/LoadingSpinner/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="spinner" />,
}));

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all dashboard components when data exists', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('container')).toBeDefined();
    expect(screen.getByTestId('summary')).toBeDefined();
    expect(screen.getByTestId('charts')).toBeDefined();
    expect(screen.getByTestId('pagesize')).toBeDefined();
    expect(screen.getByTestId('pagination')).toBeDefined();
    expect(screen.getByTestId('table')).toBeDefined();
    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('toggles filters via Navbar', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText('toggle'));
  });

  it('calls setFilters with correct Filters type', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByTestId('filters'));

    expect(mockUseData.setFilters).toHaveBeenCalledWith({
      channelName: 'test',
    });
  });

  it('calls setSort with correct Sort object', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByTestId('sort'));

    expect(mockUseData.setSort).toHaveBeenCalledWith({
      field: 'date',
      order: 'asc',
    });
  });

  it('calls setPageSize', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByTestId('pagesize'));

    expect(mockUseData.setPageSize).toHaveBeenCalledWith(25);
  });

  it('calls setPage', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByTestId('pagination'));

    expect(mockUseData.setPage).toHaveBeenCalledWith(2);
  });

  it('matches snapshot', () => {
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
