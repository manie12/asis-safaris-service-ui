import type { ThemeConfig } from 'antd';

import { colorTokens, radiusTokens, typographyTokens } from './tokens';

export const antdTokens: ThemeConfig = {
  token: {
    colorPrimary: colorTokens.safari[600],
    colorLink: colorTokens.safari[600],
    colorBgLayout: colorTokens.neutral[50],
    colorText: colorTokens.earth[800],
    colorTextSecondary: colorTokens.earth[500],
    colorSuccess: colorTokens.accent.emerald,
    colorWarning: colorTokens.accent.amber,
    fontFamily: typographyTokens.body,
    borderRadius: radiusTokens.md,
    controlHeight: 44,
  },
  components: {
    Button: {
      colorPrimary: colorTokens.safari[600],
      colorPrimaryHover: colorTokens.safari[500],
      colorPrimaryActive: colorTokens.safari[700],
      borderRadius: radiusTokens.pill,
      controlHeightLG: 48,
      boxShadow: '0 12px 24px rgba(238, 92, 40, 0.24)',
    },
    Card: {
      padding: 24,
      borderRadius: radiusTokens.lg,
      colorBorderSecondary: 'rgba(92, 63, 51, 0.08)',
    },
    Typography: {
      titleMarginBottom: 8,
      fontFamily: typographyTokens.body,
      colorTextHeading: colorTokens.earth[900],
    },
    Tag: {
      borderRadius: radiusTokens.pill,
    },
  },
};
