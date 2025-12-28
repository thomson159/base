import { useMemo } from 'react';
import { calculateMetrics } from '~/utils/metrics.utils';
import type { Sale, Metrics } from '~/types/types';

export const useMetrics = (data: readonly Sale[]): Metrics =>
  useMemo<Metrics>(() => calculateMetrics(data), [data]);
