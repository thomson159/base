import { memo, useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { useIsMobile } from '~/hooks/useIsMobile';
import type { BarOption, LineOption } from '~/types/types';
import type { BarData, DashboardChartsProps, LineSeries } from '../../types/charts.types';
import { BLUE, BAR_OPTIONS, LINE_OPTIONS, BAR_COMMON_PROPS, LINE_COMMON_PROPS } from '~/consts';
import { BarTooltip, LineTooltip } from './Tooltip';
import { aggregateLineData, aggregateBarData, buildChannelColorMap, buildLineTicks } from '~/utils/charts.utils';

const ChartsComponent = ({ salesData }: DashboardChartsProps) => {
  const isMobile = useIsMobile();
  const [lineOption, setLineOption] = useState<LineOption>(LINE_OPTIONS[0]);
  const [barOption, setBarOption] = useState<BarOption>(BAR_OPTIONS[0]);

  const toggleLineOption = () =>
    setLineOption(prev => (prev.id === LINE_OPTIONS[0].id ? LINE_OPTIONS[1] : LINE_OPTIONS[0]));

  const toggleBarOption = () =>
    setBarOption(prev => (prev.label === BAR_OPTIONS[0].label ? BAR_OPTIONS[1] : BAR_OPTIONS[0]));

  const aggregatedLineData: LineSeries[] = useMemo(
    () => aggregateLineData(salesData, lineOption.key, lineOption.id),
    [salesData, lineOption]
  );

  const aggregatedBarData: BarData[] = useMemo(
    () => aggregateBarData(salesData, barOption.key, barOption.label),
    [salesData, barOption]
  );

  if (!salesData.length) return null;

  const sanitizedLineData = useMemo(
    () =>
      aggregatedLineData.map(series => ({
        ...series,
        data: series.data.map(point => ({
          x: point.x,
          y: isNaN(point.y) || point.y === null ? 0 : point.y,
        })),
      })),
    [aggregatedLineData]
  );

  const sanitizedBarData = useMemo(
    () =>
      aggregatedBarData.map(item => {
        const key = barOption.label as keyof BarData;
        const value = item[key];
        return {
          ...item,
          [key]: typeof value === 'number' && !isNaN(value) ? value : 0,
          channel: item.channel ?? 'Unknown',
        };
      }),
    [aggregatedBarData, barOption]
  );

  const channelColorMap: Record<string, string> = useMemo(
    () => buildChannelColorMap(sanitizedBarData),
    [sanitizedBarData]
  );

  const lineTicks = useMemo(() => {
    const ticks = buildLineTicks(sanitizedLineData, isMobile);
    return ticks.length ? ticks : ['0'];
  }, [sanitizedLineData, isMobile]);

  const MemoizedLine = useMemo(
    () => (
      <ResponsiveLine
        {...LINE_COMMON_PROPS}
        data={sanitizedLineData}
        colors={[BLUE]}
        axisBottom={{ tickValues: lineTicks }}
        tooltip={LineTooltip}
      />
    ),
    [sanitizedLineData, lineTicks]
  );

  const MemoizedBar = useMemo(
    () => (
      <ResponsiveBar
        {...BAR_COMMON_PROPS}
        data={sanitizedBarData}
        keys={[barOption.label as keyof BarData]}
        indexBy="channel"
        colors={({ indexValue }: { indexValue: string }) =>
          channelColorMap[indexValue] ?? '#000'
        }
        axisBottom={isMobile ? null : undefined}
        tooltip={BarTooltip}
      />
    ),
    [sanitizedBarData, barOption, isMobile, channelColorMap]
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="h-100">
        <div className="mb-2">
          <button
            type="button"
            onClick={toggleLineOption}
            className="w-full flex justify-between items-center text-lg font-semibold bg-transparent cursor-pointer outline-none focus:outline-none"
          >
            <span className="ml-3">{lineOption.id}</span>
            <span className="mr-10">⬌</span>
          </button>
        </div>
        {MemoizedLine}
      </div>
      <div className="h-100">
        <div className="mb-2">
          <button
            type="button"
            onClick={toggleBarOption}
            className="w-full flex justify-between items-center text-lg font-semibold bg-transparent cursor-pointer outline-none focus:outline-none"
          >
            <span className="ml-3">{barOption.label}</span>
            <span className="mr-10">⬌</span>
          </button>
        </div>
        {MemoizedBar}
      </div>
    </section>
  );
};

export const Charts = memo(ChartsComponent);
export default Charts;
