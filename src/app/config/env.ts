import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('https://api.asis-safaris.test'),
  VITE_I18N_DEFAULT_LOCALE: z.string().default('en'),
  VITE_I18N_SUPPORTED_LOCALES: z
    .string()
    .optional()
    .transform((value) =>
      (value ?? 'en')
        .split(',')
        .map((locale) => locale.trim())
        .filter(Boolean),
    )
    .refine((locales) => locales.length > 0, {
      message: 'At least one locale must be defined.',
    }),
  VITE_DEFAULT_COUNTRY_CODE: z.string().length(2).default('KE'),
  VITE_ENABLE_MSW: z.coerce.boolean().default(true),
});

const parsed = envSchema.parse(import.meta.env);

export const env = {
  apiBaseUrl: parsed.VITE_API_BASE_URL,
  defaultLocale: parsed.VITE_I18N_DEFAULT_LOCALE,
  supportedLocales: parsed.VITE_I18N_SUPPORTED_LOCALES,
  defaultCountryCode: parsed.VITE_DEFAULT_COUNTRY_CODE.toUpperCase(),
  enableMsw: parsed.VITE_ENABLE_MSW,
} as const;
