import { useCallback, useMemo, useState } from 'react';
import type { SortKey, SortOrder, ColumnKey, SaleArray } from '~/types/types';
import { asc, desc } from '~/consts';
import { sortTableData } from '~/utils/table.utils';
import type { UseTableSortingResult } from '~/types/hooks.types';

export const useTableSorting = (
  data: SaleArray,
  visibleColumns: ColumnKey[],
): UseTableSortingResult => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(asc);

  const sortedData: SaleArray = useMemo(
    () => sortTableData(data, sortKey, sortOrder, visibleColumns),
    [data, sortKey, sortOrder, visibleColumns],
  );

  const onSort = useCallback((key: SortKey): void => {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortOrder((prev) => (prev === asc ? desc : asc));
        return prevKey;
      }

      setSortOrder(asc);
      return key;
    });
  }, []);

  return {
    sortKey,
    sortOrder,
    sortedData,
    onSort,
  };
};
