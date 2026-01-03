import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { COLORS } from "~/consts";
import { useIsMobileCharts } from "~/hooks/useIsMobile";

type Props = {
  data: { channel: string; revenue: number }[];
};

export const RevenuePerChannelChart = ({ data }: Props) => {
  const isMobile = useIsMobileCharts();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="channel" interval={0} minTickGap={20} hide={isMobile} />
        <YAxis
          tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
        />
        <Tooltip
          wrapperStyle={{
            fontSize: "0.875rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
        <Bar dataKey="revenue">
          {data.map((entry, index) => (
            <Cell key={entry.channel} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
