import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';
import type { DocumentItem } from '../types';

export const useDocs = () =>
  useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data } = await http.get<DocumentItem[]>(endpoints.customers.documents);
      return data;
    },
  });
