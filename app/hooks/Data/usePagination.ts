import { useMemo } from 'react';
import { applyPagination } from '~/utils/pagination.utils';
import type { Sale } from '~/types/types';
import type { UsePaginationResult } from '~/types/hooks.types';

export const usePagination = (
  data: readonly Sale[],
  page: number,
  pageSize: number,
): UsePaginationResult => {
  const pagedData: readonly Sale[] = useMemo(
    () => applyPagination(data, page, pageSize),
    [data, page, pageSize],
  );
  const total: number = data.length;
  const totalPages: number = Math.ceil(total / pageSize);

  return { pagedData, total, totalPages };
};
