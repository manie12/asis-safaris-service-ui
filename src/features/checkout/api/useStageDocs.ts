import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { TravelerDocument } from '../types';

export const useStageDocs = () =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await http.post<TravelerDocument[]>(endpoints.bookings.create, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
  });
