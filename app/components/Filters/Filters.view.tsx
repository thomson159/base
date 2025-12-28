import styles from './Filters.module.scss';
import stylesSort from '../Sort/Sort.module.scss';
import { Button } from '../Button/Button';
import type { FiltersViewProps } from '~/types/components.types';

export const FiltersView = ({
  state,
  availableChannels,
  hasChanges,
  apply,
  dispatch,
}: FiltersViewProps) => (
  <div className="w-full flex flex-col lg:flex-row lg:items-end justify-start gap-4">
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-4 w-full lg:w-auto">
      {/* <div className="flex flex-col w-full lg:w-auto">
        <label>Channel</label>
        <input
          disabled
          value="Marketplace"
          className={`${styles.input} w-full`}
        />
      </div> */}
      <div className="flex flex-col relative w-full lg:w-auto">
        <label>Search</label>
        <input
          value={state.channelName}
          onChange={(e) =>
            dispatch({
              type: 'SET_CHANNEL_NAME',
              value: e.target.value.slice(0, 20),
            })
          }
          className={`${styles.input} w-full`}
        />
        {state.channelName && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLEAR_CHANNEL_NAME' })}
            className="absolute right-4 top-[32px]"
            aria-label="Clear name filter"
          >
            ✕
          </button>
        )}
      </div>
      <div className="flex flex-col w-full lg:w-auto">
        <label>Date</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            value={state.minDate}
            onChange={(e) => dispatch({ type: 'SET_MIN_DATE', value: e.target.value })}
            className={`${styles.input} w-full`}
          />
          <input
            type="date"
            value={state.maxDate}
            onChange={(e) => dispatch({ type: 'SET_MAX_DATE', value: e.target.value })}
            className={`${styles.input} w-full`}
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full lg:w-auto">
      <div className={stylesSort.sortContainer}>
        {availableChannels.map((name) => {
          const active = state.channelNames.includes(name);

          return (
            <button
              key={name}
              onClick={() => dispatch({ type: 'TOGGLE_CHANNEL', value: name })}
              className={`${stylesSort.sortButton} ${
                active ? stylesSort.sortButtonActive : stylesSort.sortButtonInActive
              }`}
            >
              {name}
              {active && ' ✓'}
            </button>
          );
        })}
      </div>

      <Button
        disabled={!hasChanges}
        onClick={apply}
        className={`w-full lg:w-auto ${hasChanges ? '' : 'opacity-40'}`}
      >
        Apply
      </Button>
    </div>
  </div>
);
