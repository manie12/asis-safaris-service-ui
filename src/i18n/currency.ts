export type SupportedCurrency = 'USD' | 'EUR' | 'KES';

export const currencyFormatter = (value: number, currency: SupportedCurrency, locale = 'en') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'KES' ? 0 : 2,
  }).format(value);
