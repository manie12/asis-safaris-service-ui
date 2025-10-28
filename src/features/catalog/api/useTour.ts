import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { TourDetails } from '../types';

export const useTour = (tourId: string) =>
  useQuery({
    enabled: Boolean(tourId),
    queryKey: ['tour', tourId],
    queryFn: async () => {
      const { data } = await http.get<TourDetails>(endpoints.catalog.tour(tourId));
      return data;
    },
  });
