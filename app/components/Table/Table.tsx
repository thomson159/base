import { useState, useMemo, useCallback, memo } from 'react';
import { ColumnSelector } from './ColumnSelector';
import { Button } from '../Button/Button';
import { COLUMNS, ROWS_INCREMENT } from '~/consts';
import { useTableSorting } from '~/hooks/Table/useTableSorting';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { useTableColumns } from '~/hooks/Table/useTableColumns';
import type { SalesTableProps } from '~/types/components.types';
import type { UseTableColumnsResult, UseTableSortingResult } from '~/types/hooks.types';
import type { SaleArray } from '~/types/types';
import './Table.scss';

const SalesTableComponent = ({ data }: SalesTableProps) => {
  const { visibleColumns, toggleColumn }: UseTableColumnsResult = useTableColumns();
  const { sortKey, sortOrder, sortedData, onSort }: UseTableSortingResult = useTableSorting(data, visibleColumns);
  const [visibleRowsCount, setVisibleRowsCount] = useState<number>(ROWS_INCREMENT);
  const displayedData: SaleArray = useMemo(() => sortedData.slice(0, visibleRowsCount), [sortedData, visibleRowsCount]);
  const loadMore = useCallback(() => setVisibleRowsCount(prev => prev + ROWS_INCREMENT), []);

  return (
    <div>
      <ColumnSelector columns={COLUMNS} visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
      <div className="table-wrapper overflow-x-auto w-full">
        <table className="sales-table table-fixed font-inter text-sm rounded-lg border-collapse md:w-full w-auto">
          <TableHeader columns={COLUMNS} visibleColumns={visibleColumns} sortKey={sortKey} sortOrder={sortOrder} onSort={onSort} />
          <TableBody data={displayedData} visibleColumns={visibleColumns} />
        </table>
      </div>
      {visibleRowsCount < sortedData.length && (
        <div className="flex pt-5">
          <Button className="mx-auto" onClick={loadMore}>More</Button>
        </div>
      )}
    </div>
  );
};

export const Table = memo(SalesTableComponent);
export default Table;
