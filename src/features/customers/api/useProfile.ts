import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { Profile } from '../types';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await http.get<Profile>(endpoints.customers.profile);
      return data;
    },
  });
