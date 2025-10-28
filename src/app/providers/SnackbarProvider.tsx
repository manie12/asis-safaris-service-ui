import type { ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => (
  <NotistackProvider
    maxSnack={3}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={4000}
  >
    {children}
  </NotistackProvider>
);
