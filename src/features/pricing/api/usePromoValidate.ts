import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { PromoPayload } from '../types';

interface PromoResponse {
  valid: boolean;
  discountPercentage: number;
}

export const usePromoValidate = () =>
  useMutation({
    mutationFn: async (payload: PromoPayload) => {
      const { data } = await http.post<PromoResponse>(endpoints.pricing.promoValidate, payload);
      return data;
    },
  });
