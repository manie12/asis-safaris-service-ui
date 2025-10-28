import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { BookingDetail } from '../types';

export const useBooking = (bookingId: string) =>
  useQuery({
    enabled: Boolean(bookingId),
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const { data } = await http.get<BookingDetail>(endpoints.bookings.detail(bookingId));
      return data;
    },
  });
