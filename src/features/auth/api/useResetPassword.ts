import { useMutation } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { ResetPasswordPayload } from '../types';

export const useResetPassword = () =>
  useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      await http.post(endpoints.auth.resetPassword, payload);
    },
  });
