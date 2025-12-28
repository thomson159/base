import type { Sale, SaleJson } from '~/types/types';

const SALES_URL = import.meta.env.VITE_SALES_API_URL as string;

export const fetchSales = async (): Promise<readonly Sale[]> => {
  console.log(SALES_URL);

  const response = await fetch(SALES_URL);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status}`);
  }

  const salesData: readonly SaleJson[] = await response.json();

  return salesData.map(({ channel_type, ...rest }) => rest);
};
