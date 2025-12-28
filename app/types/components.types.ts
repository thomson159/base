import { type ReactNode } from 'react';
import type { Column, ColumnKey, Filters, Sale, Sort, SortKey, SortOrder } from '~/types/types';
import type { UseFiltersStateResult } from './hooks.types';

export type ContainerProps = {
  readonly children: ReactNode;
};

export type NavbarProps = {
  readonly expanded: boolean;
  readonly onToggle: () => void;
  readonly children: ReactNode;
};

export interface PageSizeFilterProps {
  readonly pageSize: number;
  readonly onPageSizeChange: (size: number) => void;
  readonly totalItems: number;
  readonly min?: number;
}

export interface PaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly windowSize?: number;
}

export interface SalesTableProps {
  readonly data: readonly Sale[];
}

export type VisibleColumns = {
  visibleColumns: ColumnKey[];
};

export type Columns = VisibleColumns & {
  columns: Column[];
};

export type ColumnSelectorProps = Columns & {
  toggleColumn: (key: ColumnKey) => void;
};

export type TableBodyProps = VisibleColumns & {
  data: readonly Sale[];
};

export type TableHeaderProps = Columns & {
  sortKey: SortKey | null;
  sortOrder: SortOrder | null;
  onSort: (key: SortKey | null, order?: SortOrder) => void;
};

export interface SortProps {
  sort?: Sort;
  onChange: (sort?: Sort) => void;
}

export interface FiltersProps extends Filters {
  readonly onChange: (value: Filters) => void;
  readonly data?: readonly Sale[];
}

export type FiltersViewProps = UseFiltersStateResult & {
  readonly availableChannels: readonly string[];
};
