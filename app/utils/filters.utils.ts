import type { Sale, Filters } from '~/types/types';

export const applyFilters = (data: readonly Sale[], filters: Filters): Sale[] => {
  return data.filter((s) => {
    if (
      filters.channelName &&
      !s.channel_name.toLowerCase().includes(filters.channelName.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.channelNames &&
      filters.channelNames.length > 0 &&
      !filters.channelNames.some((name) =>
        s.channel_name.toLowerCase().includes(name.toLowerCase()),
      )
    ) {
      return false;
    }

    if (filters.minDate && s.date < filters.minDate) {
      return false;
    }

    if (filters.maxDate && s.date > filters.maxDate) {
      return false;
    }

    return true;
  });
};

export const sanitizePageSizeInput = (value: string, maxLength: number = 3): number | null => {
  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
  }

  const numberValue: number = Number(value);

  return Number.isNaN(numberValue) ? null : numberValue;
};

export const validatePageSize = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
