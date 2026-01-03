import { useMemo, useState } from 'react';
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

  const onSort = (key: SortKey): void => {
    if (sortKey === key) {
      setSortOrder((prev: SortOrder) => (prev === asc ? desc : asc));
    } else {
      setSortKey(key);
      setSortOrder(asc);
    }
  };

  return {
    sortKey,
    sortOrder,
    sortedData,
    onSort,
  };
};
