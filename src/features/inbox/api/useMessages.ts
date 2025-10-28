import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { Message } from '../types';

export const useMessages = (threadId: string | null) =>
  useQuery({
    enabled: Boolean(threadId),
    queryKey: ['messages', threadId],
    queryFn: async () => {
      if (!threadId) return [] as Message[];
      const { data } = await http.get<Message[]>(endpoints.inbox.messages(threadId));
      return data;
    },
  });
