import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '~/components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner container', () => {
    render(<LoadingSpinner />);
    const container = document.querySelector('.flex.justify-center.items-center.pt-10');
    expect(container).toBeInTheDocument();
  });

  it('renders the spinner div', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
