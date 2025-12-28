import { useEffect, useState } from 'react';
import type { ColumnKey } from '~/types/types';
import { COLUMNS, STORAGE_KEY } from '~/consts';
import type { UseTableColumnsResult } from '~/types/hooks.types';

export const useTableColumns = (): UseTableColumnsResult => {
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(() => {
    try {
      const stored: string | null = localStorage.getItem(STORAGE_KEY);

      return stored ? (JSON.parse(stored) as ColumnKey[]) : COLUMNS.map((c): ColumnKey => c.key);
    } catch {
      return COLUMNS.map((c): ColumnKey => c.key);
    }
  });

  useEffect(
    () => localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns)),
    [visibleColumns],
  );

  const toggleColumn = (key: ColumnKey): void =>
    setVisibleColumns((prev: ColumnKey[]) =>
      prev.includes(key) ? prev.filter((k: ColumnKey) => k !== key) : [...prev, key],
    );

  return {
    visibleColumns,
    toggleColumn,
  };
};
