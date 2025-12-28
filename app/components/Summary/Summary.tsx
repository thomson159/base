import { memo } from 'react';
import './Summary.scss';
import type { Metrics } from '~/types/types';

interface SummaryItemProps {
  label: string;
  value: string | number;
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className="flex-1 min-w-[200px] rounded-lg panel px-6 py-2 shadow-sm flex flex-col items-center">
    <p className="text-sm">{label}</p>
    <div className={`text-xl font-semibold flex items-center justify-center h-[38px]`}>{value}</div>
  </div>
);

export const SalesSummaryComponent = ({ totalRevenue, totalOrders, avgOrderValue }: Metrics) => {
  const summaryData = [
    { label: 'Total Revenue', value: `${totalRevenue.toFixed(2)} $` },
    { label: 'Total Orders', value: totalOrders },
    { label: 'Average Order Value', value: `${avgOrderValue.toFixed(2)} $` },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {summaryData.map((item) => (
        <SummaryItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export const Summary = memo(SalesSummaryComponent);
