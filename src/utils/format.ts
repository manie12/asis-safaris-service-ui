import dayjs from 'dayjs';

import { currencyFormatter, type SupportedCurrency } from '@/i18n/currency';

export const formatCurrency = (value: number, currency: SupportedCurrency, locale?: string) =>
  currencyFormatter(value, currency, locale);

export const formatDate = (value: string | number | Date, format = 'DD MMM YYYY') =>
  dayjs(value).format(format);

export const formatDuration = (days: number) => {
  if (days <= 1) {
    return `${days} day`;
  }

  return `${days} days`;
};
