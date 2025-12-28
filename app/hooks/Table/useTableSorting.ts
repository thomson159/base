import { useMemo, useState } from 'react';
import type { Sale, SortKey, SortOrder, ColumnKey } from '~/types/types';
import { asc, desc } from '~/consts';
import { sortTableData } from '~/utils/table.utils';
import type { UseTableSortingResult } from '~/types/hooks.types';

export const useTableSorting = (
  data: readonly Sale[],
  visibleColumns: ColumnKey[],
): UseTableSortingResult => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(asc);

  const sortedData: readonly Sale[] = useMemo(
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
