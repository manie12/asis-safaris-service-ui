import { useCallback } from 'react';

import { selectTenantCountry } from '@/app/store/selectors';
import { useAppStore } from '@/app/store/useAppStore';

export const useTenant = () => {
  const countryCode = useAppStore(selectTenantCountry);
  const setCountryCode = useAppStore((state) => state.tenant.setCountryCode);

  const switchTenant = useCallback(
    (code: string) => {
      setCountryCode(code.toUpperCase());
    },
    [setCountryCode],
  );

  return {
    countryCode,
    switchTenant,
  } as const;
};
