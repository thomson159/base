import { memo } from 'react';
import styles from './Filters.module.scss';
import { Button } from '../Button/Button';
import type { PageSizeFilterProps } from '~/types/components.types';
import { usePageSize } from '~/hooks/usePageSize';
import type { UsePageSizeResult } from '~/types/hooks.types';

const PageSizeFilterComponent = ({
  pageSize,
  onPageSizeChange,
  totalItems,
  min = 1,
}: PageSizeFilterProps) => {
  const { localPageSize, handleChange, applyPageSize }: UsePageSizeResult = usePageSize({
    pageSize,
    min,
    totalItems,
    onPageSizeChange,
  });

  return (
    <div className="w-full mx-auto mt-10">
      <div className="flex flex-wrap gap-4 items-end justify-center">
        <div className="flex flex-col">
          <label htmlFor="page-size">Per Page</label>
          <input
            id="page-size"
            type="number"
            min={min}
            max={totalItems}
            value={localPageSize}
            onChange={handleChange}
            className={styles.input}
            style={{ width: 80 }}
          />
        </div>
        <Button onClick={applyPageSize} style={{ maxWidth: 94 }}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export const PageSizeFilter = memo(PageSizeFilterComponent);
export default PageSizeFilter;
