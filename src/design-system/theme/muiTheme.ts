import { createTheme } from '@mui/material/styles';

import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from './tokens';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colorTokens.safari[600],
      light: colorTokens.safari[400],
      dark: colorTokens.safari[800],
      contrastText: colorTokens.neutral.white,
    },
    secondary: {
      main: colorTokens.earth[500],
      light: colorTokens.earth[300],
      dark: colorTokens.earth[800],
      contrastText: colorTokens.neutral.white,
    },
    background: {
      default: colorTokens.neutral[50],
      paper: colorTokens.neutral.white,
    },
    text: {
      primary: colorTokens.earth[900],
      secondary: colorTokens.earth[500],
    },
    success: {
      main: colorTokens.accent.emerald,
    },
    warning: {
      main: colorTokens.accent.amber,
    },
    info: {
      main: colorTokens.accent.sky,
    },
  },
  typography: {
    fontFamily: typographyTokens.body,
    fontSize: 14,
    h1: {
      fontFamily: typographyTokens.heading,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: typographyTokens.heading,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: typographyTokens.heading,
      fontWeight: 600,
    },
    h4: {
      fontFamily: typographyTokens.heading,
      fontWeight: 600,
    },
    h5: {
      fontFamily: typographyTokens.heading,
      fontWeight: 500,
    },
    h6: {
      fontFamily: typographyTokens.heading,
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
      color: colorTokens.earth[600],
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: radiusTokens.md,
  },
  spacing: (factor: number) => `${spacingTokens.xs * factor}px`,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.pill,
          paddingInline: spacingTokens.md,
          paddingBlock: spacingTokens.sm,
          boxShadow: '0 12px 24px rgba(238, 92, 40, 0.18)',
          backgroundImage: colorTokens.gradients.brand,
          backgroundSize: '200% 200%',
          transition: 'background-position 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            backgroundPosition: '100% 0%',
            boxShadow: '0 16px 32px rgba(115, 38, 28, 0.24)',
            transform: 'translateY(-1px)',
          },
          '&.Mui-disabled': {
            boxShadow: 'none',
            backgroundImage: 'none',
            backgroundColor: colorTokens.earth[100],
            color: colorTokens.earth[400],
          },
        },
        outlined: {
          borderRadius: radiusTokens.pill,
          borderColor: colorTokens.safari[300],
          color: colorTokens.safari[700],
          backgroundImage: 'none',
          boxShadow: 'none',
          '&:hover': {
            borderColor: colorTokens.safari[500],
            backgroundColor: colorTokens.safari[50],
          },
        },
        text: {
          boxShadow: 'none',
          backgroundImage: 'none',
          color: colorTokens.safari[600],
          '&:hover': {
            backgroundColor: colorTokens.safari[50],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.lg,
          border: `1px solid rgba(92, 63, 51, 0.08)`,
          boxShadow: '0 24px 48px rgba(61, 48, 36, 0.08)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250, 246, 240, 0.92) 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.lg,
          border: `1px solid rgba(92, 63, 51, 0.08)`,
          background: colorTokens.gradients.card,
          boxShadow: '0 20px 40px rgba(50, 29, 22, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 12px 30px rgba(32, 25, 19, 0.12)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(150deg, #faf5ef 0%, #fef7ee 35%, #f5f3f0 100%)',
        },
      },
    },
  },
});
