import type { ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ConfigProvider } from 'antd';

import { antdTokens } from '@/design-system/theme/antdTokens';
import { muiTheme } from '@/design-system/theme/muiTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    <ConfigProvider theme={antdTokens}>{children}</ConfigProvider>
  </MuiThemeProvider>
);
