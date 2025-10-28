import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { QuoteResponse } from '@/app/api/types';
import type { QuoteRequest } from '../types';

export const useQuote = () =>
  useMutation({
    mutationFn: async (payload: QuoteRequest) => {
      const { data } = await http.post<QuoteResponse>(endpoints.pricing.quote, payload);
      return data;
    },
  });
