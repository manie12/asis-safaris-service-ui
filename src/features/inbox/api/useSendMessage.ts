import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { Message } from '../types';

interface SendMessagePayload {
  threadId: string;
  body: string;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      const { data } = await http.post<Message>(endpoints.inbox.messages(payload.threadId), payload);
      return data;
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['messages', variables.threadId] });
    },
  });
};
