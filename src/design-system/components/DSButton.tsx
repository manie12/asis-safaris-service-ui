import { forwardRef } from 'react';

import Button, { type ButtonProps } from '@mui/material/Button';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

import { colorTokens, radiusTokens } from '@/design-system/theme/tokens';

type DSTone = 'brand' | 'earth' | 'outline' | 'ghost';

export interface DSButtonProps extends ButtonProps {
  tone?: DSTone;
}

const toneStyles: Record<DSTone, SxProps<Theme>> = {
  brand: {
    backgroundImage: colorTokens.gradients.brand,
    color: colorTokens.neutral.white,
    boxShadow: '0 12px 24px rgba(238, 92, 40, 0.22)',
    '&:hover': {
      backgroundImage: colorTokens.gradients.brand,
      filter: 'brightness(1.05)',
    },
  },
  earth: {
    backgroundImage: 'linear-gradient(135deg, #bca691 0%, #8b6f56 100%)',
    color: colorTokens.neutral.white,
    boxShadow: '0 12px 24px rgba(74, 57, 42, 0.22)',
    '&:hover': {
      backgroundImage: 'linear-gradient(135deg, #a68a72 0%, #6f5741 100%)',
    },
  },
  outline: {
    backgroundImage: 'none',
    backgroundColor: alpha(colorTokens.safari[50], 0.7),
    color: colorTokens.safari[700],
    border: `1px solid ${alpha(colorTokens.safari[300], 0.8)}`,
    boxShadow: 'none',
      '&:hover': {
        backgroundColor: colorTokens.safari[100],
        borderColor: colorTokens.safari[400],
      },
  },
  ghost: {
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    color: colorTokens.safari[600],
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: alpha(colorTokens.safari[50], 0.8),
    },
  },
};

const baseSx: SxProps<Theme> = {
  borderRadius: radiusTokens.pill,
  px: 3.5,
  py: 1.25,
};

export const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(function DSButton(
  { tone = 'brand', sx, variant = 'contained', disableElevation = true, ...props },
  ref,
) {
  const computedSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseSx, toneStyles[tone], ...sx]
    : sx
      ? [baseSx, toneStyles[tone], sx]
      : [baseSx, toneStyles[tone]];

  return (
    <Button ref={ref} variant={variant} disableElevation={disableElevation} sx={computedSx} {...props} />
  );
});
