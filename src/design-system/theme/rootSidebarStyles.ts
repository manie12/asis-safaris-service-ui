import type { SxProps, Theme } from '@mui/material/styles';

import { colorTokens, radiusTokens, spacingTokens } from './tokens';

const overlayPattern = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

export const rootSidebarStyles = {
  layout: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: { xs: spacingTokens.xl, lg: spacingTokens.xl },
    alignItems: 'flex-start',
  } satisfies SxProps<Theme>,
  main: {
    flex: 1,
    minWidth: 0,
  } satisfies SxProps<Theme>,
  aside: {
    width: { xs: '100%', md: 320 },
    flexShrink: 0,
    display: 'block',
  } satisfies SxProps<Theme>,
  panel: {
    backgroundColor: '#FFFFFF',
    backdropFilter: 'blur(16px)',
    borderRadius: 2,
    border: '1px solid rgba(212, 200, 186, 0.4)',
    boxShadow: '0 30px 60px rgba(61, 48, 36, 0.18)',
    overflow: 'hidden',
    position: 'relative',
  } satisfies SxProps<Theme>,
  header: {
    position: 'relative',
    backgroundColor: '#472A28',
    padding: spacingTokens.xs,
  } satisfies SxProps<Theme>,
  headerOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: overlayPattern,
    opacity: 0.2,
  } satisfies SxProps<Theme>,
  headerContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacingTokens.xs,
  } satisfies SxProps<Theme>,
  avatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    border: '4px solid rgba(255,255,255,0.3)',
    overflow: 'hidden',
    boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
  } satisfies SxProps<Theme>,
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } satisfies SxProps<Theme>,
  userName: {
    color: colorTokens.neutral.white,
    fontWeight: 600,
    fontSize: 20,
  } satisfies SxProps<Theme>,
  userEmail: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    marginTop: 2,
  } satisfies SxProps<Theme>,
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: 2,
    padding: '6px 14px',
    borderRadius: radiusTokens.pill,
    backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[400]} 0%, ${colorTokens.safari[500]} 100%)`,
    color: colorTokens.neutral.white,
    fontSize: 12,
    fontWeight: 600,
    boxShadow: '0 10px 24px rgba(238, 92, 40, 0.35)',
    letterSpacing: 0.3,
  } satisfies SxProps<Theme>,
  body: {
    padding: spacingTokens.xs,
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.xs,
  } satisfies SxProps<Theme>,
  creditsCard: {
    borderRadius: 2,
    padding: spacingTokens.sm,
    background:  'rgba(244, 185, 66, 0.25)',
    border: '1px solid rgba(238, 92, 40, 0.25)',
    boxShadow: '0 24px 40px rgba(238, 92, 40, 0.18)',
  } satisfies SxProps<Theme>,
  creditsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  } satisfies SxProps<Theme>,
  creditsTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingTokens.xs,
  } satisfies SxProps<Theme>,
  creditsIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: radiusTokens.md,
    backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[400]} 0%, ${colorTokens.safari[500]} 100%)`,
    color: colorTokens.neutral.white,
    boxShadow: '0 12px 24px rgba(238, 92, 40, 0.28)',
  } satisfies SxProps<Theme>,
  creditsTitle: {
    fontWeight: 600,
    color: colorTokens.earth[800],
    fontSize: 15,
  } satisfies SxProps<Theme>,
  creditsHelp: {
    color: 'rgba(74, 57, 42, 0.5)',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: colorTokens.safari[500],
    },
  } satisfies SxProps<Theme>,
  creditsValue: {
    fontSize: 32,
    fontWeight: 900,
    color: colorTokens.earth[800],
    marginBottom: 1,
    letterSpacing: -0.5,
  } satisfies SxProps<Theme>,
  creditsMeta: {
    fontSize: 12,
    color: 'rgba(74, 57, 42, 0.62)',
  } satisfies SxProps<Theme>,
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.sm,
  } satisfies SxProps<Theme>,
  navItem: (isActive: boolean) =>
    ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 18px',
      borderRadius: 2,
      borderLeft: isActive ? `4px solid ${colorTokens.safari[500]}` : '4px solid transparent',
      backgroundImage: isActive
        ? `linear-gradient(135deg, ${colorTokens.safari[50]} 0%, rgba(244, 185, 66, 0.25) 100%)`
        : 'none',
      backgroundColor: isActive ? 'rgba(254, 247, 238, 0.9)' : 'rgba(255,255,255,0.55)',
      boxShadow: isActive ? '0 20px 36px rgba(238, 92, 40, 0.18)' : '0 10px 24px rgba(61, 48, 36, 0.08)',
      border: '1px solid rgba(212, 200, 186, 0.35)',
      textDecoration: 'none',
      transition: 'transform 0.18s ease, box-shadow 0.2s ease, background-color 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        backgroundColor: 'rgba(244, 239, 233, 0.85)',
        boxShadow: '0 18px 36px rgba(61, 48, 36, 0.14)',
      },
    }) satisfies SxProps<Theme>,
  navContent: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingTokens.xs,
  } satisfies SxProps<Theme>,
  navIcon: (isActive: boolean) =>
    ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: radiusTokens.md,
      backgroundColor: isActive ? 'rgba(238, 92, 40, 0.16)' : 'rgba(74, 57, 42, 0.08)',
      color: isActive ? colorTokens.safari[600] : 'rgba(74, 57, 42, 0.6)',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(238, 92, 40, 0.2)',
        color: colorTokens.safari[600],
      },
    }) satisfies SxProps<Theme>,
  navTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  } satisfies SxProps<Theme>,
  navTitle: {
    fontWeight: 600,
    color: colorTokens.earth[800],
  } satisfies SxProps<Theme>,
  navSubtitle: {
    fontSize: 12,
    color: 'rgba(74, 57, 42, 0.6)',
  } satisfies SxProps<Theme>,
  navChevron: {
    color: 'rgba(74, 57, 42, 0.4)',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: colorTokens.safari[500],
    },
  } satisfies SxProps<Theme>,
} as const;
