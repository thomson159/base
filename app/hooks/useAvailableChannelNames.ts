import { useState } from 'react';
import type { SaleArray } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

export const useAvailableChannelNames = (data?: SaleArray): readonly string[] => {
  const [firstNames] = useState<readonly string[]>(() => {
    if (!data?.length) return [];
    return Array.from(
      new Set(data.map((s) => normalizeChannelName(s.channel_name)).filter(Boolean)),
    );
  });

  return firstNames;
};
