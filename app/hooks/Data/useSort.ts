import type { Sale, Sort } from '~/types/types';

export const useSort = (data: readonly Sale[], sort?: Sort): readonly Sale[] => {
  if (!sort) return data;

  const { field, order } = sort;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (aStr < bStr) return order === 'asc' ? -1 : 1;
    if (aStr > bStr) return order === 'asc' ? 1 : -1;
    return 0;
  });
};
