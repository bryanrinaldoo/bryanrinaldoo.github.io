import { getRequestConfig } from 'next-intl/server';
import { AppConfig } from '@/utils/AppConfig';

// Single-locale site without i18n routing, so it can be exported as static HTML
export default getRequestConfig(async () => {
  const locale = AppConfig.i18n.defaultLocale;

  return {
    locale,
    // oxlint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
