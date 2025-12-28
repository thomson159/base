import type { ChangeEvent } from 'react';
import type { VisibleColumns } from './components.types';
import type { State, Action } from './state.types';
import type { Sale, SortKey, SortOrder, ColumnKey, Sort, UseData } from './types';

export type UseDataResult = UseData & {
  sort?: Sort;
  setSort: (sort?: Sort) => void;
};

export type UseTableSortingResult = {
  sortKey: SortKey;
  sortOrder: SortOrder;
  sortedData: readonly Sale[];
  onSort: (key: SortKey) => void;
};

export type UseTableColumnsResult = VisibleColumns & {
  toggleColumn: (key: ColumnKey) => void;
};

export interface UsePaginationResult {
  readonly pagedData: readonly Sale[];
  readonly total: number;
  readonly totalPages: number;
}

export interface UseSourceResult {
  readonly data: readonly Sale[];
  loading: boolean;
}

export type UseFiltersStateResult = {
  readonly state: State;
  readonly hasChanges: boolean;
  readonly apply: () => void;
  readonly dispatch: React.Dispatch<Action>;
};

export type UsePageSizeResult = {
  localPageSize: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  applyPageSize: () => void;
};

export type UsePageSizeParams = {
  pageSize: number;
  min: number;
  totalItems: number;
  onPageSizeChange: (value: number) => void;
};
