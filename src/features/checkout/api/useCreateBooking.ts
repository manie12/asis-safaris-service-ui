import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { CheckoutPayload } from '../types';

interface BookingResponse {
  bookingId: string;
  status: 'pending' | 'confirmed';
}

export const useCreateBooking = () =>
  useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const { data } = await http.post<BookingResponse>(endpoints.bookings.create, payload);
      return data;
    },
  });
