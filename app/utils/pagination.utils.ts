import type { Sale } from '~/types/types';

export const applyPagination = (data: readonly Sale[], page: number, pageSize: number): Sale[] => {
  const safePage: number = Math.max(1, page);
  const safePageSize: number = Math.max(1, pageSize);
  const start: number = (safePage - 1) * safePageSize;

  return data.slice(start, start + safePageSize);
};
