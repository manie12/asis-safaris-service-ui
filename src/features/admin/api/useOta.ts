import { useQuery } from '@tanstack/react-query';

import { endpoints } from '@/app/api/endpoints';
import { http } from '@/app/api/http';

interface OtaMapping {
  id: string;
  partner: string;
  status: 'active' | 'paused';
  lastSyncAt: string;
}

export const useOta = () =>
  useQuery({
    queryKey: ['otaMappings'],
    queryFn: async () => {
      const { data } = await http.get<OtaMapping[]>(endpoints.admin.otaMappings);
      return data;
    },
  });
