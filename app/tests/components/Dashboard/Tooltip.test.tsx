import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BarTooltip, LineTooltip } from '~/components/Dashboard/Tooltip';
import { normalizeChannelName } from '~/utils/utils';

describe('LineTooltip', () => {
  it('matches snapshot', () => {
    const point = {
      data: {
        x: '2024-01-01',
        y: 12.3456,
      },
    };

    const { container } = render(<LineTooltip point={point} />);
    expect(container).toMatchSnapshot();
  });
});

describe('BarTooltip', () => {
  it('matches snapshot with string indexValue', () => {
    const indexValue = normalizeChannelName('facebook_ads');

    const { container } = render(<BarTooltip value={10.1234} indexValue={indexValue} />);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with numeric indexValue', () => {
    const { container } = render(<BarTooltip value={5} indexValue={3} />);

    expect(container).toMatchSnapshot();
  });
});
