import { useCallback, useMemo, memo, type MouseEventHandler } from 'react';
import type { NavbarProps } from '../../types/components.types';

const NavbarComponent = ({ expanded, onToggle, children }: NavbarProps) => {
  const shouldShowArrow: boolean = useMemo((): boolean => !expanded, [expanded]);
  const containerClassName: string = useMemo(
    () => `filters-wrapper ${expanded ? 'filters-open' : 'filters-closed'}`,
    [expanded],
  );

  const handleToggle = useCallback((): void => onToggle(), [onToggle]);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event): void => {
      event.stopPropagation();
      onToggle();
    },
    [onToggle],
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white">
      <div className="p-4 cursor-pointer select-none relative" onClick={handleToggle}>
        <h2 className="text-3xl font-bold text-left">Sales Dashboard</h2>
        {shouldShowArrow ? (
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-1 text-sm select-none"
          >
            ▼
          </span>
        ) : null}
      </div>
      <div className={containerClassName}>
        <div className="p-4 pt-0 pb-2">
          {children}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-sm flex items-center gap-1 cursor-pointer mt-4"
            >
              <span aria-hidden>▲</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navbar = memo(NavbarComponent);
