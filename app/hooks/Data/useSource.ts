import { useEffect, useState } from 'react';
import { fetchSales } from '~/api/fetchSales';
import type { UseSourceResult } from '~/types/hooks.types';
import type { Sale } from '~/types/types';

export const useSource = (): UseSourceResult => {
  const [data, setData] = useState<readonly Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchSales();
        if (!active) return;
        setData(result);
      } catch {
        if (!active) return;
        setData([]);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
};
