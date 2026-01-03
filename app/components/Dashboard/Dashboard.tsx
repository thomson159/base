import { useCallback, useMemo, useState } from 'react';
import { useData } from '~/hooks/Data/useData';
import { Navbar } from './Navbar';
import Charts from './Charts';
import { Footer } from './Footer';
import { Pagination } from '../Pagination/Pagination';
import { PageSizeFilter } from '../Filters/PageSizeFilter';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { Container } from './Container';
import './Dashboard.scss';
import Filters from '../Filters/Filters';
import { Summary } from '../Summary/Summary';
import Sort from '../Sort/Sort';
import Table from '../Table/Table';
import type { Filters as FiltersType, Metrics, Sort as SortType, UseData } from '~/types/types';

export const Dashboard = () => {
  const {
    data,
    chartData,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    filters,
    setFilters,
    sort,
    setSort,
    totalRevenue,
    totalOrders,
    avgOrderValue,
  }: UseData = useData();

  const [filtersVisible, setFiltersVisible] = useState<boolean>(true);
  const toggleFilters = useCallback(() => setFiltersVisible((prev) => !prev), []);
  const handleSortChange = useCallback((nextSort?: SortType) => setSort(nextSort), [setSort]);
  const handleFiltersChange = useCallback(
    (nextFilters: FiltersType) => setFilters(nextFilters),
    [setFilters],
  );
  const hasData: boolean = useMemo(() => data.length > 0, [data.length]);
  const summaryProps: Metrics = useMemo(
    () => ({ totalRevenue, totalOrders, avgOrderValue }),
    [totalRevenue, totalOrders, avgOrderValue],
  );

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar expanded={filtersVisible} onToggle={toggleFilters}>
        <Filters data={chartData} {...filters} onChange={handleFiltersChange} />
        <Sort sort={sort} onChange={handleSortChange} />
      </Navbar>
      <Container>
        <Summary {...summaryProps} />
        {hasData && (
          <>
            <Charts salesData={chartData} />
            <PageSizeFilter pageSize={pageSize} onPageSizeChange={setPageSize} totalItems={total} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            <Table data={data} />
          </>
        )}
        <Footer />
      </Container>
    </>
  );
};
