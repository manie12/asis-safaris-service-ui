import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { AuthResponse, RegisterPayload } from '../types';

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await http.post<AuthResponse>(endpoints.auth.register, payload);
      return data;
    },
  });
