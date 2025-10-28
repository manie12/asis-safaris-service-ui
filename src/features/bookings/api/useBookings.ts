import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { BookingSummary } from '../types';

export const useBookings = () =>
  useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await http.get<BookingSummary[]>(endpoints.bookings.list);
      return data;
    },
  });
