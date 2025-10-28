import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { TourListResponse } from '../types';

export const useTours = () =>
  useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data } = await http.get<TourListResponse>(endpoints.catalog.tours());
      return data;
    },
  });
