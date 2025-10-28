import { env } from '../config/env';

const withCountry = (path: string, countryCode?: string) => {
  const cc = countryCode ?? env.defaultCountryCode;
  return `/countries/${cc}${path}`;
};

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    resetPassword: '/auth/reset-password',
  },
  catalog: {
    tours: (countryCode?: string) => withCountry('/tours', countryCode),
    tour: (id: string, countryCode?: string) => withCountry(`/tours/${id}`, countryCode),
    availability: (id: string) => `/availability/${id}`,
  },
  pricing: {
    quote: '/pricing/quote',
    promoValidate: '/pricing/promo',
  },
  bookings: {
    create: '/bookings',
    detail: (id: string) => `/bookings/${id}`,
    list: '/bookings',
  },
  inbox: {
    threads: '/inbox/threads',
    messages: (threadId: string) => `/inbox/threads/${threadId}/messages`,
  },
  customers: {
    profile: '/customers/profile',
    documents: '/customers/documents',
  },
  admin: {
    otaMappings: '/admin/ota-mappings',
    availabilityPush: '/admin/availability/push',
  },
} as const;
