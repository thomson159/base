import { index } from '~/consts';
import type { TableBodyProps } from '~/types/components.types';
import { normalizeChannelName } from '~/utils/utils';

export const TableBody = ({ data, visibleColumns }: TableBodyProps) => (
  <tbody>
    {data.map((s, i) => (
      <tr
        key={i}
        style={{ whiteSpace: 'nowrap' }}
        className={`transition-colors duration-150 ${i % 2 === 0 ? 'odd' : 'even'}`}
      >
        {visibleColumns.includes(index) && <td className="px-3 py-2">{i + 1}</td>}
        {visibleColumns.includes('date') && <td className="px-3 py-2">{s.date ? s.date : '-'}</td>}
        {visibleColumns.includes('channel_name') && (
          <td className="px-3 py-2">{normalizeChannelName(s.channel_name) ?? '-'}</td>
        )}
        {visibleColumns.includes('order_status_id') && (
          <td className="px-3 py-2">{s.order_status_id ?? '-'}</td>
        )}
        {visibleColumns.includes('sum_sales') && (
          <td className="px-3 py-2">{s.sum_sales.toFixed(2)}</td>
        )}
        {visibleColumns.includes('count_orders') && <td className="px-3 py-2">{s.count_orders}</td>}
      </tr>
    ))}
  </tbody>
);
