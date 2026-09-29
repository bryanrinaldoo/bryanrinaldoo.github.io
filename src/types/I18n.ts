import type messages from '@/locales/en.json';
import type { AppConfig as Config } from '@/utils/AppConfig';

declare module 'next-intl' {
  // oxlint-disable-next-line typescript/consistent-type-definitions
  interface AppConfig {
    Locale: (typeof Config.i18n.locales)[number];
    Messages: typeof messages;
  }
}
