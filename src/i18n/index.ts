import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { env } from '@/app/config/env';

import de from './resources/de.json';
import en from './resources/en.json';
import fr from './resources/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
    },
    lng: env.defaultLocale,
    fallbackLng: 'en',
    supportedLngs: env.supportedLocales,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((error) => {
    console.error('Failed to initialise i18n', error);
  });

export default i18n;
