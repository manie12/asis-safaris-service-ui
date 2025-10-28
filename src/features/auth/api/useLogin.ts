import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { AuthResponse, LoginPayload } from '../types';

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await http.post<AuthResponse>(endpoints.auth.login, payload);
      return data;
    },
  });
