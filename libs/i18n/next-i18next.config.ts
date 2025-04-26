import * as path from 'path'

export const i18nConfig = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    react: { useSuspense: false },
  },
  localePath: path.resolve('./libs/i18n/locales'),
}
