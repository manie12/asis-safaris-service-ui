import { env } from './env';

export const DEFAULT_LOCALE = env.defaultLocale;
export const SUPPORTED_LOCALES = env.supportedLocales;
export const DEFAULT_COUNTRY_CODE = env.defaultCountryCode;

export const FEATURE_FLAGS = {
  enableInbox: true,
  enableAdmin: true,
} as const;
