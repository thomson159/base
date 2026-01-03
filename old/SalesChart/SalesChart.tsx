import "./SalesChart.scss";
import type { SaleArray } from "~/types/types";
import { SalesOverTimeChart } from "./SalesOverTimeChart";
import { RevenuePerChannelChart } from "./RevenuePerChannelChart";
import { ChannelLegend } from "./ChannelLegend";
import { useIsMobile } from "~/hooks/useIsMobile";
import { getRevenuePerChannel, getSalesOverTime } from "old/salesChart.utils";

type Props = {
  data: SaleArray;
};

export const SalesChart = ({ data }: Props) => {
  const salesOverTimeArray = getSalesOverTime(data);
  const channelArray = getRevenuePerChannel(data);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-wrap gap-8 mb-8">
      <div className="flex-1 min-w-[400px] bg-color p-4 rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Sales Over Time</h3>
        <SalesOverTimeChart data={salesOverTimeArray} />
      </div>

      <div className="flex-1 min-w-[400px] bg-color p-4 rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Revenue per Channel</h3>
        <RevenuePerChannelChart data={channelArray} isMobile={isMobile} />
        <ChannelLegend data={channelArray} />
      </div>
    </div>
  );
};
