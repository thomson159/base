import { useMemo } from 'react';
import { applyFilters } from '~/utils/filters.utils';
import type { Sale, Filters } from '~/types/types';

export const useFilters = (data: readonly Sale[], filters: Filters): readonly Sale[] =>
  useMemo<readonly Sale[]>(() => applyFilters(data, filters), [data, filters]);
