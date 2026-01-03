import { memo } from 'react';
import { index as indexKey } from '~/consts';
import type { SortKey, Sale } from '~/types/types';
import { isSortKey } from '~/utils/sort.utils';
import type { TableHeaderProps } from '~/types/components.types';

export const TableHeader = memo(
  ({ columns, visibleColumns, sortKey, sortOrder, onSort }: TableHeaderProps) => {
    const getSortArrow = (key: keyof Sale) =>
      sortKey === key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';

    return (
      <thead>
        <tr>
          {columns
            .filter((c) => visibleColumns.includes(c.key))
            .map((col) => {
              const isSortable = col.sortable && col.key !== indexKey && isSortKey(col.key);

              return (
                <th
                  key={col.key}
                  onClick={isSortable ? () => onSort(col.key as SortKey) : undefined}
                  className={`${isSortable ? 'cursor-pointer' : ''} px-3 py-2 text-left font-semibold select-none`}
                >
                  {col.label}
                  {isSortable && getSortArrow(col.key as keyof Sale)}
                </th>
              );
            })}
        </tr>
      </thead>
    );
  },
);
