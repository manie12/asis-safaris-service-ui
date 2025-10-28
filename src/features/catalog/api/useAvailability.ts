import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { AvailabilityResponse } from '../types';

export const useAvailability = (tourId: string) =>
  useQuery({
    enabled: Boolean(tourId),
    queryKey: ['availability', tourId],
    queryFn: async () => {
      const { data } = await http.get<AvailabilityResponse>(endpoints.catalog.availability(tourId));
      return data;
    },
  });
