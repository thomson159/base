import './Table.scss';
import { useState, useMemo, useCallback, memo } from 'react';
import type { SaleArray } from '~/types/types';
import { ColumnSelector } from './ColumnSelector';
import { Button } from '../Button/Button';
import { COLUMNS, ROWS_INCREMENT } from '~/consts';
import { useTableColumns } from '~/hooks/Table/useTableColumns';
import { useTableSorting } from '~/hooks/Table/useTableSorting';
import type { SalesTableProps } from '~/types/components.types';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

const SalesTableComponent = ({ data }: SalesTableProps) => {
  const { visibleColumns, toggleColumn } = useTableColumns();
  const { sortKey, sortOrder, sortedData, onSort } = useTableSorting(data, visibleColumns);
  const [visibleRowsCount, setVisibleRowsCount] = useState<number>(ROWS_INCREMENT);

  const displayedData = useMemo<SaleArray>(
    () => sortedData.slice(0, visibleRowsCount),
    [sortedData, visibleRowsCount],
  );

  const loadMore = useCallback((): void => {
    setVisibleRowsCount((prev: number) => prev + ROWS_INCREMENT);
  }, []);

  return (
    <div>
      <ColumnSelector
        columns={COLUMNS}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
      />
      <div className="table-wrapper overflow-x-auto w-full">
        <table className="sales-table table-fixed font-inter text-sm rounded-lg border-collapse md:w-full w-auto">
          <TableHeader
            columns={COLUMNS}
            visibleColumns={visibleColumns}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <TableBody data={displayedData} visibleColumns={visibleColumns} />
        </table>
      </div>
      {visibleRowsCount < sortedData.length && (
        <div className="flex pt-5">
          <Button className="mx-auto" onClick={loadMore}>
            More
          </Button>
        </div>
      )}
    </div>
  );
};

export const Table = memo(SalesTableComponent);
export default Table;
