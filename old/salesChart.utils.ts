
import type { Sale, SaleArray } from "~/types/types";
import { normalizeChannelName } from "../app/utils/utils";

export type SalesOverTimeItem = {
  date: string;
  revenue: number;
};

export type RevenuePerChannelItem = {
  channel: string;
  revenue: number;
};

export const getSalesOverTime = (data: SaleArray): SalesOverTimeItem[] => {
  const salesMap: Record<string, number> = data.reduce(
    (acc: Record<string, number>, sale: Sale) => {
      if (!sale.date) return acc;

      const date: string = new Date(sale.date)
        .toISOString()
        .split("T")[0];

      acc[date] = (acc[date] ?? 0) + sale.sum_sales;

      return acc;
    },
    {}
  );

  return Object.entries(salesMap).map(
    ([date, revenue]): SalesOverTimeItem => ({
      date,
      revenue,
    })
  );
};

export const getRevenuePerChannel = (
  data: SaleArray
): RevenuePerChannelItem[] => {
  const channelsMap: Record<string, number> = {};

  data.forEach((sale: Sale) => {
    const channel: string = sale.channel_name?.trim() || "other";
    channelsMap[channel] = (channelsMap[channel] ?? 0) + sale.sum_sales;
  });

  return Object.entries(channelsMap).map(
    ([channel, revenue]): RevenuePerChannelItem => ({
      channel: normalizeChannelName(channel),
      revenue,
    })
  );
};
