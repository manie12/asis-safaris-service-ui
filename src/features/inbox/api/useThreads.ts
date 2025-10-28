import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { Thread } from '../types';

export const useThreads = () =>
  useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      const { data } = await http.get<Thread[]>(endpoints.inbox.threads);
      return data;
    },
  });
