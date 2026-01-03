import { memo } from 'react';
import type { ColumnSelectorProps } from '~/types/components.types';

const ColumnSelectorComponent = ({
  columns,
  visibleColumns,
  toggleColumn,
}: ColumnSelectorProps) => (
  <div className="column-selector mb-2 flex flex-wrap gap-3 p-3 rounded-lg">
    {columns.map((col) => (
      <label
        key={col.key}
        className="column-selector__label flex items-center gap-2 text-sm font-medium flex-1 min-w-[120px] cursor-pointer select-none"
      >
        <input
          type="checkbox"
          checked={visibleColumns.includes(col.key)}
          onChange={() => toggleColumn(col.key)}
          className="column-selector__input"
        />
        <span className="column-selector__checkbox" />
        {col.label}
      </label>
    ))}
  </div>
);

export const ColumnSelector = memo(ColumnSelectorComponent);
