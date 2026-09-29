import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

/** Centralized application configuration */
export const AppConfig = {
  name: 'Bryan Rinaldo',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localePrefix,
  },
};
