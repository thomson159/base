import { useRef } from 'react';
import type { Sale } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

export const useAvailableChannelNames = (data?: readonly Sale[]): readonly string[] => {
  const firstNamesRef = useRef<readonly string[] | null>(null);

  if (!firstNamesRef.current && data?.length) {
    firstNamesRef.current = Array.from(
      new Set(data.map((s) => normalizeChannelName(s.channel_name)).filter(Boolean)),
    );
  }

  return firstNamesRef.current ?? [];
};
