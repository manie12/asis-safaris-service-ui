import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

export { default as SunIcon } from '@mui/icons-material/WbSunny';
export { default as SafariCarIcon } from '@mui/icons-material/DirectionsCarFilled';
export { default as HeartFilledIcon } from '@mui/icons-material/FavoriteRounded';
export { default as TravelExploreIcon } from '@mui/icons-material/TravelExplore';

export const BinocularsIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <path
      d="M12 6h4a3 3 0 0 1 3 3v7H9V9a3 3 0 0 1 3-3zm21 0h3a3 3 0 0 1 3 3v7h-10V9a3 3 0 0 1 3-3zm-3 10v20a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V16h12zm-18 0v20a4 4 0 0 0 4 4H9a4 4 0 0 1-4-4v-7.5c0-4.08 1.1-8.06 3.2-11.56.34-.57.8-1.31 1.26-1.94H12zm28 0c.46.63.92 1.37 1.26 1.94 2.1 3.5 3.2 7.48 3.2 11.56V36a4 4 0 0 1-4 4h-6a4 4 0 0 0 4-4V16h1.54z"
      fill="currentColor"
    />
  </SvgIcon>
);

export const CompassIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <circle cx="24" cy="24" r="20" fill="#f5f3f0" stroke="#8b6f56" strokeWidth="2" />
    <path d="M24 13l8 11-8 11-8-11 8-11zm0 6.5-3.3 4.5 3.3 4.5 3.3-4.5L24 19.5z" fill="currentColor" />
  </SvgIcon>
);

export const CalendarBadgeIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <rect x="6" y="10" width="36" height="30" rx="6" fill="#ffffff" stroke="#d4c8ba" strokeWidth="2" />
    <path d="M12 6h4v6h-4V6zm20 0h4v6h-4V6z" fill="#8b6f56" />
    <rect x="6" y="18" width="36" height="4" fill="#fdeadb" />
    <rect x="16" y="26" width="8" height="8" rx="2" fill="currentColor" opacity="0.85" />
  </SvgIcon>
);

export const GradientHeartIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <path
      d="M24 41c-.9 0-1.8-.32-2.5-.95l-13-11.6C4.1 25.5 2 21.6 2 17.3 2 10.6 7.2 5 13.8 5c3.7 0 7.1 1.7 9.2 4.5C25.1 6.7 28.5 5 32.2 5 38.8 5 44 10.6 44 17.3c0 4.3-2.1 8.2-6.5 11.1l-13 11.6c-.7.63-1.6.95-2.5.95z"
      fill="currentColor"
    />
  </SvgIcon>
);

export const WhatsAppWaveIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <path
      d="M24 4C13 4 4 12.7 4 23.5a19 19 0 0 0 2.7 9.9L4 44l10.9-2.8a19.7 19.7 0 0 0 9.1 2.2c11 0 20-8.7 20-19.5S35 4 24 4zm11 24.3c-.5 1.5-2.4 2.7-4 3-1 .1-2.3.2-7.3-1.6-6.1-2.4-10-8.3-10.3-8.7-.3-.4-2.4-3.2-2.4-6s1.5-4.3 2-4.9c.5-.6 1.1-.7 1.5-.7h1.1c.3 0 .9-.1 1.4 1 .5 1.2 1.7 4.2 1.9 4.5.2.3.3.7.1 1.1-.2.4-.3.7-.6 1.1-.3.4-.6.8-.8 1-.3.3-.6.6-.3 1.1.3.6 1.4 2.3 3 3.7 2 1.7 3.6 2.3 4.1 2.6.5.3.8.2 1.2-.1.3-.4 1.4-1.6 1.8-2.2.4-.6.8-.5 1.2-.3.5.3 3.3 1.5 3.8 1.8.6.3 1 .4 1.1.7.2.3.2 1.7-.3 3.1z"
      fill="currentColor"
    />
  </SvgIcon>
);
