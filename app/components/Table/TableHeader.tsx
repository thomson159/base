import { asc, desc, index as indexKey } from '~/consts';
import type { ColumnKey, SortKey, Sale } from '~/types/types';
import { isSortKey } from '~/utils/sort.utils';
import { useState } from 'react';
import type { TableHeaderProps } from '~/types/components.types';

export const TableHeader = ({
  columns,
  visibleColumns,
  sortKey,
  sortOrder,
  onSort,
}: TableHeaderProps) => {
  const [clickCount, setClickCount] = useState<Record<string, number>>({});

  const handleSort = (key: SortKey) => {
    if (!key) return;

    const keyStr = key as string;
    const count: number = (clickCount[keyStr] || 0) + 1;

    setClickCount((prev) => ({
      ...prev,
      [keyStr]: count,
    }));

    if (count === 1) {
      onSort(key, asc);
    } else if (count === 2) {
      onSort(key, sortOrder === asc ? desc : asc);
    } else {
      onSort(null);
      setClickCount({});
    }
  };

  const getSortArrow = (key: keyof Sale) =>
    sortKey === key ? (sortOrder === asc ? ' ▲' : ' ▼') : '';

  const isIndexColumn = (key: ColumnKey) => key === indexKey;

  return (
    <thead>
      <tr>
        {columns
          .filter((c) => visibleColumns.includes(c.key))
          .map((col) => {
            const isSortable = col.sortable && !isIndexColumn(col.key) && isSortKey(col.key);

            return (
              <th
                key={col.key}
                onClick={() => {
                  if (isSortable) {
                    handleSort(col.key as SortKey);
                  }
                }}
                className={`${isSortable ? 'cursor-pointer select-none' : 'select-none'} px-3 py-2 text-left font-semibold`}
              >
                {col.label}
                {isSortable && getSortArrow(col.key as keyof Sale)}
              </th>
            );
          })}
      </tr>
    </thead>
  );
};
