import { useCallback } from 'react';

import { selectAuth } from '@/app/store/selectors';
import { useAppStore, type User } from '@/app/store/useAppStore';

export const useAuth = () => {
  const auth = useAppStore(selectAuth);

  const login = useCallback(
    (token: string, user: User) => {
      auth.setSession(token, user);
    },
    [auth],
  );

  const logout = useCallback(() => {
    auth.clearSession();
  }, [auth]);

  return {
    token: auth.token,
    user: auth.user,
    login,
    logout,
    isAuthenticated: Boolean(auth.user),
  } as const;
};
